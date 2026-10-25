import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { sendInquiryNotification } from "@/lib/mailer";

export const runtime = "nodejs";

const allowedServices = [
  "web-development",
  "mobile-apps",
  "ui-ux-branding",
  "video-motion",
];

const allowedBudgets = [
  "under-25k",
  "25k-50k",
  "50k-1l",
  "1l-plus",
];

const allowedTimelines = [
  "urgent",
  "2-4-weeks",
  "1-2-months",
  "flexible",
];

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = cleanText(body.name, 100);
    const email = cleanText(body.email, 254).toLowerCase();
    const company = cleanText(body.company, 150);
    const service = cleanText(body.service, 50);
    const budget = cleanText(body.budget, 30);
    const timeline = cleanText(body.timeline, 30);
    const description = cleanText(body.description, 5000);

    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, message: "Please enter your name." },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!allowedServices.includes(service)) {
      return NextResponse.json(
        { success: false, message: "Please select a valid service." },
        { status: 400 }
      );
    }

    if (!allowedBudgets.includes(budget)) {
      return NextResponse.json(
        { success: false, message: "Please select a valid budget." },
        { status: 400 }
      );
    }

    if (!allowedTimelines.includes(timeline)) {
      return NextResponse.json(
        { success: false, message: "Please select a valid timeline." },
        { status: 400 }
      );
    }

    if (
      !Array.isArray(body.features) ||
      body.features.length > 30 ||
      !body.features.every(
        (feature: unknown) =>
          typeof feature === "string" &&
          feature.trim().length > 0 &&
          feature.length <= 150
      )
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid selected features." },
        { status: 400 }
      );
    }

    const features = [
      ...new Set(
        body.features.map((feature: string) => feature.trim())
      ),
    ];

    await connectDB();

    // First save the inquiry. An email failure must not lose the inquiry.
    const inquiry = await Inquiry.create({
      name,
      email,
      company,
      service,
      features,
      budget,
      timeline,
      description,
      emailStatus: "pending",
    });

    try {
      await sendInquiryNotification({
        id: inquiry._id.toString(),
        name,
        email,
        company,
        service,
        features,
        budget,
        timeline,
        description,
        createdAt: inquiry.createdAt,
      });

      inquiry.emailStatus = "sent";
      await inquiry.save();

      return NextResponse.json(
        {
          success: true,
          emailSent: true,
          message: "Your inquiry has been submitted successfully.",
          inquiryId: inquiry._id.toString(),
        },
        { status: 201 }
      );
    } catch (emailError) {
      // Keep the inquiry in MongoDB even if SMTP fails.
      inquiry.emailStatus = "failed";
      inquiry.emailError =
        emailError instanceof Error
          ? emailError.message.slice(0, 500)
          : "Unknown email error";

      await inquiry.save();

      console.error(
        "ShyGrow inquiry email failed:",
        emailError instanceof Error
          ? emailError.message
          : "Unknown error"
      );

      return NextResponse.json(
        {
          success: true,
          emailSent: false,
          message:
            "Your inquiry was saved, but the email notification could not be sent. We will need to retry the notification.",
          inquiryId: inquiry._id.toString(),
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error(
      "ShyGrow inquiry API error:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "We could not submit your inquiry right now. Please try again.",
      },
      { status: 500 }
    );
  }
}