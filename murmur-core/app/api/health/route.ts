import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: env.NEXT_PUBLIC_APP_NAME,
    environment: env.NEXT_PUBLIC_APP_ENV,
    timestamp: new Date().toISOString(),
  });
}
