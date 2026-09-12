"use client";

import { useEffect, useRef } from "react";
import { gsap, ensureGsap } from "@/lib/reveal";
import { siteContent } from "@/lib/content/site";
import { ArrowUpRight, FileText } from "lucide-react";
import { GooeyTextReveal } from "@/components/ui/gooey-text-reveal";
import SlideTextButton from "@/components/ui/slide-text-button";
import { isInitialLoad } from "@/lib/store/intro-store";

interface HeroProps {
  delay?: number;
}

export function Hero({ delay = 0 }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const hero = siteContent.hero;

  // Use a small default delay for client-side navigation
  const actualDelay = isInitialLoad ? delay : 0.2;

  useEffect(() => {
    ensureGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: actualDelay });
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
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-medium text-[#4B5563] mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {siteContent.nav.availableLabel}
          </div>

          <h1 className="display text-[clamp(3rem,8vw,6rem)] font-bold tracking-tight text-[#1F2937] leading-[1.05]">
            <div data-hero-line className="overflow-hidden">
              <span className="block">Mario Richie Lim</span>
            </div>
          </h1>

          <GooeyTextReveal
            mode="immediate"
            delay={actualDelay + 0.8}
            className="mt-8 max-w-lg text-base sm:text-lg leading-relaxed text-[#6B7280]"
          >
            Full-stack developer and AI engineer based in Jakarta, specializing in building high-fidelity web, mobile apps, and intelligent automated workflows.
          </GooeyTextReveal>
        </div>

        <div data-hero-fade className="flex flex-wrap items-center gap-3">
          <SlideTextButton
            href="#projects"
            text={hero.primaryCta}
            hoverText="Explore projects"
            icon={<ArrowUpRight size={16} />}
            iconPlacement="right"
            variant="custom"
            className="rounded-full bg-[#1F2937] px-7 py-3.5 text-sm font-semibold text-[#F9FAFB] shadow-xs hover:bg-[#111827] border-0"
          />
          <SlideTextButton
            href="/Mario-Richie-Lim-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            text="Resume / CV"
            hoverText="Download PDF"
            icon={<FileText size={16} className="text-[#6B7280]" />}
            iconPlacement="left"
            variant="custom"
            className="rounded-full bg-white border border-[#E5E7EB] px-7 py-3.5 text-sm font-semibold text-[#1F2937] hover:bg-[#F3F4F6] hover:border-[#D1D5DB]"
          />
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
            className="h-full w-full object-cover [object-position:center_20%] grayscale opacity-90 transition-all duration-700 hover:grayscale-0"
            // Eager load since this is in the initial viewport once the intro finishes
            fetchPriority="high"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF]/85 to-transparent px-6 pt-24 pb-6 sm:px-8 sm:pb-8">
            <GooeyTextReveal mode="immediate" delay={actualDelay + 1.8} className="display text-[clamp(1.4rem,2.8vw,2.2rem)] text-[#1F2937] leading-tight whitespace-pre-line">
              {hero.spotlightTitle}
            </GooeyTextReveal>
            <p className="mt-3 max-w-sm text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              {hero.spotlightCopy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
