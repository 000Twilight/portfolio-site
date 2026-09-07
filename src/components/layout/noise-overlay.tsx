"use client";

/**
 * NoiseOverlay
 *
 * A full-screen SVG fractal-noise film-grain overlay that sits at the top of
 * the z-stack and adds analogue texture to the otherwise clean digital design.
 * It is purely decorative and has zero impact on layout or interaction.
 *
 * Architecture
 * ─────────────────────────────────────────────────────────────────────────────
 * - A single fixed <div> with a CSS `background-image` generated from an
 *   inline SVG <feTurbulence> filter. This is the most performant approach —
 *   no canvas, no WebGL, no JS animation loop, just a static texture that the
 *   GPU composites as a single layer.
 * - The SVG filter uses `type="fractalNoise"` with `numOctaves="4"` for a fine,
 *   organic grain (higher octaves = finer grain, more GPU load at gen time).
 * - CSS `animation: grain-shift` subtly pans the texture over time so it feels
 *   alive rather than frozen. The animation is cheap because it only shifts a
 *   background-position, not a filter or transform.
 * - `prefers-reduced-motion`: animation is disabled; the static texture remains.
 *   (A purely static grain is still visually beneficial so we keep it.)
 * - `mix-blend-mode: overlay` blends the grain into both light and dark content
 *   naturally without requiring two separate textures.
 * - `pointer-events: none` — completely invisible to interaction.
 *
 * Props
 * ─────────────────────────────────────────────────────────────────────────────
 * opacity      (default 0.035)  — How strong the grain is. 0.02–0.06 is sweet spot.
 * animate      (default true)   — Whether the grain shifts over time.
 * baseFrequency (default 0.65)  — Noise frequency; higher = finer grain.
 * numOctaves   (default 4)      — Octaves; higher = more detail, slower initial render.
 * seed         (default 2)      — Noise seed; change for a different grain pattern.
 *
 * Usage — add to src/app/layout.tsx:
 *   import NoiseOverlay from "@/components/layout/noise-overlay";
 *   <body>
 *     <LoadingScreen />
 *     <CursorGlow />
 *     <NoiseOverlay />
 *     <SmoothScrolling>...</SmoothScrolling>
 *   </body>
 */

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/parallax/useReducedMotion";

// ─── types ─────────────────────────────────────────────────────────────────
interface NoiseOverlayProps {
  /** Overall grain strength (0–1). Default: 0.035 */
  opacity?: number;
  /** Whether the grain texture pans slowly over time. Default: true */
  animate?: boolean;
  /** SVG feTurbulence baseFrequency. Higher = finer grain. Default: 0.65 */
  baseFrequency?: number;
  /** SVG feTurbulence numOctaves. Default: 4 */
  numOctaves?: number;
  /** SVG feTurbulence seed. Default: 2 */
  seed?: number;
  /** Additional className passed to the wrapper. */
  className?: string;
}

// ─── SVG noise generator ───────────────────────────────────────────────────
/**
 * Returns a `data:image/svg+xml` URI that, when used as a CSS background-image,
 * renders a tileable fractal-noise texture. The SVG is constructed inline so
 * there is no network request and no flash of un-textured content.
 *
 * The output rectangle is 200×200 px — small enough for fast gen, large enough
 * to look non-repetitive when tiled across a viewport.
 */
function buildNoiseSvgUrl(
  baseFrequency: number,
  numOctaves: number,
  seed: number
): string {
  const svg = [
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>`,
    `  <filter id='noise'>`,
    `    <feTurbulence`,
    `      type='fractalNoise'`,
    `      baseFrequency='${baseFrequency}'`,
    `      numOctaves='${numOctaves}'`,
    `      seed='${seed}'`,
    `      stitchTiles='stitch'`,
    `    />`,
    `    <feColorMatrix type='saturate' values='0'/>`,
    `  </filter>`,
    `  <rect width='200' height='200' filter='url(#noise)' opacity='1'/>`,
    `</svg>`,
  ].join("");

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

// ─── keyframe injection ────────────────────────────────────────────────────
const STYLE_ID = "noise-overlay-keyframes";

function injectKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes grain-shift {
      0%   { background-position:   0%   0%; }
      10%  { background-position:  -5%  -10%; }
      20%  { background-position: -15%   5%; }
      30%  { background-position:   7%  -25%; }
      40%  { background-position: -5%   25%; }
      50%  { background-position: -15%  10%; }
      60%  { background-position:  15%   0%; }
      70%  { background-position:   0%  15%; }
      80%  { background-position:   3%  35%; }
      90%  { background-position: -10%  10%; }
      100% { background-position:   0%   0%; }
    }
  `;
  document.head.appendChild(style);
}

// ─── component ─────────────────────────────────────────────────────────────
export default function NoiseOverlay({
  opacity       = 0.035,
  animate       = true,
  baseFrequency = 0.65,
  numOctaves    = 4,
  seed          = 2,
  className,
}: NoiseOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Inject the keyframe rule once on mount (client-side only).
  useEffect(() => {
    injectKeyframes();
  }, []);

  const shouldAnimate = animate && !prefersReducedMotion;
  const noiseUrl      = buildNoiseSvgUrl(baseFrequency, numOctaves, seed);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{
        // ── positioning ───────────────────────────────────────────────
        position: "fixed",
        inset: 0,
        zIndex: 9997, // Below CursorGlow (9998) and LoadingScreen (9999)

        // ── interaction ───────────────────────────────────────────────
        pointerEvents: "none",

        // ── texture ───────────────────────────────────────────────────
        backgroundImage: noiseUrl,
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",

        // ── blending ─────────────────────────────────────────────────
        opacity,
        mixBlendMode: "overlay",

        // ── animation ────────────────────────────────────────────────
        ...(shouldAnimate
          ? {
              animation: "grain-shift 8s steps(10) infinite",
              willChange: "background-position",
            }
          : {}),
      }}
    />
  );
}
