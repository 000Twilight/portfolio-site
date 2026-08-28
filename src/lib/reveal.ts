import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
function ensureGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

/**
 * Scroll-triggered stagger reveal for any children marked with [data-reveal].
 * Returns a ref to attach to the section root.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    ensureGsap();
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (!items.length) return;
      gsap.set(items, { opacity: 0, y: 28 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 82%" },
      });
    }, root);

    return () => ctx.revert();
  }, [delay]);

  return ref;
}

export { gsap, ensureGsap, ScrollTrigger };
