import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_NAME = 120;
const MAX_MESSAGE = 8000;
const DEFAULT_FROM_EMAIL = "onboarding@resend.dev";

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

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL;

  if (!apiKey || !to) {
    console.error("contact: missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const resend = new Resend(apiKey);

    const textLines = [
      name ? `Name: ${name}` : null,
      `Reply to: ${email}`,
      "",
      message,
    ].filter((line): line is string => line !== null);

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: name
        ? `Portfolio: message from ${name}`
        : `Portfolio: message from ${email}`,
      text: textLines.join("\n"),
    });
    if (error) {
      console.error("contact: send failed", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact: send failed", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
