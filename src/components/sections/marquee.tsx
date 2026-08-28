"use client";

import { siteContent } from "@/lib/content/site";

export function Marquee() {
  const marquee = siteContent.marquee;

  return (
    <section
      aria-hidden="true"
      className="mt-3 overflow-hidden py-5 bg-card text-card-foreground rounded-3xl"
    >
      <div className="flex animate-[marquee_18s_linear_infinite] gap-12 whitespace-nowrap">
        {[...marquee.words, ...marquee.words].map((word, i) => (
          <span
            key={i}
            className="display text-[clamp(1.5rem,3vw,2.5rem)] text-card-foreground/40"
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}
