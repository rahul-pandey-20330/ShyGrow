import nodemailer from "nodemailer";

type InquiryEmailData = {
  id: string;
  name: string;
  email: string;
  company?: string;
  service: string;
  features: string[];
  budget: string;
  timeline: string;
  description?: string;
  createdAt: Date | string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function readable(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export async function sendInquiryNotification(
  inquiry: InquiryEmailData
) {
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_APP_PASSWORD;
  const recipient = process.env.INQUIRY_TO_EMAIL;

  if (!user || !password || !recipient) {
    throw new Error("Email environment variables are missing");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: {
      user,
      pass: password,
    },
  });

  const details = [
    ["Inquiry ID", inquiry.id],
    ["Name", inquiry.name],
    ["Customer Email", inquiry.email],
    ["Company", inquiry.company || "Not provided"],
    ["Service", readable(inquiry.service)],
    ["Features", inquiry.features.join(", ") || "None selected"],
    ["Budget", readable(inquiry.budget)],
    ["Timeline", readable(inquiry.timeline)],
    ["Description", inquiry.description || "Not provided"],
    ["Submitted At", new Date(inquiry.createdAt).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    })],
  ] as const;

  const htmlRows = details
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px;border:1px solid #ddd;font-weight:bold">
            ${escapeHtml(label)}
          </td>
          <td style="padding:10px;border:1px solid #ddd">
            ${escapeHtml(String(value))}
          </td>
        </tr>
      `
    )
    .join("");

  await transporter.sendMail({
    from: `"ShyGrow Website" <${user}>`,
    to: recipient,
    replyTo: inquiry.email,
    subject: `New ShyGrow Project Inquiry — ${inquiry.name}`,
    text: details.map(([label, value]) => `${label}: ${value}`).join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;color:#222">
        <h2>New Project Inquiry — ShyGrow</h2>
        <p>A customer has submitted the Project Planner form.</p>
        <table style="border-collapse:collapse;width:100%;max-width:750px">
          ${htmlRows}
        </table>
        <p style="margin-top:20px">
          Reply directly to this email to respond to the customer.
        </p>
      </div>
    `,
  });
}