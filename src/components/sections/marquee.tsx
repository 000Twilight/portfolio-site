"use client";

import { siteContent } from "@/lib/content/site";

export function Marquee() {
  const marquee = siteContent.marquee;

  return (
    <section
      aria-hidden="true"
      className="my-4 overflow-hidden py-8 w-screen relative left-1/2 -translate-x-1/2"
    >
      <div className="flex w-max animate-[marquee_25s_linear_infinite] items-center gap-12 md:gap-24 whitespace-nowrap">
        {[...marquee.words, ...marquee.words, ...marquee.words].map((word, i) => (
          <span
            key={i}
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-none text-[#1F2937] opacity-30"
            style={{ 
              fontFamily: "var(--font-fancy)",
              WebkitTextStroke: "1.5px #1F2937"
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}
