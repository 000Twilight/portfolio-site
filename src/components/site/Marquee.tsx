import { siteContent } from "@/lib/content/site";
import { gsap } from "@/lib/reveal";
import { useEffect, useRef } from "react";

export function Marquee() {
  const words = siteContent.marquee.words;
  const run = [...words, ...words];
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || !track.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        track.current,
        { xPercent: 0 },
        {
          xPercent: -50,
          duration: 28,
          ease: "none",
          repeat: -1,
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="mt-3 overflow-hidden py-6" aria-hidden="true">
      <div ref={track} className="flex w-max items-center gap-10 whitespace-nowrap">
        {run.map((w, i) => (
          <span
            key={`${w}-${i}`}
            className="display flex items-center gap-10 text-[clamp(2rem,5vw,4rem)] text-foreground/15"
          >
            {w}
            <span className="size-2 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
