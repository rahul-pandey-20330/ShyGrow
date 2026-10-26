
import { Resend } from "resend";

type InquiryEmailData = {
  id: string;
  name: string;
  email: string;
  company?: string;
  service: string;
  features: string[];
  budget: string;
  timeline: string;
  description: string;
  createdAt?: Date | string;
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });
}

export async function sendInquiryNotification(
  inquiry: InquiryEmailData
) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  const from =
    process.env.INQUIRY_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  if (!to) {
    throw new Error("INQUIRY_TO_EMAIL is not configured.");
  }

  const resend = new Resend(apiKey);

  const date = inquiry.createdAt
    ? new Date(inquiry.createdAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      })
    : "Not available";

  const features = inquiry.features.length
    ? inquiry.features
        .map((feature) => `<li>${escapeHtml(feature)}</li>`)
        .join("")
    : "<li>None selected</li>";

  const description = escapeHtml(
    inquiry.description || "No description provided"
  ).replace(/\n/g, "<br />");

  const { data, error } = await resend.emails.send({
    from: `ShyGrow <${from}>`,
    to: [to],
    replyTo: inquiry.email,
    subject: `New Project Inquiry — ${inquiry.name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;color:#222">
        <h1 style="color:#6d28d9">New ShyGrow Project Inquiry</h1>
        <p>A customer has submitted the Project Planner form.</p>

        <h2>Customer Details</h2>
        <p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(inquiry.company || "Not provided")}</p>

        <h2>Project Details</h2>
        <p><strong>Service:</strong> ${escapeHtml(inquiry.service)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(inquiry.budget)}</p>
        <p><strong>Timeline:</strong> ${escapeHtml(inquiry.timeline)}</p>
        <p><strong>Features:</strong></p>
        <ul>${features}</ul>

        <p><strong>Description:</strong></p>
        <p>${description}</p>

        <hr />
        <p><strong>Inquiry ID:</strong> ${escapeHtml(inquiry.id)}</p>
        <p><strong>Submitted:</strong> ${escapeHtml(date)}</p>
        <p style="color:#666">ShyGrow — New project notification</p>
      </div>
    `,
  });

  if (error) {
    throw new Error(`Resend email failed: ${error.message}`);
  }

  return data;
}
