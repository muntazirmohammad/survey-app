import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    RESEND: process.env.RESEND_API_KEY ? "LOADED" : "MISSING",
    FROM: process.env.EMAIL_FROM,
    TO: process.env.EMAIL_TO,
  });
}
