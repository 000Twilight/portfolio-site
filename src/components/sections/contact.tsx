"use client";

import { useState } from "react";
import { useReveal } from "@/lib/reveal";
import { siteContent } from "@/lib/content/site";
import { 
  Clock, 
  MapPin, 
  Sparkles,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ContactForm } from "@/components/ui/contact-form";

const PROJECT_TYPES = [
  "Full-Stack Web",
  "Mobile App (React Native/Flutter)",
  "AI & Automation",
  "UI/UX Design",
  "Other",
];

export function Contact() {
  const ref = useReveal<HTMLElement>();
  const contact = siteContent.contact;

  return (
    <section
      ref={ref}
      id="contact"
      className="rounded-3xl bg-white border border-[#E5E7EB] p-8 sm:p-12 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]"
    >
      <div className="flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5E7EB]">
          <div>
            <div data-reveal className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-[#F3F4F6] border border-[#E5E7EB] text-xs font-semibold text-[#6B7280] mb-3 uppercase tracking-wider">
              <Sparkles size={13} className="text-[#1F2937]" />
              Start a Conversation
            </div>
            <h2
              data-reveal
              className="display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1F2937]"
            >
              Let&apos;s build something together.
            </h2>
          </div>
          <p
            data-reveal
            className="text-sm text-[#6B7280] max-w-md leading-relaxed"
          >
            Have a project in mind, an engineering role, or a technical inquiry? Send a message below or reach out directly.
          </p>
        </div>

        {/* 2-Column Bento / Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* ── Left Column: Direct info & Availability (5 Cols) ────────── */}
          <div data-reveal className="lg:col-span-5 flex flex-col gap-4 h-full">
            {/* Status Card */}
            <div className="rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] p-6 shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                  Availability
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available for hire
                </span>
              </div>
              <p className="text-sm font-medium text-[#1F2937] leading-relaxed">
                Currently open for freelance contracts, high-impact web/mobile projects, and full-time software engineering roles.
              </p>

              <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex flex-col gap-2.5 text-xs text-[#6B7280]">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#9CA3AF]" />
                  <span>Jakarta, Indonesia (UTC+7 / WIB)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[#9CA3AF]" />
                  <span>Typical response time: &lt; 24 hours</span>
                </div>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] p-6 shadow-xs">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] block mb-4">
                Connect Elsewhere
              </span>
              <div className="flex flex-col gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl bg-white border border-[#E5E7EB] px-4 py-3 shadow-xs transition-all duration-200 hover:bg-[#F3F4F6] hover:border-[#D1D5DB]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F4F6] text-[#4B5563] group-hover:bg-white group-hover:text-[#1F2937] transition-colors">
                    <FaGithub size={16} />
                  </div>
                  <span className="text-sm font-medium text-[#1F2937]">GitHub</span>
                </a>
                
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl bg-white border border-[#E5E7EB] px-4 py-3 shadow-xs transition-all duration-200 hover:bg-[#F3F4F6] hover:border-[#D1D5DB]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F4F6] text-[#4B5563] group-hover:bg-white group-hover:text-[#0077b5] transition-colors">
                    <FaLinkedin size={16} />
                  </div>
                  <span className="text-sm font-medium text-[#1F2937]">LinkedIn</span>
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl bg-white border border-[#E5E7EB] px-4 py-3 shadow-xs transition-all duration-200 hover:bg-[#F3F4F6] hover:border-[#D1D5DB]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F4F6] text-[#4B5563] group-hover:bg-white group-hover:text-[#1DA1F2] transition-colors">
                    <FaTwitter size={16} />
                  </div>
                  <span className="text-sm font-medium text-[#1F2937]">Twitter</span>
                </a>
              </div>
            </div>

          </div>

          {/* ── Right Column: Interactive Inquiry Form (7 Cols) ─────────── */}
          <div data-reveal className="lg:col-span-7 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] p-6 sm:p-8 shadow-xs h-full flex flex-col justify-center">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
