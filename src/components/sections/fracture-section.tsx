"use client";

import React from "react";
import FracturedComposition from "@/components/scenes/compositions/fractured-composition";

/**
 * FracturedSection — a contained, boxed showcase of the fractured reality
 * composition. Lives just before the site footer so it acts as a visual
 * curtain-call. NOT full-width: it's inset inside the max-width container
 * with rounded corners and a subtle frame.
 */
export function FracturedSection() {
  return (
    <section className="w-full my-8 flex flex-col items-center gap-6">
      {/* Section label */}
      <div className="flex items-center gap-3 w-full max-w-none px-0">
        <span className="h-px flex-1 bg-[#E5E7EB]" />
        <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#9CA3AF]">
          Fractured Reality
        </p>
        <span className="h-px flex-1 bg-[#E5E7EB]" />
      </div>

      <div className="flex flex-col gap-8 items-center w-full max-w-4xl mx-auto text-center">
        {/* Text section */}
        <div className="flex flex-col gap-3 max-w-2xl">
          <h2 className="text-3xl font-bold text-[#1F2937] tracking-tight">
            Multiple Perspectives
          </h2>
          <p className="text-[#6B7280] leading-relaxed text-sm sm:text-base">
            Click the shards to shift between different realities. Each fragment represents a different dimension of my journey—from the original foundational code, to technical architecture, and beyond.
          </p>
        </div>

        {/* Contained puzzle frame */}
        <div
          className="
            relative w-full overflow-hidden rounded-3xl
            border border-[#E5E7EB]
            shadow-[0_2px_12px_0_rgba(0,0,0,0.04)]
            bg-[#050508]
          "
          style={{ aspectRatio: "16/9", maxHeight: "600px" }}
        >
          <FracturedComposition
            heroImage="/assets/images/image.jpeg"
            heroImage2="/assets/images/image_2.jpeg"
            heroImage3="/assets/images/image_3.jpeg"
            isRevealed
          />
        </div>
      </div>
    </section>
  );
}
