"use client";

import Link from "next/link";
import { useState } from "react";
import { experienceData } from "@/lib/data/experience";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ContactModal } from "@/components/ui/contact-modal";
import { GooeyTextReveal } from "@/components/ui/gooey-text-reveal";

export default function WorkPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <main className="mx-auto w-full max-w-5xl px-5 sm:px-6 pt-24 pb-12">
      {/* Page header */}
      <div className="mb-14">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] mb-8 transition-colors duration-200 hover:text-[#1F2937]"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-2">
              Career & Experience
            </p>
            <GooeyTextReveal mode="immediate" className="display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1F2937]">
              Work Experience
            </GooeyTextReveal>
          </div>
          <p className="text-sm text-[#6B7280] max-w-sm">
            {experienceData.subtitle}
          </p>
        </div>

        {/* Decorative line */}
        <div className="mt-8 h-px w-full bg-[#E5E7EB]" />
      </div>

      {/* Experience items */}
      <div className="flex flex-col gap-6">
        {experienceData.items.map((item, i) => (
          <article
            key={item.company}
            className="group rounded-3xl bg-white border border-[#E5E7EB] p-8 sm:p-10 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-[#D1D5DB]"
          >
            {/* Company + period row */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                {/* Index badge */}
                <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-xs font-bold font-mono text-[#1F2937] shadow-xs">
                  0{i + 1}
                </div>

                <div>
                  <h2 className="text-xl font-bold tracking-tight text-[#1F2937]">
                    {item.company}
                  </h2>
                  <p className="mt-0.5 text-sm font-medium text-[#6B7280]">
                    {item.role}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-4 py-1.5 text-xs font-mono text-[#6B7280] shrink-0">
                {item.period}
              </span>
            </div>

            {/* Description bullets */}
            <ul className="mt-7 space-y-3.5">
              {item.description.map((bullet, j) => (
                <li
                  key={j}
                  className="flex gap-3 text-sm leading-relaxed text-[#1F2937]"
                >
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#6B7280]" />
                  {bullet}
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div className="mt-7 flex flex-wrap gap-2 pt-4 border-t border-[#F3F4F6]">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-3 py-1 text-xs font-medium text-[#6B7280]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Footer call-out */}
      <div className="mt-14 rounded-3xl bg-white border border-[#E5E7EB] px-8 py-8 text-center shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280]">
          Interested in collaborating?
        </p>
        <h3 className="mt-2 text-2xl font-bold text-[#1F2937]">
          Let&apos;s talk about your next project
        </h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1F2937] px-7 py-3 text-sm font-semibold text-[#F9FAFB] shadow-xs transition-all duration-200 hover:bg-[#111827] hover:scale-[1.02] active:scale-[0.98]"
        >
          Send an Inquiry
          <ArrowUpRight size={16} />
        </button>
      </div>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </main>
  );
}
