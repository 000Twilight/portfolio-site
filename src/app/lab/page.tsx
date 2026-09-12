import type { Metadata } from "next";
import { FlaskConical, Construction, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ZhangjiakouCard } from "./zhangjiakou-card";
import { CoverLetterCard } from "./cover-letter-card";

export const metadata: Metadata = {
  title: "Lab — Experiments & Tools | Mario Richie Lim",
  description: "Experimental components, 3D scenes, AI tools, and work in progress.",
  robots: { index: false, follow: false },
};

/**
 * /lab — a holding page for experiments, interactive scenes, and AI tools.
 */

// 🚧 IN DEVELOPMENT — uncomment when ready to integrate
// import KeyboardScrollSection from "@/components/scenes/keyboard-scroll-section";

export default function LabPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-24">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1F2937] transition-colors mb-16"
      >
        <ArrowLeft size={14} />
        Back to portfolio
      </Link>

      {/* Header */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-amber-50 border border-amber-200 text-xs font-medium text-amber-700 mb-6">
          <Construction size={12} />
          Work in Progress & Experiments
        </div>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight text-[#1F2937] leading-none mb-4">
          The Lab
        </h1>
        <p className="text-[#6B7280] max-w-md leading-relaxed">
          Experimental components, interactive 3D scenes, and AI tools under active development.
        </p>
      </div>

      {/* Experiments list */}
      <div className="flex flex-col gap-6">
        {/* AI Cover Letter Studio */}
        <CoverLetterCard />

        {/* Zhangjiakou 2.5D Scene */}
        <ZhangjiakouCard />
        {/* KeyboardScrollSection — 🚧 IN DEVELOPMENT */}
        <div className="relative rounded-3xl border border-dashed border-amber-300 bg-amber-50/40 p-8 overflow-hidden">
          {/* Corner badge */}
          <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-700">
            <Construction size={11} />
            In Development
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-amber-200 shadow-sm">
              <FlaskConical size={20} className="text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#1F2937] mb-1">
                Keyboard Scroll Experience
              </h2>
              <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
                A cinema-grade scroll-driven animation powered by a video-to-frames pipeline. High-resolution 3D renders are decomposed into sequential frames and scrubbed dynamically against user scroll velocity. Currently fine-tuning frame compression, mobile buffering, and canvas rendering.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="rounded-full bg-white border border-amber-200 px-3 py-1 text-amber-800">
                  Video-to-Frames Pipeline
                </span>
                <span className="rounded-full bg-white border border-amber-200 px-3 py-1 text-amber-800">
                  Canvas Scroll Scrubbing
                </span>
                <span className="rounded-full bg-white border border-[#E5E7EB] px-3 py-1 text-[#6B7280]">
                  Frame Preloading & Tuning
                </span>
              </div>
            </div>
          </div>

          {/* Commented-out component render — uncomment to preview */}
          {/* <div className="mt-8 rounded-2xl overflow-hidden border border-amber-200">
            <KeyboardScrollSection />
          </div> */}
        </div>
      </div>
    </main>
  );
}
