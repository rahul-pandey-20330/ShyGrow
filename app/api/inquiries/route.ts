
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { sendInquiryNotification } from "@/lib/mailer";

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

function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        { status: 400 }
      );
    }

    const data = body as Record<string, unknown>;

    const name = cleanText(data.name, 100);
    const email = cleanText(data.email, 254).toLowerCase();
    const company = cleanText(data.company, 150);
    const service = cleanText(data.service, 50);
    const budget = cleanText(data.budget, 30);
    const timeline = cleanText(data.timeline, 30);
    const description = cleanText(data.description, 5000);

    if (name.length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter your name.",
        },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    if (!allowedServices.includes(service)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a valid service.",
        },
        { status: 400 }
      );
    }

    if (!allowedBudgets.includes(budget)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a valid budget.",
        },
        { status: 400 }
      );
    }

    if (!allowedTimelines.includes(timeline)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a valid timeline.",
        },
        { status: 400 }
      );
    }

    const rawFeatures = data.features;

    if (
      !Array.isArray(rawFeatures) ||
      rawFeatures.length > 30 ||
      !rawFeatures.every(
        (feature: unknown) =>
          typeof feature === "string" &&
          feature.trim().length > 0 &&
          feature.length <= 150
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid selected features.",
        },
        { status: 400 }
      );
    }

    // Explicit string[] typing fixes the TypeScript build error.
    const features: string[] = Array.from(
      new Set<string>(
        (rawFeatures as string[]).map((feature) => feature.trim())
      )
    );

    await connectDB();

    // Save the inquiry first so SMTP failure does not lose it.
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
      // The database record remains saved if email delivery fails.
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
