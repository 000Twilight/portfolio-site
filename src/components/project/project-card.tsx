"use client";

import type { Project } from "@/lib/data/projects";
import Link from "next/link";
import { CoverImage } from "@/components/shared/CoverImage";
import { ArrowUpRight } from "lucide-react";

function toSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

interface ProjectCardProps {
  project: Project;
  index: number;
  /** Pre-scanned image paths for this project's folder */
  images: string[];
}

export default function ProjectCard({ project, index, images }: ProjectCardProps) {
  return (
    <article className="group flex flex-col h-full">
      <Link
        href={`/projects/${toSlug(project.title)}`}
        className="flex flex-col h-full rounded-2xl bg-white border border-[#E5E7EB] overflow-hidden transition-all duration-300 hover:border-[#D1D5DB] hover:shadow-[0_12px_24px_-8px_rgba(31,41,55,0.06)] hover:-translate-y-1"
      >
        {/* Cover image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F3F4F6] border-b border-[#E5E7EB]">
          <CoverImage images={images} alt={project.alt} colorIndex={index} />

          {/* Year badge */}
          <span className="absolute top-3.5 left-3.5 z-10 rounded-full bg-white/90 backdrop-blur-md border border-[#E5E7EB] px-2.5 py-0.5 text-xs font-mono text-[#6B7280] shadow-xs">
            {project.year}
          </span>

          {/* Arrow icon */}
          <span className="absolute top-3.5 right-3.5 z-10 flex h-7.5 w-7.5 items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-[#E5E7EB] text-[#1F2937] opacity-0 translate-x-1 -translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200 shadow-xs">
            <ArrowUpRight size={14} />
          </span>
        </div>

        {/* Card body */}
        <div className="p-5 flex flex-col flex-1 justify-between">
          <div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-2.5 py-0.5 text-[11px] font-medium text-[#6B7280]"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="rounded-full px-2 py-0.5 text-[11px] text-[#9CA3AF]">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>

            <h2 className="text-base font-semibold tracking-tight text-[#1F2937] group-hover:text-[#111827] transition-colors leading-snug">
              {project.title}
            </h2>
            <p className="mt-1 text-xs text-[#6B7280] font-medium">{project.role}</p>
            <p className="mt-2.5 text-xs sm:text-sm text-[#6B7280] leading-relaxed line-clamp-3">
              {project.summary}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
