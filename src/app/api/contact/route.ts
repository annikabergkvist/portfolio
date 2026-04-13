import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const MAX_NAME = 120;
const MAX_MESSAGE = 8000;

function isValidEmail(email: string): boolean {
  if (email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!json || typeof json !== "object") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const body = json as Record<string, unknown>;
  const honeypot = typeof body.company === "string" ? body.company : "";
  if (honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name =
    typeof body.name === "string" ? body.name.trim().slice(0, MAX_NAME) : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message =
    typeof body.message === "string" ? body.message.trim() : "";

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (!message || message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "invalid_message" }, { status: 400 });
  }

  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim() || user;

  if (!host || !user || !pass || !to) {
    console.error("contact: missing SMTP_HOST, SMTP_USER, SMTP_PASS, or CONTACT_TO_EMAIL");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const port = Number(process.env.SMTP_PORT || "587");
  const secure =
    process.env.SMTP_SECURE === "true" || port === 465;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    const fromName =
      process.env.SMTP_FROM_NAME?.trim() || "Portfolio contact";

    const textLines = [
      name ? `Name: ${name}` : null,
      `Reply to: ${email}`,
      "",
      message,
    ].filter((line): line is string => line !== null);

    await transporter.sendMail({
      from: `"${fromName}" <${user}>`,
      to,
      replyTo: email,
      subject: name
        ? `Portfolio: message from ${name}`
        : `Portfolio: message from ${email}`,
      text: textLines.join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact: send failed", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
