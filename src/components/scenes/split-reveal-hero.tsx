"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { Hero } from "@/components/sections/hero";
import "./split-reveal-hero.css";

type Triple = [string, string, string];

export interface SplitRevealHeroProps {
  /** Top-left brand label shown in the cover phase */
  studio?: string;
  /** Numeral that animates into a large accent alongside the name */
  numeral?: string;
  /** Monogram shown in the in-scene nav */
  logo?: string;
  /** Three ambient tags scattered around the scene */
  tags?: Triple;
  /** Hero background image path (served from /public) */
  heroImage?: string;
  /** Second hero image for the comparison slider */
  heroImage2?: string;
  /** Third hero image for the comparison slider */
  heroImage3?: string;
  /** Right-hand label in the in-scene nav */
  menuLabel?: string;
  /** Bottom-left footer text */
  footerLeft?: string;
  /** Bottom-right footer text */
  footerRight?: string;
  className?: string;
}

const splitChars = (text: string, markFirst = false) =>
  Array.from(text).map((char, index) => (
    <span
      className={`sf-char${markFirst && index === 0 ? " sf-first" : ""}`}
      key={`${char}-${index}`}
    >
      <span>{char === " " ? "\u00A0" : char}</span>
    </span>
  ));

const splitWords = (text: string) => {
  const words = text.split(" ");

  return words.map((word, index) => (
    <span className="sf-word" key={`${word}-${index}`}>
      {word}
      {index < words.length - 1 ? "\u00A0" : ""}
    </span>
  ));
};

export default function SplitRevealHero({
  // ── Cover phase ──────────────────────────────────────────────────────────
  studio = "Mario Richie Lim",
  numeral = "26",              // graduating year / age — personal touch
  // ── In-scene chrome ──────────────────────────────────────────────────────
  logo = "MRL",
  tags = ["Full-Stack Dev", "Building What Matters", "Jakarta · 2026"],
  menuLabel = "Portfolio",
  footerLeft = "Scroll Down",
  footerRight = "Design · Code · Craft",
  className = "",
}: SplitRevealHeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
    const hasPlayed = sessionStorage.getItem("introPlayed");
    if (hasPlayed) {
      setIsComplete(true);
      return;
    }
    sessionStorage.setItem("introPlayed", "true");

    const root = rootRef.current;
    if (!root) return;

    // Force scroll to top and lock scrolling aggressively
    window.scrollTo(0, 0);
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const lockScroll = (e: Event) => {
      e.preventDefault();
      window.scrollTo(0, 0);
    };

    window.addEventListener("scroll", lockScroll, { passive: false });
    window.addEventListener("wheel", lockScroll, { passive: false });
    window.addEventListener("touchmove", lockScroll, { passive: false });

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const animations: Animation[] = [];
    const timers: number[] = [];
    let frame = 0;
    let cancelled = false;

    const mobile = root.clientWidth <= 1000;
    const ease = "cubic-bezier(.8,0,.3,1)";

    const select = <T extends Element = HTMLElement,>(selector: string) =>
      Array.from(root.querySelectorAll<T>(selector));

    const animate = (
      targets: Element | Element[],
      frames: Keyframe[],
      options: KeyframeAnimationOptions,
    ) => {
      const elements = Array.isArray(targets) ? targets : [targets];

      elements.forEach((element) => {
        const animation = element.animate(frames, {
          fill: "forwards",
          ...options,
        });

        animations.push(animation);
      });
    };

    const later = (delay: number, callback: () => void) => {
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) callback();
        }, delay),
      );
    };

    const covers = select<HTMLElement>(".sf-cover");
    const tagsLayer = root.querySelector<HTMLElement>(".sf-tags");
    const scene = root.querySelector<HTMLElement>(".sf-scene");

    if (reducedMotion) {
      covers.forEach((cover) => {
        cover.style.display = "none";
      });

      if (tagsLayer) tagsLayer.style.display = "none";
      if (scene) scene.style.clipPath = "inset(0)";

      return;
    }

    const startTimeline = () => {
      if (cancelled) return;

      const introCharacters = select(
        ".sf-cover .sf-intro .sf-char > span",
      );
      const remainingIntroCharacters = select(
        ".sf-cover .sf-intro .sf-char:not(.sf-first) > span",
      );
      const firstCharacters = select(".sf-cover .sf-intro .sf-first");
      const numeralCharacters = select(".sf-cover .sf-number .sf-char");
      const numeralInnerCharacters = select(
        ".sf-cover .sf-number .sf-char > span",
      );
      const tagWords = select(".sf-tag .sf-word");
      const topCover = root.querySelector<HTMLElement>(".sf-top");
      const bottomCover = root.querySelector<HTMLElement>(".sf-bottom");

      tagWords.forEach((word, index) => {
        animate(
          word,
          [
            { transform: "translate3d(0,-110%,0)" },
            { transform: "translate3d(0,0,0)" },
          ],
          {
            duration: 720,
            delay: 420 + index * 85,
            easing: ease,
          },
        );
      });

      introCharacters.forEach((character, index) => {
        animate(
          character,
          [
            { transform: "translate3d(0,-110%,0)" },
            { transform: "translate3d(0,0,0)" },
          ],
          {
            duration: 720,
            delay: 420 + index * 45,
            easing: ease,
          },
        );
      });

      remainingIntroCharacters.forEach((character, index) => {
        animate(
          character,
          [
            { transform: "translate3d(0,0,0)" },
            { transform: "translate3d(0,110%,0)" },
          ],
          {
            duration: 720,
            delay: 1920 + index * 45,
            easing: ease,
          },
        );
      });

      numeralInnerCharacters.forEach((character, index) => {
        animate(
          character,
          [
            { transform: "translate3d(0,-110%,0)" },
            { transform: "translate3d(0,0,0)" },
          ],
          {
            duration: 720,
            delay: 2420 + index * 70,
            easing: ease,
          },
        );
      });

      firstCharacters.forEach((character) => {
        animate(
          character,
          [
            {
              transform: "translate3d(0,0,0) scale(1)",
              fontWeight: 600,
              offset: 0,
            },
            {
              transform: `translate3d(${mobile ? "8rem" : "19rem"},0,0) scale(1)`,
              fontWeight: 600,
              offset: 0.57,
            },
            {
              transform: `translate3d(${mobile ? "7.5rem" : "18rem"},${mobile ? "-0.15rem" : "-0.35rem"
                },0) scale(.75)`,
              fontWeight: 900,
              offset: 1,
            },
          ],
          {
            duration: 1700,
            delay: 3420,
            easing: ease,
          },
        );
      });

      numeralCharacters.forEach((character) => {
        animate(
          character,
          [
            {
              transform: "translate3d(0,0,0)",
              fontSize: "inherit",
              fontWeight: 600,
              offset: 0,
            },
            {
              transform: `translate3d(${mobile ? "-3rem" : "-8rem"},0,0)`,
              fontSize: "inherit",
              fontWeight: 600,
              offset: 0.57,
            },
            {
              transform: `translate3d(${mobile ? "-3rem" : "-8rem"},0,0)`,
              fontSize: mobile ? "6rem" : "14rem",
              fontWeight: 500,
              offset: 1,
            },
          ],
          {
            duration: 1700,
            delay: 3420,
            easing: ease,
          },
        );
      });

      later(4920, () => {
        if (topCover) topCover.style.clipPath = "inset(0 0 50% 0)";
        if (bottomCover) bottomCover.style.clipPath = "inset(50% 0 0 0)";

        if (scene) {
          animate(
            scene,
            [
              { clipPath: "polygon(0 48%,0 48%,0 52%,0 52%)" },
              { clipPath: "polygon(0 48%,100% 48%,100% 52%,0 52%)" },
            ],
            { duration: 980, easing: ease },
          );
        }
      });

      tagWords.forEach((word, index) => {
        animate(
          word,
          [
            { transform: "translate3d(0,0,0)" },
            { transform: "translate3d(0,110%,0)" },
          ],
          {
            duration: 720,
            delay: 5420 + index * 85,
            easing: ease,
          },
        );
      });

      later(5920, () => {
        if (topCover) {
          animate(
            topCover,
            [
              { transform: "translate3d(0,0,0)" },
              { transform: "translate3d(0,-50%,0)" },
            ],
            { duration: 980, easing: ease },
          );
        }

        if (bottomCover) {
          animate(
            bottomCover,
            [
              { transform: "translate3d(0,0,0)" },
              { transform: "translate3d(0,50%,0)" },
            ],
            { duration: 980, easing: ease },
          );
        }

        if (scene) {
          animate(
            scene,
            [
              { clipPath: "inset(48% 0)" },
              { clipPath: "inset(0)" },
            ],
            { duration: 980, easing: ease },
          );
        }
      });

      // Unmount overlay after the full reveal completes
      later(6800, () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        window.removeEventListener("scroll", lockScroll);
        window.removeEventListener("wheel", lockScroll);
        window.removeEventListener("touchmove", lockScroll);
        setIsComplete(true);
      });
    };

    // Two frames let the browser create compositor layers before movement starts.
    frame = window.requestAnimationFrame(() => {
      frame = window.requestAnimationFrame(startTimeline);
    });

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener("scroll", lockScroll);
      window.removeEventListener("wheel", lockScroll);
      window.removeEventListener("touchmove", lockScroll);

      cancelled = true;
      window.cancelAnimationFrame(frame);
      animations.forEach((animation) => animation.cancel());
      timers.forEach(window.clearTimeout);
    };
  }, []);



  if (!mounted || isComplete) return null;

  return (
    <section ref={rootRef} className={`sf-root ${className}`}>
      <SFCover position="bottom" studio={studio} numeral={numeral} />
      <SFCover position="top" studio={studio} numeral={numeral} />

      {/* Ambient discipline tags — fade in during cover, fade out before scene reveal */}
      <div className="sf-tags" aria-hidden="true">
        {tags.map((tag, index) => (
          <p className={`sf-tag sf-tag-${index + 1}`} key={tag}>
            {splitWords(tag)}
          </p>
        ))}
      </div>
    </section>
  );
}

/* ── Cover panel — hoisted outside SplitRevealHero for stable component identity ── */
function SFCover({
  position,
  studio,
  numeral,
}: {
  position: "top" | "bottom";
  studio: string;
  numeral: string;
}) {
  return (
    <div className={`sf-cover sf-${position}`} aria-hidden="true">
      <div className="sf-intro">
        <h1>{splitChars(studio, true)}</h1>
      </div>
      <div className="sf-number">
        <h1>{splitChars(numeral)}</h1>
      </div>
    </div>
  );
}