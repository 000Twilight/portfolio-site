"use client";

import React, { useState, useRef, useCallback } from "react";
import { RealityCompositionProps } from "./types";

export type RealityType = "orig" | "tech" | "mc";

interface Shard {
  id: number;
  cssPoints: string;
  svgPoints: string;
  centerX: number;
  centerY: number;
}

interface ShardData {
  shards: Shard[];
  seams: string[];
}

/**
 * Sutherland-Hodgman polygon clipping.
 * Clips poly against the half-plane to the left of directed edge p1->p2.
 */
function clipPoly(
  poly: Array<[number, number]>,
  p1: [number, number],
  p2: [number, number],
): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  const n = poly.length;
  const side = (p: [number, number]) =>
    (p2[0] - p1[0]) * (p[1] - p1[1]) - (p2[1] - p1[1]) * (p[0] - p1[0]);

  for (let i = 0; i < n; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % n];
    const sa = side(a);
    const sb = side(b);

    if (sa >= 0) out.push(a);
    if ((sa > 0 && sb < 0) || (sa < 0 && sb > 0)) {
      const t = sa / (sa - sb);
      out.push([a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]);
    }
  }

  return out;
}

/**
 * Computes a Voronoi cell for seed si by clipping a bounding box
 * against perpendicular bisectors. All edges are perfectly straight.
 */
function voronoiCell(
  si: [number, number],
  all: Array<[number, number]>,
): Array<[number, number]> {
  let poly: Array<[number, number]> = [
    [-5, -5], [105, -5], [105, 105], [-5, 105],
  ];

  for (const sj of all) {
    if (sj === si) continue;
    const mx = (si[0] + sj[0]) / 2;
    const my = (si[1] + sj[1]) / 2;
    const nx = sj[0] - si[0];
    const ny = sj[1] - si[1];
    // CCW 90-degree perpendicular keeps si to the left
    const p1: [number, number] = [mx - ny, my + nx];
    const p2: [number, number] = [mx + ny, my - nx];
    poly = clipPoly(poly, p1, p2);
    if (poly.length === 0) break;
  }

  return poly.map(([x, y]) => [
    Math.max(0, Math.min(100, x)),
    Math.max(0, Math.min(100, y)),
  ]);
}

/**
 * Builds an organic glass-shard layout using Voronoi decomposition.
 * Seed points hand-tuned for an editorial, asymmetric fracture feel.
 * All resulting polygon edges are straight lines -- no curves.
 */
function createShardLayout(): ShardData {
  const seeds: Array<[number, number]> = [
    // 1 center piece (slightly offset for organic feel)
    [42, 55],
    // 6 surrounding pieces for an asymmetrical fracture
    [15, 25], [75, 15],
    [85, 65], [60, 85],
    [25, 85], [5, 45],
  ];

  const shards: Shard[] = [];
  const seamMap = new Map<string, string>();

  seeds.forEach((seed, i) => {
    const poly = voronoiCell(seed, seeds);
    if (poly.length < 3) return;

    const rounded = poly.map(([x, y]): [number, number] => [
      Math.round(x * 100) / 100,
      Math.round(y * 100) / 100,
    ]);

    const cssPoints = rounded.map(([x, y]) => `${x}% ${y}%`).join(", ");
    const svgPoints = rounded.map(([x, y]) => `${x},${y}`).join(" ");
    const cx = rounded.reduce((s, [x]) => s + x, 0) / rounded.length;
    const cy = rounded.reduce((s, [, y]) => s + y, 0) / rounded.length;

    // Collect interior seams (skip boundary edges at 0/100)
    const onBorder = ([x, y]: [number, number]) =>
      x <= 0 || x >= 100 || y <= 0 || y >= 100;

    for (let j = 0; j < rounded.length; j++) {
      const a = rounded[j];
      const b = rounded[(j + 1) % rounded.length];
      if (onBorder(a) && onBorder(b)) continue;
      const fwd = `${a[0]}_${a[1]}~${b[0]}_${b[1]}`;
      const rev = `${b[0]}_${b[1]}~${a[0]}_${a[1]}`;
      const canonKey = [fwd, rev].sort()[0];
      if (!seamMap.has(canonKey)) {
        seamMap.set(canonKey, `${a[0]},${a[1]} ${b[0]},${b[1]}`);
      }
    }

    shards.push({
      id: i,
      cssPoints,
      svgPoints,
      centerX: Math.round(cx * 100) / 100,
      centerY: Math.round(cy * 100) / 100,
    });
  });

  return { shards, seams: Array.from(seamMap.values()) };
}

// Generated once at module load
const SHARD_DATA = createShardLayout();

// Initial reality: left third = tech, center = orig, right = mc
const INITIAL_REALITIES: RealityType[] = SHARD_DATA.shards.map((s) => {
  if (s.centerX < 35) return "tech";
  if (s.centerX < 70) return "orig";
  return "mc";
});

const REALITY_CYCLE: Record<RealityType, RealityType> = {
  orig: "tech",
  tech: "mc",
  mc:   "orig",
};

export default function FracturedComposition({
  heroImage,
  heroImage2,
  heroImage3,
}: RealityCompositionProps) {
  const [pieceRealities, setPieceRealities] =
    useState<RealityType[]>(INITIAL_REALITIES);
  const rootRef = useRef<HTMLDivElement>(null);
  const rafRef  = useRef<number | null>(null);

  // Micro-parallax via CSS custom properties -- no React re-renders on pointermove
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!rootRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width  - 0.5;
    const ny = (e.clientY - rect.top)  / rect.height - 0.5;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rootRef.current?.style.setProperty("--mx", nx.toFixed(4));
      rootRef.current?.style.setProperty("--my", ny.toFixed(4));
    });
  };

  const handlePointerLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rootRef.current?.style.setProperty("--mx", "0");
    rootRef.current?.style.setProperty("--my", "0");
  };

  const handleShardClick = useCallback((index: number) => {
    setPieceRealities((prev) => {
      const next = [...prev];
      next[index] = REALITY_CYCLE[next[index]];
      return next;
    });
  }, []);

  const imgSrc = (r: RealityType) =>
    r === "orig" ? heroImage : r === "tech" ? heroImage2 : heroImage3;

  return (
    <div
      ref={rootRef}
      className="sf-frac-root"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Soft base fill -- masks sub-pixel rendering gaps between shards */}
      <div className="sf-frac-base">
        <img
          src={heroImage}
          alt=""
          className="sf-frac-img sf-depth-orig"
          draggable={false}
        />
      </div>

      {/* Glass shards -- each clipped to its Voronoi polygon */}
      {SHARD_DATA.shards.map((shard, i) => (
        <div
          key={`shard-${shard.id}`}
          className="sf-frac-zone"
          style={{ clipPath: `polygon(${shard.cssPoints})` }}
        >
          <img
            src={imgSrc(pieceRealities[i])}
            alt=""
            className={`sf-frac-img sf-depth-${pieceRealities[i]}`}
            draggable={false}
          />
        </div>
      ))}

      {/* SVG -- fracture seams + invisible hit polygons */}
      <svg
        className="sf-frac-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Dark shadow seam -- physical depth */}
        {SHARD_DATA.seams.map((pts, i) => (
          <polyline
            key={`shadow-${i}`}
            points={pts}
            className="sf-seam-shadow"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {/* Thin specular edge -- glassy light catch */}
        {SHARD_DATA.seams.map((pts, i) => (
          <polyline
            key={`spec-${i}`}
            points={pts}
            className="sf-seam-spec"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Interactive hit regions */}
        {SHARD_DATA.shards.map((shard, i) => (
          <polygon
            key={`hit-${shard.id}`}
            points={shard.svgPoints}
            className="sf-frac-hit"
            onClick={() => handleShardClick(i)}
            aria-label={`Shard ${i + 1} -- click to shift reality`}
          />
        ))}
      </svg>

      <style>{`
        .sf-frac-root {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background: #050508;
          user-select: none;
          --mx: 0;
          --my: 0;
        }
        .sf-frac-base {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0.22;
          pointer-events: none;
        }
        .sf-frac-zone {
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
          will-change: clip-path;
        }
        .sf-frac-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          pointer-events: none;
          will-change: transform;
          transition: transform 0.18s ease-out;
        }
        .sf-depth-orig {
          transform: translate(calc(var(--mx, 0) * 5px), calc(var(--my, 0) * 5px)) scale(1.04);
        }
        .sf-depth-tech {
          transform: translate(calc(var(--mx, 0) * 9px), calc(var(--my, 0) * 9px)) scale(1.04);
        }
        .sf-depth-mc {
          transform: translate(calc(var(--mx, 0) * 3px), calc(var(--my, 0) * 3px)) scale(1.04);
        }
        .sf-frac-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
          pointer-events: none;
          overflow: visible;
        }
        .sf-seam-shadow {
          fill: none;
          stroke: rgba(0, 0, 0, 0.6);
          stroke-width: 1.8px;
          stroke-linecap: butt;
          stroke-linejoin: miter;
        }
        .sf-seam-spec {
          fill: none;
          stroke: rgba(255, 255, 255, 0.4);
          stroke-width: 0.5px;
          stroke-linecap: butt;
          stroke-linejoin: miter;
        }
        .sf-frac-hit {
          fill: transparent;
          pointer-events: auto;
          cursor: pointer;
          transition: fill 0.1s ease;
        }
        .sf-frac-hit:hover  { fill: rgba(255, 255, 255, 0.04); }
        .sf-frac-hit:active { fill: rgba(255, 255, 255, 0.10); }
      `}</style>
    </div>
  );
}
