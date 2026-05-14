import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/lib/env";
import { captureError } from "@/lib/monitoring";
import { logger } from "@/lib/logger";

const signalSchema = z.object({
  source: z.string().min(2).max(64).default("unknown"),
  content: z.string().min(10).max(5000),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

function hasValidToken(request: NextRequest) {
  if (!env.INTERNAL_API_TOKEN) {
    return env.NODE_ENV !== "production";
  }

  return request.headers.get("x-murmur-token") === env.INTERNAL_API_TOKEN;
}

export async function POST(request: NextRequest) {
  try {
    if (!hasValidToken(request)) {
      logger.warn("Unauthorized signal ingestion attempt", {
        forwardedFor: request.headers.get("x-forwarded-for"),
      });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let payload: unknown;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }
    const parsed = signalSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid payload",
          issues: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    logger.info("Signal accepted", {
      source: parsed.data.source,
      priority: parsed.data.priority,
      contentLength: parsed.data.content.length,
    });

    return NextResponse.json(
      {
        status: "accepted",
        signal: {
          ...parsed.data,
          receivedAt: new Date().toISOString(),
        },
      },
      { status: 202 },
    );
  } catch (error) {
    captureError(error, { route: "/api/signal" });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
