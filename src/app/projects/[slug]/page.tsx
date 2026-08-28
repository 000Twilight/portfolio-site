import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "@/lib/data/projects";
import { getFolderImages } from "@/lib/get-folder-images";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

/** Convert a project title to a URL slug */
function toSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

/** Find a project by slug */
function findProject(slug: string) {
  return projectsData.items.find((p) => toSlug(p.title) === slug);
}

export async function generateStaticParams() {
  return projectsData.items.map((p) => ({ slug: toSlug(p.title) }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = findProject(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} | Mario Richie Lim`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Mario Richie Lim`,
      description: project.summary,
    },
  };
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = findProject(params.slug);
  if (!project) notFound();
  // TypeScript doesn't narrow through notFound() (returns never), so we assert here.
  if (!project) return null;

  // Scan folder server-side — guaranteed-existing paths, zero 404s
  const subfolder = project.imageFolder.replace(/^\//, "");
  const images = getFolderImages(subfolder);

  return (
    <main className="mx-auto w-full max-w-4xl px-5 sm:px-6 py-28">
      {/* Breadcrumb */}
      <nav className="mb-10" aria-label="Breadcrumb">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] transition-colors duration-200 hover:text-[#1F2937]"
        >
          <ArrowLeft size={14} />
          All projects
        </Link>
      </nav>

      <article>
        {/* Badges */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-3.5 py-1 text-xs font-mono text-[#6B7280]">
            {project.year}
          </span>
          <span className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-3.5 py-1 text-xs font-medium text-[#6B7280]">
            {project.role}
          </span>
        </div>

        <h1 className="display mt-4 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1F2937]">
          {project.title}
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-[#6B7280] leading-relaxed">
          {project.summary}
        </p>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-4 py-1.5 text-xs sm:text-sm font-medium text-[#1F2937]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Image gallery — only rendered when images exist */}
        {images.length > 0 && (
          <div className="mt-10">
            {/* Hero image */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-[#E5E7EB] bg-[#F3F4F6]">
              <Image
                src={images[0]}
                alt={project.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
              />
            </div>

            {/* Thumbnail strip — remaining images */}
            {images.length > 1 && (
              <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
                {images.slice(1).map((src, i) => (
                  <div
                    key={src}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#E5E7EB] bg-[#F3F4F6]"
                  >
                    <Image
                      src={src}
                      alt={`${project.alt} — screenshot ${i + 2}`}
                      fill
                      sizes="(max-width: 768px) 33vw, 200px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <div className="rounded-3xl bg-white border border-[#E5E7EB] mt-10 p-8 sm:p-12 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
          {project.description.split("\n\n").map((paragraph, i) => (
            <p
              key={i}
              className="leading-relaxed text-sm sm:text-base text-[#1F2937] [&+p]:mt-6"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* CTA */}
        {project.link && project.link !== "#" && (
          <div className="mt-10">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[#1F2937] px-8 py-3.5 text-sm font-semibold text-[#F9FAFB] shadow-xs transition-all duration-200 hover:bg-[#111827] hover:scale-[1.02] active:scale-[0.98]"
            >
              View project
              <ArrowUpRight size={16} />
            </a>
          </div>
        )}
      </article>
    </main>
  );
}
