import type { Metadata } from "next";
import { WebVitals } from "@/components/web-vitals";
import { env } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  title: `${env.NEXT_PUBLIC_APP_NAME} · Learning Constellation`,
  description:
    "Signal-first strategic intelligence platform for reflection, learning, and adaptive reasoning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        {children}
        <WebVitals />
      </body>
    </html>
  );
}
