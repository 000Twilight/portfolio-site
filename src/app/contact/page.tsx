import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact | Mario Richie Lim",
  description:
    "Get in touch with Mario Richie Lim — open for freelance and full-time opportunities.",
};

export default function ContactPage() {
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

      <Contact />
    </main>
  );
}
