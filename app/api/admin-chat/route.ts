import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.RAG_BACKEND_URL ?? "http://localhost:8000";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body?.message?.trim()) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || body.password !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const upstream = await fetch(`${BACKEND_URL}/admin-chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: body.message, session_id: body.session_id ?? "" }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!upstream.ok) {
      throw new Error(`backend ${upstream.status}`);
    }

    const data = await upstream.json();
    return NextResponse.json({ reply: data.reply });
  } catch {
    return NextResponse.json(
      { error: "Admin backend unavailable" },
      { status: 503 }
    );
  }
}
