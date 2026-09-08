import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GooeyTextReveal } from "@/components/ui/gooey-text-reveal";

export const metadata: Metadata = {
  title: "Now | Mario Richie Lim",
  description: "What Mario Richie Lim is working on right now.",
};

export default function NowPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 sm:px-6 pt-24 pb-12">
      {/* Back button */}
      <div className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] transition-colors duration-200 hover:text-[#1F2937]"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>
      </div>

      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-2">
          Current Focus
        </p>
        <GooeyTextReveal mode="immediate" className="display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1F2937]">
          Now
        </GooeyTextReveal>
        <p className="mt-3 text-sm text-[#6B7280]">
          A snapshot of my current projects, learnings, and lifestyle. Updated August 2026.
        </p>
        <div className="mt-8 h-px w-full bg-[#E5E7EB]" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Card 1: Degree Completed */}
        <div className="rounded-3xl bg-white border border-[#E5E7EB] p-8 sm:p-10 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
          <span className="font-mono text-xs text-[#6B7280] uppercase tracking-widest block mb-4">
            01 / EDUCATION
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-[#1F2937]">
            Degree Completed & Graduating
          </h2>
          <p className="mt-4 text-sm text-[#1F2937] leading-relaxed">
            I have finished my undergraduate degree and am waiting for my official graduation ceremony on <strong className="font-semibold">October 3rd, 2026</strong>.
          </p>
          <p className="mt-4 text-sm text-[#6B7280] leading-relaxed">
            My thesis involved constructing an end-to-end machine learning pipeline using Python (XGBoost, LightGBM, Cascade Deep Forest) to predict drug-target interactions (DTI) for lung cancer therapies using herbal molecular databases.
          </p>
          <div className="mt-8">
            <Link
              href="/projects/ml-drug-discovery-pipeline"
              className="inline-flex items-center gap-2 rounded-full bg-[#1F2937] px-5 py-2.5 text-xs font-semibold text-[#F9FAFB] shadow-xs transition-all duration-200 hover:bg-[#111827] hover:scale-[1.02] active:scale-[0.98]"
            >
              Read Thesis Details
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Card 2: Development & AI App */}
        <div className="rounded-3xl bg-white border border-[#E5E7EB] p-8 sm:p-10 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs text-[#6B7280] uppercase tracking-widest block mb-4">
              02 / DEVELOPMENT
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2937]">
              AI Finance Mobile App
            </h2>
            <p className="mt-4 text-sm text-[#1F2937] leading-relaxed">
              I am currently building a mobile application using <strong className="font-semibold">Flutter</strong> and <strong className="font-semibold">Dart</strong> for automated and intelligent personal finance tracking and management.
            </p>
            <p className="mt-4 text-sm text-[#6B7280] leading-relaxed">
              The goal is to design an elegant mobile experience that makes budget tracking and spending analysis extremely frictionless.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2 pt-4 border-t border-[#F3F4F6]">
            <span className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-3 py-1 text-xs font-medium text-[#1F2937]">Flutter</span>
            <span className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-3 py-1 text-xs font-medium text-[#1F2937]">Dart</span>
            <span className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-3 py-1 text-xs font-medium text-[#1F2937]">AI Integration</span>
          </div>
        </div>

        {/* Card 3: Research & Career */}
        <div className="rounded-3xl bg-white border border-[#E5E7EB] p-8 sm:p-10 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
          <span className="font-mono text-xs text-[#6B7280] uppercase tracking-widest block mb-4">
            03 / FOCUS & CAREER
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-[#1F2937]">
            AI Research & Job Seeking
          </h2>
          <p className="mt-4 text-sm text-[#1F2937] leading-relaxed">
            I am reading and researching:
          </p>
          <ul className="mt-4 space-y-3">
            <li className="flex gap-3 text-sm text-[#1F2937] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6B7280]" />
              Machine learning models and prompt engineering strategies.
            </li>
            <li className="flex gap-3 text-sm text-[#1F2937] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6B7280]" />
              <span>Personal finance automations, integration strategies, and looking for full-stack opportunities.</span>
            </li>
          </ul>
          <div className="mt-8">
            <Link
              href="https://linkedin.com/in/mario-richie-lim"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1F2937] px-5 py-2.5 text-xs font-semibold text-[#F9FAFB] shadow-xs transition-all duration-200 hover:bg-[#111827] hover:scale-[1.02] active:scale-[0.98]"
            >
              Connect on LinkedIn
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Card 4: Location/Vibe */}
        <div className="rounded-3xl bg-white border border-[#E5E7EB] p-8 sm:p-10 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs text-[#6B7280] uppercase tracking-widest block mb-4">
              04 / LIFE & HOBBIES
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2937]">
              Based in Jakarta, Indonesia
            </h2>
            <p className="mt-4 text-sm text-[#1F2937] leading-relaxed">
              Balancing my personal projects, coding practice, and job seeking. When I&apos;m not writing code or checking databases, you can find me on the badminton court playing a match with friends.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
