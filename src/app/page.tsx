import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { projectsData } from "@/lib/data/projects";
import { getFolderImagesMap } from "@/lib/get-folder-images";

export const metadata: Metadata = {
  title: "Mario Richie Lim | Software Engineer",
  description:
    "Full-stack developer and AI engineer specialising in React, TypeScript, and modern web technologies. Based in Jakarta.",
  openGraph: {
    title: "Mario Richie Lim | Software Engineer",
    description:
      "Full-stack developer and AI engineer specialising in React, TypeScript, and modern web technologies.",
    type: "website",
  },
};

export default function HomePage() {
  // Scan images at request/build time on the server — no 404s on the client
  const imagesMap = getFolderImagesMap(projectsData.items);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 flex flex-col gap-4">
      <Hero />
      <Projects imagesMap={imagesMap} />
      <About />
      <Contact />
    </main>
  );
}
