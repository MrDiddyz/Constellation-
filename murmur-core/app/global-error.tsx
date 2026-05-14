"use client";

import { useEffect } from "react";
import { captureError } from "@/lib/monitoring";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureError(error, { digest: error.digest });
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-100">
        <main className="space-y-4 text-center">
          <h2 className="text-2xl font-semibold">Something went wrong.</h2>
          <button
            className="rounded-full bg-amber-300 px-5 py-2 font-medium text-zinc-950"
            onClick={() => reset()}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
