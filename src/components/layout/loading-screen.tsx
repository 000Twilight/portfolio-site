"use client";

/**
 * LoadingScreen
 *
 * A cinematic curtain-split loading screen that blocks the site on first paint,
 * counts to 100 %, then splits vertically to reveal the page below.
 *
 * Architecture
 * ─────────────────────────────────────────────────────────────────────────────
 * - Two absolutely-positioned panels (top / bottom) each fill half the viewport.
 *   The central content lives in the top panel so it stays centred during split.
 * - A single GSAP timeline: name fade-in → line expansion / counter count-up
 *   (in parallel) → curtain split → DOM removal.
 * - prefers-reduced-motion: skips straight to removal, no animation.
 * - Body scroll is locked for the duration and restored on cleanup / completion.
 *
 * Usage — add to src/app/layout.tsx inside the body element:
 *   import LoadingScreen from "@/components/layout/loading-screen";
 *   <body>
 *     <LoadingScreen />
 *     <SmoothScrolling>...</SmoothScrolling>
 *   </body>
 *
 * Palette (cinematic dark, independent of the site CSS variables)
 * ─────────────────────────────────────────────────────────────────────────────
 * Background : #030610  (deep navy)
 * Cyan accent: #38bdf8
 * Amber accent: #fbbf24
 */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/components/parallax/useReducedMotion";

// ─── timing constants (seconds) ────────────────────────────────────────────
const ENTER_DELAY   = 0.05;
const NAME_DURATION = 0.75;
const LINE_DURATION = 1.55;
const COUNTER_DELAY = 0.05;
const EXIT_START    = 2.15;
const EXIT_DURATION = 0.85;

export default function LoadingScreen() {
  const [alive, setAlive] = useState(true);

  const topCurtainRef = useRef<HTMLDivElement>(null);
  const botCurtainRef = useRef<HTMLDivElement>(null);
  const nameRef       = useRef<HTMLDivElement>(null);
  const subtitleRef   = useRef<HTMLParagraphElement>(null);
  const lineRef       = useRef<HTMLDivElement>(null);
  const counterRef    = useRef<HTMLSpanElement>(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setAlive(false);
      return;
    }

    const top     = topCurtainRef.current;
    const bot     = botCurtainRef.current;
    const name    = nameRef.current;
    const sub     = subtitleRef.current;
    const line    = lineRef.current;
    const counter = counterRef.current;

    if (!top || !bot || !name || !sub || !line || !counter) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // ── initial GSAP states ───────────────────────────────────────────────
    gsap.set([top, bot], { yPercent: 0 });
    gsap.set([name, sub], { opacity: 0, y: 28, force3D: true });
    gsap.set(line, { scaleX: 0, transformOrigin: "left center", force3D: true });
    gsap.set(counter, { opacity: 0 });

    const obj = { val: 0 };

    const tl = gsap.timeline({
      onComplete() {
        document.body.style.overflow = prevOverflow;
        setAlive(false);
      },
    });

    tl
      // 1. Name slides up + fades in
      .to(name, {
        opacity: 1, y: 0,
        duration: NAME_DURATION,
        ease: "power3.out",
        force3D: true,
      }, ENTER_DELAY)

      // 2. Subtitle follows slightly behind
      .to(sub, {
        opacity: 1, y: 0,
        duration: NAME_DURATION * 0.8,
        ease: "power3.out",
        force3D: true,
      }, ENTER_DELAY + 0.1)

      // 3. Counter number becomes visible
      .to(counter, { opacity: 1, duration: 0.25 }, ENTER_DELAY + 0.2)

      // 4. Progress line expands left → right
      .to(line, {
        scaleX: 1,
        duration: LINE_DURATION,
        ease: "power2.inOut",
        force3D: true,
      }, ENTER_DELAY + COUNTER_DELAY)

      // 5. Counter ticks 0 → 100 in sync with the line
      .to(obj, {
        val: 100,
        duration: LINE_DURATION,
        ease: "power2.inOut",
        onUpdate() {
          if (counter) counter.textContent = String(Math.round(obj.val));
        },
      }, ENTER_DELAY + COUNTER_DELAY)

      // 6. Top curtain sweeps up off-screen
      .to(top, {
        yPercent: -100,
        duration: EXIT_DURATION,
        ease: "power4.inOut",
        force3D: true,
      }, EXIT_START)

      // 7. Bottom curtain sweeps down off-screen (simultaneous)
      .to(bot, {
        yPercent: 100,
        duration: EXIT_DURATION,
        ease: "power4.inOut",
        force3D: true,
      }, EXIT_START);

    return () => {
      tl.kill();
      document.body.style.overflow = prevOverflow;
    };
  }, [prefersReducedMotion]);

  if (!alive) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden"
    >
      {/* ── Top curtain — holds the intro content ────────────────────────── */}
      <div
        ref={topCurtainRef}
        className="absolute inset-x-0 top-0 h-1/2 flex flex-col items-center justify-end"
        style={{
          background: "#F9FAFB",
          willChange: "transform",
          paddingBottom: "clamp(2rem, 5vw, 4rem)",
        }}
      >
        <div className="flex flex-col items-center gap-5">

          {/* Name */}
          <div ref={nameRef}>
            <h1
              style={{
                fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                fontSize: "clamp(2.75rem, 8vw, 5.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                color: "#1F2937",
                margin: 0,
              }}
            >
              Mario<span style={{ color: "#6B7280" }}>.</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#6B7280",
              margin: 0,
              fontWeight: 300,
            }}
          >
            Portfolio &middot; 2025
          </p>

          {/* Progress bar + counter */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              width: "clamp(14rem, 30vw, 22rem)",
            }}
          >
            {/* Track — clips the gradient so it does not bleed outside */}
            <div
              style={{
                flex: 1,
                height: "1px",
                overflow: "hidden",
                background: "rgba(31, 41, 55, 0.08)",
                position: "relative",
              }}
            >
              <div
                ref={lineRef}
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, #1F2937 0%, #6B7280 50%, #E5E7EB 100%)",
                  willChange: "transform",
                }}
              />
            </div>

            {/* Monospaced percentage counter */}
            <span
              ref={counterRef}
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: "0.7rem",
                color: "#6B7280",
                width: "2.25rem",
                textAlign: "right",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              0
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom curtain ───────────────────────────────────────────────── */}
      <div
        ref={botCurtainRef}
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{ background: "#F9FAFB", willChange: "transform" }}
      />
    </div>
  );
}
