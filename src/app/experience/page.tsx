import type { Metadata } from "next";
import { experienceData } from "@/lib/data/experience";
import ExperienceItem from "@/components/ui/experience-item";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Experience | Mario Richie Lim",
  description:
    "Professional experience and internships by Mario Richie Lim — full-stack and internal application development.",
};

export default function ExperiencePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 sm:px-6 py-28">
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

      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-2">
          Career Journey
        </p>
        <h1 className="display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1F2937]">
          {experienceData.title}
        </h1>
        <p className="mt-2 text-sm text-[#6B7280]">
          {experienceData.subtitle}
        </p>
        <div className="mt-8 h-px w-full bg-[#E5E7EB]" />
      </div>

      <div className="flex flex-col gap-6">
        {experienceData.items.map((item) => (
          <ExperienceItem key={item.company} item={item} />
        ))}
      </div>
    </main>
  );
}
