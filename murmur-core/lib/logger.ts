import { env } from "@/lib/env";

type LogLevel = "debug" | "info" | "warn" | "error";

type LogMetadata = Record<string, unknown>;

const priority: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

function shouldLog(level: LogLevel) {
  return priority[level] >= priority[env.LOG_LEVEL];
}

function write(level: LogLevel, message: string, metadata?: LogMetadata) {
  if (!shouldLog(level)) {
    return;
  }

  const payload = {
    ts: new Date().toISOString(),
    level,
    message,
    metadata,
    app: env.NEXT_PUBLIC_APP_NAME,
    env: env.NEXT_PUBLIC_APP_ENV,
  };

  const entry = JSON.stringify(payload);

  if (level === "error") {
    console.error(entry);
    return;
  }

  if (level === "warn") {
    console.warn(entry);
    return;
  }

  console.log(entry);
}

export const logger = {
  debug: (message: string, metadata?: LogMetadata) => write("debug", message, metadata),
  info: (message: string, metadata?: LogMetadata) => write("info", message, metadata),
  warn: (message: string, metadata?: LogMetadata) => write("warn", message, metadata),
  error: (message: string, metadata?: LogMetadata) => write("error", message, metadata),
};
