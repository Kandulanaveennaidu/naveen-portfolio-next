import { NextRequest, NextResponse } from "next/server";
import { sendZoomBookingEmails } from "@/lib/email";
import { bookSlot, isSlotBooked } from "@/lib/bookings";

// Zoom API credentials from environment variables
const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;
const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;

interface ZoomTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface ZoomMeetingResponse {
  id: number;
  join_url: string;
  start_url: string;
  password: string;
  topic: string;
  start_time: string;
  duration: number;
}

// Get Zoom OAuth access token using Server-to-Server OAuth
async function getZoomAccessToken(): Promise<string> {
  const tokenUrl = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`;

  const credentials = Buffer.from(
    `${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Zoom token error:", error);
    throw new Error(`Failed to get Zoom access token: ${error}`);
  }

  const data: ZoomTokenResponse = await response.json();
  return data.access_token;
}

// Create a Zoom meeting
async function createZoomMeeting(
  accessToken: string,
  topic: string,
  startTime: string,
  duration: number,
  agenda: string
): Promise<ZoomMeetingResponse> {
  const response = await fetch("https://api.zoom.us/v2/users/me/meetings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic: topic,
      type: 2, // Scheduled meeting
      start_time: startTime,
      duration: duration,
      timezone: "Asia/Kolkata", // IST
      agenda: agenda,
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
        mute_upon_entry: true,
        watermark: false,
        use_pmi: false,
        approval_type: 0, // Automatically approve
        audio: "both",
        auto_recording: "none",
        waiting_room: true,
        meeting_authentication: false,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Zoom meeting creation error:", error);
    throw new Error(`Failed to create Zoom meeting: ${error}`);
  }

  return response.json();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      company,
      phone,
      agenda,
      meetingType,
      date,
      time,
      duration,
    } = body;

    // Validate required fields
    if (!name || !email || !date || !time || !duration) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Format date for booking check (YYYY-MM-DD)
    const bookingDate = new Date(date).toISOString().split("T")[0];

    // Check if slot is already booked
    if (isSlotBooked(bookingDate, time)) {
      return NextResponse.json(
        {
          error:
            "This time slot is already booked. Please select another time.",
          slotTaken: true,
        },
        { status: 409 }
      );
    }

    // Convert date and time to ISO format for Zoom
    // Time is in format "09:00 AM" and date is a date string
    const [timeStr, period] = time.split(" ");
    const [hours, minutes] = timeStr.split(":");
    let hour24 = parseInt(hours);

    if (period === "PM" && hour24 !== 12) {
      hour24 += 12;
    } else if (period === "AM" && hour24 === 12) {
      hour24 = 0;
    }

    const meetingDate = new Date(date);
    meetingDate.setHours(hour24, parseInt(minutes), 0, 0);

    // Format for Zoom API (ISO 8601)
    const startTime = meetingDate.toISOString();

    // Create meeting topic
    const meetingTypeLabels: Record<string, string> = {
      discovery: "Discovery Call",
      technical: "Technical Discussion",
      consultation: "Consultation",
      interview: "Interview",
    };

    const topic = `${meetingTypeLabels[meetingType] || "Meeting"} with ${name}${
      company ? ` (${company})` : ""
    }`;

    // Create the full agenda
    const fullAgenda = `
Meeting with: ${name}
Email: ${email}
${company ? `Company: ${company}` : ""}
${phone ? `Phone: ${phone}` : ""}

Agenda:
${agenda || "General discussion"}
    `.trim();

    // Get access token and create meeting
    const accessToken = await getZoomAccessToken();
    const meeting = await createZoomMeeting(
      accessToken,
      topic,
      startTime,
      duration,
      fullAgenda
    );

    // Format date for email
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Send email notifications to both customer and organizer
    const emailResult = await sendZoomBookingEmails({
      customerName: name,
      customerEmail: email,
      company: company || undefined,
      projectDescription: agenda || "General discussion",
      meetingDate: formattedDate,
      meetingTime: time,
      meetingId: String(meeting.id),
      joinUrl: meeting.join_url,
      password: meeting.password,
    });

    if (!emailResult.success) {
      console.error("Failed to send email notifications:", emailResult.error);
      // Continue anyway - meeting was created successfully
    }

    // Book the slot to prevent double bookings
    const bookingResult = bookSlot(
      bookingDate,
      time,
      String(meeting.id),
      email
    );
    if (!bookingResult.success) {
      console.error("Failed to save booking:", bookingResult.error);
      // Meeting was created but slot tracking failed - log for manual review
    }

    // Return meeting details
    return NextResponse.json({
      success: true,
      meeting: {
        id: meeting.id,
        joinUrl: meeting.join_url,
        password: meeting.password,
        topic: meeting.topic,
        startTime: meeting.start_time,
        duration: meeting.duration,
      },
      emailSent: emailResult.success,
      slotBooked: bookingResult.success,
    });
  } catch (error) {
    console.error("Error creating Zoom meeting:", error);
    return NextResponse.json(
      {
        error: "Failed to create meeting",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
