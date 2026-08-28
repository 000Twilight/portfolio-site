import { useEffect } from "react";
import { gsap, ScrollTrigger, useReveal } from "@/lib/reveal";
import { siteContent } from "@/lib/content/site";

export function About() {
  const ref = useReveal<HTMLElement>();
  const about = siteContent.about;

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const counters = Array.from(root.querySelectorAll<HTMLElement>('[data-count-up]'));
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
            duration: 1.4,
            delay: index * 0.08,
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
    <section ref={ref} id="about" className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
      <div className="panel p-8 sm:p-12">
        <p data-reveal className="text-sm text-muted-foreground">{about.title}</p>
        <p
          data-reveal
          className="mt-6 text-[clamp(1.35rem,2.3vw,1.9rem)] leading-[1.35] tracking-tight"
        >
          {about.copy}
        </p>
        <div data-reveal className="mt-10 flex flex-wrap gap-2">
          {about.capabilities.map((c) => (
            <span
              key={c}
              className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="panel-dark flex flex-col justify-between gap-10 p-8 sm:p-12">
        <p data-reveal className="text-sm text-card-foreground/60">
          By the numbers
        </p>
        <dl data-reveal className="grid grid-cols-2 gap-8">
          {about.metrics.map(({ value, suffix, label }) => (
            <div key={label}>
              <dt
                data-count-up
                data-target={value}
                data-suffix={suffix}
                className="display text-[clamp(2.25rem,4vw,3.25rem)]"
              >
                0{suffix}
              </dt>
              <dd className="mt-2 text-sm text-card-foreground/60">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
