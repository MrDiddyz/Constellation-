"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    console.log(
      JSON.stringify({
        type: "web-vital",
        name: metric.name,
        value: metric.value,
        id: metric.id,
        rating: metric.rating,
      }),
    );
  });

  return null;
}
