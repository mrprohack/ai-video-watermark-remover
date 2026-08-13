import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "ai-video-watermark-remover",
    version: "0.1.0",
  });
}
