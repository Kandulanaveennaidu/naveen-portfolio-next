import { NextRequest, NextResponse } from "next/server";
import { sendContactFormEmails } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields. Please fill in all fields." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Sanitize inputs (basic XSS prevention)
    const sanitizedData = {
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 254),
      subject: subject.trim().slice(0, 200),
      message: message.trim().slice(0, 5000),
    };

    // Send email notifications to both customer and organizer
    const emailResult = await sendContactFormEmails(sanitizedData);

    if (!emailResult.success) {
      console.error("Failed to send contact form emails:", emailResult.error);
      return NextResponse.json(
        {
          error: "Failed to send your message. Please try again later.",
          details: emailResult.error,
        },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message:
        "Your message has been sent successfully! Check your email for confirmation.",
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      {
        error: "Failed to process your message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
