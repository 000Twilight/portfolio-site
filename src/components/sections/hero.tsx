"use client";

import { useEffect, useRef } from "react";
import { gsap, ensureGsap } from "@/lib/reveal";
import { siteContent } from "@/lib/content/site";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const hero = siteContent.hero;

  useEffect(() => {
    ensureGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-line] > span", {
        yPercent: 110,
        duration: 1.05,
        stagger: 0.09,
      })
        .from(
          "[data-hero-fade]",
          { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 },
          "-=0.6",
        )
        .from(
          "[data-hero-panel]",
          { opacity: 0, scale: 0.97, y: 26, duration: 1.1 },
          "-=1.05",
        );

      // Subtle float on the portrait panel
      gsap.to("[data-hero-float]", {
        y: -10,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      className="grid grid-cols-1 items-stretch gap-4 my-20 lg:h-[min(76vh,720px)] lg:grid-cols-[1.1fr_0.9fr]"
    >
      {/* ── Left Hero Panel ──────────────────────────────────────────────── */}
      <div className="flex flex-col justify-between gap-12 rounded-3xl bg-white border border-[#E5E7EB] p-8 sm:p-12 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
        <div>
          <div data-hero-fade className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-medium text-[#6B7280] mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
            Software Engineer & AI Builder
          </div>

          <h1 className="display text-[clamp(2.75rem,6.5vw,5rem)] leading-none text-[#1F2937]">
            {[hero.firstName, hero.lastName].map((line) => (
              <span key={line} data-hero-line className="block overflow-hidden pb-1">
                <span className="block">{line}</span>
              </span>
            ))}
          </h1>

          <div data-hero-fade className="mt-8 h-px w-20 bg-[#E5E7EB]" />

          <p
            data-hero-fade
            className="mt-8 max-w-lg text-base sm:text-lg leading-relaxed text-[#6B7280]"
          >
            Full-stack developer and AI engineer based in Jakarta, specializing in building high-fidelity web, mobile apps, and intelligent automated workflows.
          </p>
        </div>

        <div data-hero-fade className="flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-[#1F2937] px-7 py-3.5 text-sm font-semibold text-[#F9FAFB] shadow-xs transition-all duration-200 hover:bg-[#111827] hover:scale-[1.02] active:scale-[0.98]"
          >
            {hero.primaryCta}
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-white border border-[#E5E7EB] px-7 py-3.5 text-sm font-semibold text-[#1F2937] transition-all duration-200 hover:bg-[#F3F4F6] hover:border-[#D1D5DB]"
          >
            {hero.secondaryCta}
          </a>
        </div>
      </div>

      {/* ── Right Spotlight Card ─────────────────────────────────────────── */}
      <div data-hero-panel className="relative flex flex-col justify-between rounded-3xl bg-white border border-[#E5E7EB] p-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] overflow-hidden">
        <div data-hero-float className="relative h-full w-full min-h-[380px] rounded-2xl overflow-hidden bg-[#F3F4F6] border border-[#E5E7EB]">
          <img
            src={hero.portrait as string}
            alt={hero.portraitAlt}
            width={1024}
            height={1280}
            className="h-full w-full object-cover grayscale opacity-90 transition-all duration-700 hover:scale-102 hover:grayscale-0"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF]/85 to-transparent px-6 pt-24 pb-6 sm:px-8 sm:pb-8">
            <p className="display text-[clamp(1.4rem,2.8vw,2.2rem)] text-[#1F2937] leading-tight">
              {hero.spotlightTitle.split("\n").map((line: string) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p className="mt-3 max-w-sm text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              {hero.spotlightCopy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
