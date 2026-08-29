import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.RAG_BACKEND_URL ?? "http://localhost:8000";

// The RAG backend lives on a free-tier Hugging Face Space that sleeps after
// inactivity and can take 30–60+ seconds to cold-start. Allow up to 90s.
const BACKEND_TIMEOUT_MS = 90_000;

// Keep the serverless function alive at least as long as the upstream timeout,
// otherwise Vercel aborts the request before the cold start finishes.
// NOTE: the Vercel Hobby plan caps this at 60s — see the deployment notes.
export const maxDuration = 90;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body?.message?.trim()) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || body.password !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${BACKEND_URL}/admin-chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: body.message, session_id: body.session_id ?? "" }),
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    });
  } catch (err) {
    // AbortSignal.timeout throws a TimeoutError (a DOMException) on timeout; any
    // other throw here is a network-level failure (DNS, refused, Space down).
    if (err instanceof DOMException && err.name === "TimeoutError") {
      return NextResponse.json(
        {
          error:
            "The admin backend is taking longer than usual to respond — the AI backend may be waking up. Please try again in a moment.",
        },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: "Couldn't reach the admin backend. Please try again shortly." },
      { status: 503 }
    );
  }

  if (!upstream.ok) {
    // The backend was reached but returned an error status.
    return NextResponse.json(
      { error: `The admin backend returned an error (status ${upstream.status}). Please try again.` },
      { status: 502 }
    );
  }

  const data = await upstream.json().catch(() => null);
  if (!data || typeof data.reply !== "string") {
    return NextResponse.json(
      { error: "The admin backend sent an unexpected response. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ reply: data.reply });
}
