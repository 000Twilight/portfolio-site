import Link from "next/link";
import { ArrowUpRight, Sparkles, FileText, Download } from "lucide-react";

export function CoverLetterCard() {
  return (
    <div className="relative rounded-3xl border border-[#E5E7EB] bg-white p-8 overflow-hidden shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-[#D1D5DB] hover:shadow-md">
      {/* Corner badge */}
      <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-semibold text-indigo-700">
        <Sparkles size={12} className="text-indigo-600" />
        AI Powered Studio
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-xs">
          <FileText size={22} className="text-indigo-600" />
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold tracking-tight text-[#1F2937] mb-2">
            AI Cover Letter Studio
          </h2>
          <p className="text-sm text-[#6B7280] leading-relaxed mb-5 max-w-2xl">
            A bespoke application generation engine powered by Gemini 3.5. Combines verified Markdown CV achievements with target Job Descriptions and Company Profiles to synthesize tailored, high-conversion cover letters with live A4 paper preview and one-click PDF export.
          </p>

          <div className="flex flex-wrap gap-2 text-xs font-mono mb-6">
            <span className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-3 py-1 text-[#374151]">
              Gemini 3.5 Flash Lite
            </span>
            <span className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-3 py-1 text-[#374151]">
              4 Structural Archetypes
            </span>
            <span className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-3 py-1 text-[#374151]">
              Live A4 Document Canvas
            </span>
            <span className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-3 py-1 text-[#374151]">
              Native Vector PDF Export
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/lab/cover-letter"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1F2937] px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-black hover:shadow-md group"
            >
              <span>Launch Studio</span>
              <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
