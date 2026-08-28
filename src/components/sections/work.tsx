"use client";

import { siteContent } from "@/lib/content/site";
import Link from "next/link";
import { useReveal } from "@/lib/reveal";
import { ArrowUpRight } from "lucide-react";
import { CoverImage } from "@/components/shared/CoverImage";

/** Convert a project title to a URL slug */
function slugify(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

const RECENT_COUNT = 3;

interface WorkProps {
  /** Pre-scanned images map: imageFolder → list of public-root image paths */
  imagesMap: Record<string, string[]>;
}

export function Work({ imagesMap }: WorkProps) {
  const ref = useReveal<HTMLElement>();
  const projects = siteContent.projects;
  const recent = projects.items.slice(0, RECENT_COUNT);

  return (
    <section
      ref={ref}
      id="work"
      className="rounded-3xl bg-white border border-[#E5E7EB] p-8 sm:p-12 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]"
    >
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p data-reveal className="text-xs font-semibold uppercase tracking-widest text-[#6B7280] mb-2">
            Portfolio
          </p>
          <h2
            data-reveal
            className="display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1F2937]"
          >
            {projects.title}
          </h2>
        </div>
        <p
          data-reveal
          className="text-sm text-[#6B7280] max-w-sm"
        >
          {projects.subtitle}
        </p>
      </div>

      {/* Grid — 3 recent projects */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {recent.map((p, i) => (
          <article key={p.title} data-reveal>
            <Link
              href={`/projects/${slugify(p.title)}`}
              className="group flex flex-col h-full rounded-2xl bg-white border border-[#E5E7EB] overflow-hidden transition-all duration-300 hover:border-[#D1D5DB] hover:shadow-[0_12px_24px_-8px_rgba(31,41,55,0.06)] hover:-translate-y-1"
            >
              {/* Cover image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F3F4F6] border-b border-[#E5E7EB]">
                <CoverImage
                  images={imagesMap[p.imageFolder] ?? []}
                  alt={p.alt}
                  colorIndex={i}
                />

                {/* Year badge */}
                <span className="absolute top-3.5 left-3.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E5E7EB] px-2.5 py-0.5 text-xs font-mono text-[#6B7280] z-10 shadow-xs">
                  {p.year}
                </span>

                {/* Arrow icon */}
                <span className="absolute top-3.5 right-3.5 z-10 flex h-7.5 w-7.5 items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-[#E5E7EB] text-[#1F2937] opacity-0 translate-x-1 -translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200 shadow-xs">
                  <ArrowUpRight size={14} />
                </span>
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-semibold tracking-tight text-[#1F2937] group-hover:text-[#111827] transition-colors leading-snug">
                      {p.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-[#6B7280] font-medium">
                    {p.role}
                  </p>
                  <p className="mt-2.5 text-xs sm:text-sm text-[#6B7280] leading-relaxed line-clamp-2">
                    {p.summary}
                  </p>
                </div>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-[#F3F4F6]">
                  {p.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-2.5 py-0.5 text-[11px] font-medium text-[#6B7280]"
                    >
                      {tag}
                    </span>
                  ))}
                  {p.tags.length > 3 && (
                    <span className="rounded-full px-2 py-0.5 text-[11px] text-[#9CA3AF]">
                      +{p.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* View all link */}
      <div className="mt-10 flex justify-center">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 rounded-full bg-white border border-[#E5E7EB] px-7 py-3 text-xs sm:text-sm font-semibold text-[#1F2937] shadow-xs transition-all duration-200 hover:bg-[#F3F4F6] hover:border-[#D1D5DB] hover:scale-[1.02] active:scale-[0.98]"
        >
          View all projects
          <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}
