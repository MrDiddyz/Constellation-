import { logger } from "@/lib/logger";

export function captureError(error: unknown, context: Record<string, unknown> = {}) {
  logger.error("Captured application error", {
    error: error instanceof Error ? error.message : String(error),
    ...context,
  });
}
