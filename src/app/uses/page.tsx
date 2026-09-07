import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Uses | Mario Richie Lim",
  description: "Tools and gear Mario Richie Lim uses daily.",
};

interface ToolItem {
  name: string;
  description: React.ReactNode;
}

interface CategoryProps {
  title: string;
  items: ToolItem[];
}

function UseCategory({ title, items }: CategoryProps) {
  return (
    <div className="rounded-3xl bg-white border border-[#E5E7EB] p-8 sm:p-10 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
      <h2 className="text-xl font-bold tracking-tight text-[#1F2937] border-b border-[#E5E7EB] pb-4">
        {title}
      </h2>
      <ul className="mt-6 space-y-6">
        {items.map((item) => (
          <li key={item.name} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
            <span className="text-sm sm:text-base font-semibold text-[#1F2937]">{item.name}</span>
            <span className="text-xs sm:text-sm text-[#6B7280] sm:text-right max-w-md leading-relaxed">
              {item.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function UsesPage() {
  const hardware = [
    { name: "MacBook Pro 13\" (Early 2015)", description: "2.7GHz Dual-core Intel Core i5, 8GB DDR3 RAM, Intel Iris Graphics 6100 1536 MB, running macOS Monterey 12.7.6." },
    { name: "No Mouse", description: "Using only the built-in MacBook trackpad." },
    { name: "No Monitor", description: "Working directly on the built-in 13-inch Retina display." },
  ];

  const software = [
    { name: "VS Code & Antigravity IDE", description: "Primary environments for writing frontend/backend code and scripting." },
    { name: "Figma", description: "Used for interface design, wireframing, and planning user experience layouts." },
    { name: "DBeaver", description: "Universal database tool used to manage and query MySQL and PostgreSQL databases." },
    { name: "Git & GitHub", description: "Version control and repository hosting for my projects and collaborative workflows." },
    { name: "Make.com & n8n", description: <>Visual workflow automation tools for API integrations and custom backend logic (e.g., my <Link href="/projects/finance-tracker-automation-bot" className="underline underline-offset-2 decoration-[#D1D5DB] hover:text-[#1F2937] hover:decoration-[#9CA3AF] transition-colors">Finance Tracker Bot</Link>).</> },
    { name: "Google AI Pro", description: "Leveraged for code generation, tutoring, and automating workflow logic." },
  ];

  const devStack = [
    { name: "React, Vue & Tailwind CSS", description: "Used for building responsive web applications and reactive frontend UI components." },
    { name: "TypeScript & JavaScript", description: "Type-safe programming for both web applications and Node.js backend logic." },
    { name: "Laravel & PHP", description: "My go-to backend framework for building structured, robust full-stack applications with databases." },
    { name: "Node.js, Express.js & REST APIs", description: "Creating backend services, RESTful API integrations, and event-driven automation scripts." },
    { name: "PostgreSQL, MySQL & Supabase", description: "Managing relational databases, designing schemas, and implementing backend-as-a-service logic." },
    { name: "Kotlin, Flutter & React Native", description: "Used for native Android applications and cross-platform mobile experiences." },
    { name: "Scriptcase & Low-Code", description: "Rapid low-code database application development and automation." },
  ];

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
          Workspace & Stack
        </p>
        <h1 className="display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1F2937]">
          Uses
        </h1>
        <p className="mt-3 text-sm text-[#6B7280]">
          A list of the hardware, software, and tools I use on a daily basis to design and build.
        </p>
        <div className="mt-8 h-px w-full bg-[#E5E7EB]" />
      </div>

      {/* Grid of Categories */}
      <div className="flex flex-col gap-6">
        <UseCategory title="Hardware Setup" items={hardware} />
        <UseCategory title="Software & Utilities" items={software} />
        <UseCategory title="Languages & Stack" items={devStack} />
      </div>
    </main>
  );
}
