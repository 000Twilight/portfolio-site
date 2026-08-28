import { useEffect, useRef } from "react";
import { gsap, ensureGsap } from "@/lib/reveal";
import { siteContent } from "@/lib/content/site";

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
        y: -14,
        duration: 3.6,
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
      className="grid grid-cols-1 items-stretch gap-3 pt-3 lg:h-[min(80vh,760px)] lg:grid-cols-[1fr_1.05fr]"
    >
      <div className="panel flex flex-col justify-between gap-12 p-8 sm:p-12">
        <div>
          <h1 className="display text-[clamp(2.75rem,7vw,5.25rem)]">
            {[hero.firstName, hero.lastName].map((line) => (
              <span key={line} data-hero-line className="block overflow-hidden pb-1">
                <span className="block">{line}</span>
              </span>
            ))}
          </h1>
          <div data-hero-fade className="mt-8 h-px w-24 bg-foreground/20" />
          <p
            data-hero-fade
            className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground"
          >
            {hero.eyebrow}
          </p>
        </div>

        <div data-hero-fade className="flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="panel-dark rounded-full px-7 py-4 text-sm font-semibold transition-transform duration-300 hover:scale-[1.04]"
          >
            {hero.primaryCta}
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border px-7 py-4 text-sm font-semibold transition-colors duration-300 hover:bg-secondary"
          >
            {hero.secondaryCta}
          </a>
        </div>
      </div>

      <div data-hero-panel className="panel-dark relative overflow-hidden p-3">
        <div data-hero-float className="h-full">
          <img
            src={hero.portrait}
            alt={hero.portraitAlt}
            width={1024}
            height={1280}
            className="h-full min-h-105 w-full rounded-[calc(var(--radius)+16px)] object-cover opacity-90 grayscale"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-3 bottom-3 rounded-[calc(var(--radius)+16px)] bg-linear-to-t from-card via-card/85 to-transparent px-5 pt-24 pb-6 sm:px-8 sm:pb-8">
          <p className="display text-[clamp(1.5rem,3.2vw,2.6rem)] text-card-foreground">
            {hero.spotlightTitle.split("\n").map((line: string) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <p className="mt-4 max-w-sm text-sm text-card-foreground/60">
            {hero.spotlightCopy}
          </p>
        </div>
      </div>
    </section>
  );
}
