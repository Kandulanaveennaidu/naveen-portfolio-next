import { NextRequest, NextResponse } from "next/server";
import { sendProjectInquiryEmails } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      projectType,
      budget,
      timeline,
      features,
      name,
      email,
      company,
      phone,
      projectName,
      description,
      existingWebsite,
      additionalInfo,
    } = body;

    // Validate required fields
    if (!name || !email || !projectType || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send emails to both customer and organizer
    const emailResult = await sendProjectInquiryEmails({
      name,
      email,
      company,
      phone,
      projectType,
      projectName,
      budget,
      timeline,
      features,
      description,
      existingWebsite,
      additionalInfo,
    });

    if (!emailResult.success) {
      console.error(
        "Failed to send project inquiry emails:",
        emailResult.error
      );
      return NextResponse.json(
        { error: "Failed to send confirmation emails" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project inquiry submitted successfully",
    });
  } catch (error) {
    console.error("Error processing project inquiry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
