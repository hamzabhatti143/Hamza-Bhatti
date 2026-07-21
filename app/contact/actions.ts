"use server";

import { Resend } from "resend";

export type ContactState = {
  status: "idle" | "success" | "error" | "fallback";
  message: string;
  // Echoed back so the client can build a mailto: link when email isn't configured.
  values?: { name: string; email: string; message: string };
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function sendMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in your name, email, and a message." };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "That email address doesn't look right — mind checking it?" };
  }
  if (message.length < 10) {
    return { status: "error", message: "Please add a little more detail to your message." };
  }

  const apiKey = process.env.RESEND_API_KEY;

  // No email provider configured → tell the client to fall back to a mailto: link.
  if (!apiKey) {
    return {
      status: "fallback",
      message: "Opening your email app so you can send this directly.",
      values: { name, email, message },
    };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO || "bhatti3993@gmail.com",
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    return {
      status: "success",
      message: "Thanks — your message is on its way. I'll get back to you soon.",
    };
  } catch {
    return {
      status: "error",
      message: "Something went wrong sending that. Please email me directly at bhatti3993@gmail.com.",
    };
  }
}
