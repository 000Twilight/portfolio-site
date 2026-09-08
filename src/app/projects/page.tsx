import type { Metadata } from "next";
import { projectsData } from "@/lib/data/projects";
import ProjectCard from "@/components/ui/project-card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getFolderImagesMap } from "@/lib/get-folder-images";
import { GooeyTextReveal } from "@/components/ui/gooey-text-reveal";

export const metadata: Metadata = {
  title: "Projects | Mario Richie Lim",
  description:
    "Selected engineering and research projects by Mario Richie Lim — full-stack, mobile, ML, and UI/UX.",
};

export default function ProjectsPage() {
  // Scan all project image folders at build/request time on the server
  const imagesMap = getFolderImagesMap(projectsData.items);

  return (
    <main className="mx-auto w-full max-w-7xl px-5 sm:px-6 pt-24 pb-12">
      {/* Header */}
      <div className="mb-12">
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
              All Works
            </p>
            <GooeyTextReveal mode="immediate" className="display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1F2937]">
              {projectsData.title}
            </GooeyTextReveal>
          </div>
          <p className="text-sm text-[#6B7280] max-w-md">{projectsData.subtitle}</p>
        </div>

        <div className="mt-8 h-px w-full bg-[#E5E7EB]" />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projectsData.items.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={i}
            images={imagesMap[project.imageFolder] ?? []}
          />
        ))}
      </div>
    </main>
  );
}
