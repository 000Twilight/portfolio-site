"use client";

/**
 * CursorGlow
 *
 * A GPU-composited radial glow that follows the cursor with GSAP quickTo
 * for buttery-smooth lag. On desktop it renders as a soft radial gradient
 * orb that brightens interactive elements as you hover. On touch devices it
 * renders nothing at all.
 *
 * Architecture
 * ─────────────────────────────────────────────────────────────────────────────
 * - A single fixed <div> positioned via CSS `left` / `top` (GSAP targets these
 *   directly with quickTo for minimal reflow cost).
 * - The orb itself is `pointer-events: none` so it never interferes with clicks.
 * - Two GSAP quickTo tweens (x, y) with different stiffnesses give the glow a
 *   natural "lag behind" feel without any manual lerp loop.
 * - A `mix-blend-mode: screen` overlay lets the glow lighten content without
 *   covering text or buttons.
 * - prefers-reduced-motion: renders nothing (same as touch).
 *
 * Palette
 * ─────────────────────────────────────────────────────────────────────────────
 * Core glow : #38bdf8  (sky-cyan)   opacity 0.07
 * Outer ring: transparent
 *
 * Usage — add to src/app/layout.tsx, a sibling of SmoothScrolling:
 *   import CursorGlow from "@/components/layout/cursor-glow";
 *   <body>
 *     <LoadingScreen />
 *     <CursorGlow />
 *     <SmoothScrolling>...</SmoothScrolling>
 *   </body>
 */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/components/parallax/useReducedMotion";

// ─── config ────────────────────────────────────────────────────────────────
/** Diameter of the glow orb in pixels. */
const SIZE = 520;

/** quickTo power — lower = more lag (dreamier), higher = snappier. */
const STIFFNESS = 0.1;

/** Glow opacity at idle. Scales up on hover via CSS variable. */
const BASE_OPACITY = 0.55;

/** Glow color (RGB, no alpha — alpha controlled separately). */
const GLOW_COLOR = "31, 41, 55"; // #1F2937 (Charcoal Blue)

export default function CursorGlow() {
  const glowRef       = useRef<HTMLDivElement>(null);
  const innerRef      = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // No glow on touch-primary devices or when motion is reduced.
    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isTouch) return;

    const el    = glowRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    const half = SIZE / 2;

    // Position orb off-screen initially so it doesn't flash at (0,0).
    gsap.set(el, { x: -SIZE, y: -SIZE, force3D: true });

    // ── quickTo tweens ──────────────────────────────────────────────────
    // x and y have slightly different stiffness values so the glow feels
    // organic rather than mechanically linear.
    const moveX = gsap.quickTo(el, "x", { duration: STIFFNESS * 8, ease: "power3.out" });
    const moveY = gsap.quickTo(el, "y", { duration: STIFFNESS * 9, ease: "power3.out" });

    // ── enter / leave handlers ─────────────────────────────────────────
    const onEnter = () => {
      setVisible(true);
      gsap.to(inner, { opacity: BASE_OPACITY, duration: 0.5, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(inner, { opacity: 0, duration: 0.8, ease: "power2.in" });
    };

    // ── scale-up on hovering interactive elements ──────────────────────
    const onInteractiveEnter = () => {
      gsap.to(inner, { scale: 1.4, duration: 0.4, ease: "power2.out", overwrite: "auto" });
    };
    const onInteractiveLeave = () => {
      gsap.to(inner, { scale: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
    };

    // ── mouse move ────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      moveX(e.clientX - half);
      moveY(e.clientY - half);
    };

    // ── interactive element tracking ──────────────────────────────────
    const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, [data-cursor-grow]";

    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(INTERACTIVE)) {
        onInteractiveEnter();
      }
    };
    const onMouseOut = (e: MouseEvent) => {
      if ((e.target as Element).closest(INTERACTIVE)) {
        onInteractiveLeave();
      }
    };

    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mousemove",  onMove,     { passive: true });
    document.addEventListener("mouseover",  onMouseOver, { passive: true });
    document.addEventListener("mouseout",   onMouseOut,  { passive: true });

    return () => {
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  onMouseOver);
      document.removeEventListener("mouseout",   onMouseOut);
    };
  }, [prefersReducedMotion]);

  // Touch and reduced-motion: render nothing.
  if (prefersReducedMotion) return null;

  return (
    /*
     * The outer div is the GSAP target — positioned absolutely in fixed space.
     * Its size matches SIZE so the radial gradient is always centred on cursor.
     */
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width:  SIZE,
        height: SIZE,
        pointerEvents: "none",
        zIndex: 9998, // Below LoadingScreen (9999) but above everything else
        willChange: "transform",
      }}
    >
      {/*
       * The inner div holds the actual gradient.
       * mix-blend-mode: screen makes it additive — it brightens whatever is
       * below without covering text.
       */}
      <div
        ref={innerRef}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          opacity: 0, // Start invisible; fades in on first mouseenter
          mixBlendMode: "multiply",
          background: `radial-gradient(
            circle at center,
            rgba(${GLOW_COLOR}, 0.18) 0%,
            rgba(${GLOW_COLOR}, 0.09) 25%,
            rgba(${GLOW_COLOR}, 0.03) 55%,
            transparent 75%
          )`,
          willChange: "transform, opacity",
        }}
      />

      {/*
       * Tiny hard-centre dot — gives the glow a focal point so it doesn't
       * look like a floating cloud. Barely perceptible at 4px.
       */}
      {visible && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 4,
            height: 4,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            background: `rgba(${GLOW_COLOR}, 0.7)`,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
