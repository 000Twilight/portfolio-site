"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export default function LoadingScreen() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();

  const [isActive, setIsActive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const slicesRef = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLDivElement>(null);
  
  // To avoid running the loader infinitely or flashing on instantaneous mounts
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsActive(false);
      return;
    }

    // Reactivate for the new route
    setIsActive(true);

    const tl = gsap.timeline();
    // Snap everything into blocking position instantly
    gsap.set(containerRef.current, { autoAlpha: 1 });
    gsap.set(slicesRef.current, { yPercent: 0 });
    gsap.set(counterRef.current, { opacity: 1, y: 0, scale: 1 });
    if (counterRef.current) counterRef.current.innerText = "0%";

    let cancelled = false;
    let loadedCount = 0;

    // Small delay to allow Next.js to inject new route's DOM
    const timer = setTimeout(() => {
      if (cancelled) return;

      const imgs = Array.from(document.querySelectorAll("img"));
      // We only track images that are eager or currently rendering without lazy
      const pendingImgs = imgs.filter((img) => !img.complete);

      const triggerOutro = () => {
        if (cancelled) return;
        
        // Prevent body scroll during animation
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const outroTl = gsap.timeline({
          onComplete: () => {
            setIsActive(false);
            document.body.style.overflow = prevOverflow;
          },
        });

        // 1. Counter glitches/scales out
        outroTl.to(counterRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          ease: "power3.in",
        });

        // 2. Slices slide out in staggered alternating directions
        outroTl.to(
          slicesRef.current,
          {
            yPercent: (i) => (i % 2 === 0 ? -100 : 100),
            duration: 0.9,
            ease: "power4.inOut",
            stagger: 0.05,
          },
          "-=0.2"
        );
      };

      if (pendingImgs.length === 0) {
        // If no images need loading, quickly animate out
        if (counterRef.current) counterRef.current.innerText = "100%";
        // Give a slight visual pause so the user registers the transition, 
        // unless they want it completely invisible. The prompt requested:
        // "if theres no image... then dont make it load always, make it go through"
        // So we transition immediately.
        triggerOutro();
        return;
      }

      const updateProgress = () => {
        loadedCount++;
        const p = Math.round((loadedCount / pendingImgs.length) * 100);
        
        if (counterRef.current) {
          counterRef.current.innerText = `${p}%`;
        }

        if (loadedCount >= pendingImgs.length) {
          triggerOutro();
        }
      };

      pendingImgs.forEach((img) => {
        img.addEventListener("load", updateProgress);
        img.addEventListener("error", updateProgress); // treat errors as loaded
      });

      // Fallback timeout to ensure we never hang the app if an image fails silently
      const fallback = setTimeout(() => {
        if (!cancelled && isActive) {
          if (counterRef.current) counterRef.current.innerText = "100%";
          triggerOutro();
        }
      }, 3500);

      return () => {
        clearTimeout(fallback);
        pendingImgs.forEach((img) => {
          img.removeEventListener("load", updateProgress);
          img.removeEventListener("error", updateProgress);
        });
      };
    }, 100); // 100ms allows DOM update

    isFirstMount.current = false;

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pathname, searchParams, prefersReducedMotion]);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none flex flex-row overflow-hidden"
    >
      {/* 5 Vertical Slices */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          ref={(el) => {
            slicesRef.current[i] = el;
          }}
          className="h-full flex-1 bg-[#111827]" // Dark slate color for premium feel
          style={{ willChange: "transform" }}
        />
      ))}

      {/* Center Counter */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={counterRef}
          className="text-[#F9FAFB] text-6xl md:text-8xl font-bold tracking-tighter mix-blend-difference"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          0%
        </div>
      </div>
    </div>
  );
}
