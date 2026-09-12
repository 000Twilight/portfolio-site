"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Maximize2, X, Compass, Layers } from "lucide-react";
import ZhangjiakouScene from "@/components/scenes/zhangjiakou/zhangjiakou-scene";

export function ZhangjiakouCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="relative rounded-3xl border border-[#E5E7EB] bg-white p-8 overflow-hidden shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-[#D1D5DB] hover:shadow-md">
        {/* Corner badge */}
        <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Interactive Demo
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F3F4F6] border border-[#E5E7EB] text-[#1F2937] shadow-xs">
            <Layers size={22} className="text-[#1F2937]" />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold tracking-tight text-[#1F2937] mb-2">
              Zhangjiakou 2.5D Parallax Scene
            </h2>
            <p className="text-sm text-[#6B7280] leading-relaxed mb-5 max-w-2xl">
              A high-precision 2.5D landscape depth simulation featuring 20+ asynchronous parallax planes:
              deep mountain ranges, volumetric fog layers, dynamic sunrays, and 3D camera perspective reactive to mouse coordinates.
            </p>

            <div className="flex flex-wrap gap-2 text-xs font-mono mb-6">
              <span className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-3 py-1 text-[#374151]">
                20+ Parallax Layers
              </span>
              <span className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-3 py-1 text-[#374151]">
                GSAP 3D Transform
              </span>
              <span className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-3 py-1 text-[#374151]">
                Perspective 2300px
              </span>
              <span className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-3 py-1 text-[#374151]">
                Hardware Accelerated
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/lab/zhangjiakou"
                className="inline-flex items-center gap-2 rounded-xl bg-[#1F2937] px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-black hover:shadow-md group"
              >
                <span>Launch Fullscreen Page</span>
                <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-xs font-semibold text-[#374151] shadow-xs transition-all hover:bg-[#F9FAFB] hover:border-[#D1D5DB]"
              >
                <Maximize2 size={13} className="text-[#6B7280]" />
                <span>Preview in Modal</span>
              </button>
            </div>
          </div>
        </div>
      </div>

        {/* ── Interactive Modal Preview ── */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Zhangjiakou Parallax Scene Preview"
          className="fixed inset-0 z-[999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
        >
          {/* Modal Container */}
          <div className="relative w-full h-full max-w-6xl max-h-[88vh] rounded-3xl overflow-hidden border border-white/20 bg-[#070b12] shadow-2xl flex flex-col">
            {/* Modal Header bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-black/60 backdrop-blur-md border-b border-white/10 z-20">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-white">Zhangjiakou 2.5D Scene Preview</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-white/40">
                  <Compass size={11} /> Move cursor over the scene
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/lab/zhangjiakou"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white transition-colors"
                >
                  <span>Open Dedicated Page</span>
                  <ArrowUpRight size={13} />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full p-1.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close Preview"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Scene Body */}
            <div className="relative flex-1 w-full h-full overflow-hidden">
              <ZhangjiakouScene />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
