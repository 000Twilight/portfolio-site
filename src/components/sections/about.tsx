"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, useReveal } from "@/lib/reveal";
import { siteContent } from "@/lib/content/site";
import { GooeyTextReveal } from "@/components/ui/gooey-text-reveal";

export function About() {
  const ref = useReveal<HTMLElement>();
  const about = siteContent.about;

  // ── count-up for metrics ────────────────────────────────────────────────
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const counters = Array.from(
      root.querySelectorAll<HTMLElement>("[data-count-up]"),
    );
    if (!counters.length) return;

    const ctx = gsap.context(() => {
      counters.forEach((element, index) => {
        const target = Number(element.dataset.target ?? 0);
        const suffix = element.dataset.suffix ?? "";
        const counter = { value: 0 };

        gsap.fromTo(
          counter,
          { value: 0 },
          {
            value: target,
            duration: 1.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root,
              start: "top 78%",
              once: true,
            },
            onUpdate: () => {
              element.textContent = `${Math.round(counter.value)}${suffix}`;
            },
            onStart: () => {
              element.textContent = `0${suffix}`;
            },
            onComplete: () => {
              element.textContent = `${target}${suffix}`;
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [ref]);

  return (
    <section
      ref={ref}
      id="about"
      className="grid grid-cols-1 gap-6 lg:grid-cols-2"
    >
      {/* ── Left: copy + capabilities ────────────────────────────────────── */}
      <div className="flex flex-col justify-between rounded-3xl bg-white border border-[#E5E7EB] p-8 sm:p-12 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
        <div>
          <p
            data-reveal
            className="text-xs font-semibold tracking-widest uppercase text-[#6B7280] mb-3"
          >
            {about.title}
          </p>
          <GooeyTextReveal
            mode="scroll"
            className="mt-6 leading-relaxed tracking-tight text-[#1F2937]"
            style={{
              fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)",
            }}
          >
            {about.copy}
          </GooeyTextReveal>
        </div>

        {/* Capabilities */}
        <div data-reveal className="mt-10 flex flex-wrap gap-2">
          {about.capabilities.map((c) => (
            <span
              key={c}
              className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-4 py-2 text-xs sm:text-sm font-medium text-[#1F2937] transition-all duration-200 hover:border-[#D1D5DB] hover:bg-white hover:shadow-xs"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* ── Right: metrics grid ──────────────────────────────────────────── */}
      <div className="rounded-3xl bg-white border border-[#E5E7EB] p-8 sm:p-12 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] flex flex-col justify-between gap-10">
        <p
          data-reveal
          className="text-xs font-semibold tracking-widest uppercase text-[#6B7280]"
        >
          By the numbers
        </p>

        <dl data-reveal className="grid grid-cols-2 gap-4 sm:gap-8 my-auto">
          {about.metrics.map(({ value, suffix, label }) => (
            <div key={label} className="flex flex-col">
              <dt
                data-count-up
                data-target={value}
                data-suffix={suffix}
                className="display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1F2937]"
              >
                0{suffix}
              </dt>
              <dd className="mt-2 text-xs sm:text-sm font-medium text-[#6B7280] leading-snug">
                {label}
              </dd>
            </div>
          ))}
        </dl>

        <div className="pt-6 border-t border-[#F3F4F6] text-xs text-[#9CA3AF]">
          Continuous learning, software architecture & production systems
        </div>
      </div>
    </section>
  );
}
