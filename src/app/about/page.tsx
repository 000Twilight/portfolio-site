import type { Metadata } from "next";
import { siteContent } from "@/lib/content/site";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Mario Richie Lim",
  description:
    "About Mario Richie Lim — full-stack developer and UI engineer based in Jakarta.",
};

const { about } = siteContent;

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-5 sm:px-6 py-28">
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

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white border border-[#E5E7EB] p-8 sm:p-12 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-3">
              {about.title}
            </p>
            <h1 className="display text-3xl sm:text-4xl font-bold tracking-tight text-[#1F2937] mb-6">
              Engineering with precision & care.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#1F2937]">
              {about.copy}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-2 pt-6 border-t border-[#F3F4F6]">
            {about.capabilities.map((c) => (
              <span
                key={c}
                className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-4 py-2 text-xs sm:text-sm font-medium text-[#1F2937]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-[#E5E7EB] p-8 sm:p-12 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] flex flex-col justify-between gap-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280]">
            By the numbers
          </p>
          <dl className="grid grid-cols-2 gap-8 my-auto">
            {about.metrics.map(({ value, suffix, label }) => (
              <div key={label} className="flex flex-col">
                <dt className="display text-4xl sm:text-5xl md:text-6xl font-bold text-[#1F2937] tracking-tight">
                  {value}
                  {suffix}
                </dt>
                <dd className="mt-2 text-xs sm:text-sm font-medium text-[#6B7280] leading-snug">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
          <div className="pt-6 border-t border-[#F3F4F6] text-xs text-[#9CA3AF]">
            Continuous learning, software architecture & production systems
          </div>
        </div>
      </section>
    </main>
  );
}
