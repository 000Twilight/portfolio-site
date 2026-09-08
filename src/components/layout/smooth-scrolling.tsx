"use client";

import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/components/parallax/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollingProps {
  children: React.ReactNode;
}

export default function SmoothScrolling({ children }: SmoothScrollingProps) {
  const lenisRef = useRef<any>(null);
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  useEffect(() => {
    // 1. Hook Lenis into GSAP's ticker
    function update(time: number) {
      // GSAP passes time in seconds, Lenis expects milliseconds
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    // 2. Prevent GSAP from dropping frames
    gsap.ticker.lagSmoothing(0);

    // 3. Keep ScrollTrigger math perfectly synced
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  // Disable smooth scroll for users who prefer reduced motion
  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.08, // The "weight" of the inertia (lower = smoother/heavier)
        syncTouch: true, // Smooths out touch events on mobile
      }}
      autoRaf={false} // Disable auto-RAF so GSAP controls the loop
    >
      {children}
    </ReactLenis>
  );
}
