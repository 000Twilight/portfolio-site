import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import ZhangjiakouScene from "@/components/scenes/zhangjiakou/zhangjiakou-scene";

export const metadata: Metadata = {
  title: "Zhangjiakou 2.5D Scene | Lab — Mario Richie Lim",
  description: "Interactive multi-plane 2.5D parallax landscape scene with real-time cursor perspective tracking.",
  robots: { index: false, follow: false },
};

export default function ZhangjiakouPage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#070b12] select-none">
      {/* ── Floating Control HUD ── */}
      <nav
        aria-label="Scene Controls"
        className="fixed top-6 left-6 z-[80] flex items-center gap-3 rounded-full bg-black/60 backdrop-blur-md border border-white/15 px-4 py-2 text-white shadow-2xl transition-all hover:bg-black/75 hover:border-white/25"
      >
        <Link
          href="/lab"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white transition-colors group"
        >
          <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span>Back to Lab</span>
        </Link>

        <span className="h-3.5 w-px bg-white/20" />

        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-white/80">Zhangjiakou</span>
        </div>
      </nav>

      {/* ── Hint Pill (Top Right) ── */}
      <aside
        aria-label="Interaction Hint"
        className="fixed top-6 right-6 z-[80] hidden sm:flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 px-3.5 py-1.5 text-[11px] font-mono text-white/60 shadow-lg"
      >
        <Compass size={12} className="text-white/40" />
        <span>Move cursor to pan 3D depth</span>
      </aside>

      {/* ── 2.5D Parallax Scene Engine ── */}
      <div className="w-full h-full">
        <ZhangjiakouScene />
      </div>
    </main>
  );
}
