"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./keyboard-scroll-section.css";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────────
   CONFIGURATION — Edit these values to customise the section behaviour.
───────────────────────────────────────────────────────────────────────────── */

/**
 * Which frame sequence to load by default.
 *   1  →  public/assets/images/1/  (ezgif-frame-001.jpg … 240.jpg)
 *   2  →  public/assets/images/2/  (ezgif-frame-001.jpg … 240.jpg)
 *   3  →  public/assets/images/3/  (ezgif-frame-001.jpg … 240.jpg)
 * Change this one number to switch versions globally.
 */
const FRAME_SEQUENCE: 1 | 2 | 3 = 1;

/** Total frames per sequence. Must match what is on disk. */
const TOTAL_FRAMES = 190;

/**
 * Pinned scroll distance (px).  The section stays pinned while the user
 * scrolls this many pixels.  Increase for a slower / longer scrub; decrease
 * for a faster / shorter one.
 */
const SCROLL_DISTANCE = 3000;

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────────────────── */

/** Zero-pads to 3 digits: 1 → "001", 24 → "024", 240 → "240". */
function pad3(n: number): string {
  return String(n).padStart(3, "0");
}

/**
 * Returns the public URL for a single frame.
 * frameIndex is 0-based; on-disk files are 1-based (001 … 240).
 */
function frameUrl(sequence: 1 | 2 | 3, frameIndex: number): string {
  return `/assets/images/${sequence}/ezgif-frame-${pad3(frameIndex + 1)}.jpg`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/* ─────────────────────────────────────────────────────────────────────────────
   useFrameImages
   Preloads all frames and reports progress without triggering a re-render per
   frame.  Returns a stable ref to the images array.
───────────────────────────────────────────────────────────────────────────── */

function useFrameImages(
  sequence: 1 | 2 | 3,
  totalFrames: number,
  onProgress: (p: number) => void,
  onReady: () => void,
) {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const abortedRef = useRef(false);

  useEffect(() => {
    abortedRef.current = false;
    const images: HTMLImageElement[] = new Array(totalFrames);
    imagesRef.current = images;
    let loaded = 0;

    function handleLoad() {
      if (abortedRef.current) return;
      loaded += 1;
      onProgress(loaded / totalFrames);
      if (loaded === totalFrames) onReady();
    }

    for (let i = 0; i < totalFrames; i++) {
      const img = new window.Image();
      img.onload = handleLoad;
      img.onerror = handleLoad; // count errors so we never hang
      img.src = frameUrl(sequence, i);
      images[i] = img;
    }

    return () => {
      abortedRef.current = true;
      for (const img of images) {
        img.onload = null;
        img.onerror = null;
        img.src = "";
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequence]);

  return imagesRef;
}

/* ─────────────────────────────────────────────────────────────────────────────
   useCanvasRenderer
   Imperative canvas drawing with DPR support and "object-fit: contain" math.
───────────────────────────────────────────────────────────────────────────── */

function useCanvasRenderer(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) {
  const lastFrameRef = useRef(-1);

  const draw = useCallback(
    (img: HTMLImageElement | undefined) => {
      const canvas = canvasRef.current;
      if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      const physW = Math.round(cssW * dpr);
      const physH = Math.round(cssH * dpr);

      // Resize the backing store only when necessary
      if (canvas.width !== physW || canvas.height !== physH) {
        canvas.width = physW;
        canvas.height = physH;
        ctx.scale(dpr, dpr);
      }

      // Object-fit: contain — no stretching, centred
      const srcW = img.naturalWidth;
      const srcH = img.naturalHeight;
      const scale = Math.min(cssW / srcW, cssH / srcH);
      const dstW = srcW * scale;
      const dstH = srcH * scale;
      const offsetX = (cssW - dstW) / 2;
      const offsetY = (cssH - dstH) / 2;

      ctx.clearRect(0, 0, cssW, cssH);
      ctx.drawImage(img, offsetX, offsetY, dstW, dstH);
    },
    [canvasRef],
  );

  const drawFrame = useCallback(
    (images: HTMLImageElement[], frameIndex: number) => {
      if (frameIndex === lastFrameRef.current) return;
      lastFrameRef.current = frameIndex;
      draw(images[frameIndex]);
    },
    [draw],
  );

  /** Invalidates the cache and forces a redraw (use on resize). */
  const redraw = useCallback(
    (images: HTMLImageElement[], frameIndex: number) => {
      lastFrameRef.current = -1;
      draw(images[frameIndex]);
      lastFrameRef.current = frameIndex;
    },
    [draw],
  );

  return { drawFrame, redraw };
}

/* ─────────────────────────────────────────────────────────────────────────────
   KeyboardScrollSection
───────────────────────────────────────────────────────────────────────────── */

interface KeyboardScrollSectionProps {
  /** Override the frame sequence (1, 2, or 3) from the parent component. */
  sequence?: 1 | 2 | 3;
  /** Override the pinned scroll distance in pixels from the parent component. */
  scrollDistance?: number;
}

export default function KeyboardScrollSection({
  sequence: sequenceProp,
  scrollDistance: scrollDistanceProp,
}: KeyboardScrollSectionProps = {}) {
  const [activeSequence, setActiveSequence] = useState<1 | 2 | 3>(
    sequenceProp ?? FRAME_SEQUENCE,
  );
  const scrollDistance = scrollDistanceProp ?? SCROLL_DISTANCE;

  // Loading state
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  // DOM refs
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(0);

  // Stable callbacks for the frame loader
  const handleProgress = useCallback((p: number) => setProgress(p), []);
  const handleReady = useCallback(() => {
    setReady(true);
    setProgress(1);
  }, []);

  const imagesRef = useFrameImages(
    activeSequence,
    TOTAL_FRAMES,
    handleProgress,
    handleReady,
  );

  const { drawFrame, redraw } = useCanvasRenderer(canvasRef);

  // GSAP ScrollTrigger — only created once frames are ready
  useEffect(() => {
    if (!ready) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      drawFrame(imagesRef.current, 0);

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: true,
        scrub: 1,
        onUpdate(self) {
          const frameIndex = clamp(
            Math.round(self.progress * (TOTAL_FRAMES - 1)),
            0,
            TOTAL_FRAMES - 1,
          );
          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            drawFrame(imagesRef.current, frameIndex);
          }
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [ready, scrollDistance, drawFrame, imagesRef]);

  // ResizeObserver — redraws and refreshes ScrollTrigger on viewport change
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new ResizeObserver(() => {
      redraw(imagesRef.current, currentFrameRef.current);
      ScrollTrigger.refresh();
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [ready, redraw, imagesRef]);

  // Reset when the active sequence changes
  useEffect(() => {
    setProgress(0);
    setReady(false);
    currentFrameRef.current = 0;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [activeSequence]);

  const loadingPct = Math.round(progress * 100);

  return (
    <section
      ref={sectionRef}
      className="kss-root"
      aria-label="Keyboard animation — scroll to animate"
    >
      {/* Canvas — always in the DOM so ResizeObserver can attach early */}
      <canvas ref={canvasRef} className="kss-canvas" aria-hidden="true" />

      {/* Loading overlay — permanently mounted to prevent React DOM reconciliation removeChild collisions */}
      <div
        className="kss-loader"
        style={{
          opacity: ready ? 0 : 1,
          visibility: ready ? "hidden" : "visible",
          pointerEvents: ready ? "none" : "auto",
          transition: "opacity 0.3s ease, visibility 0.3s ease",
        }}
        aria-live="polite"
        aria-hidden={ready}
      >
        <div className="kss-loader-bar-track">
          <div
            className="kss-loader-bar-fill"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
        <p className="kss-loader-text">{loadingPct}%</p>
      </div>
    </section>
  );
}
