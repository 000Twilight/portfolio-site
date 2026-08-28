"use client";

import { useState } from "react";
import { useReveal } from "@/lib/reveal";
import { siteContent } from "@/lib/content/site";
import { 
  ArrowUpRight, 
  Copy, 
  Check, 
  Send, 
  Clock, 
  MapPin, 
  Sparkles,
  Mail
} from "lucide-react";

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

  const [selectedType, setSelectedType] = useState<string>("Full-Stack Web");
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry: ${selectedType} - from ${name}`);
    const body = encodeURIComponent(
      `Hi Mario,\n\nName: ${name}\nEmail: ${email}\nProject Type: ${selectedType}\n\nMessage:\n${message}\n`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Left Column: Direct info & Availability (5 Cols) ────────── */}
          <div data-reveal className="lg:col-span-5 flex flex-col gap-4">
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

            {/* Quick Email Copy Card */}
            <div className="rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] p-6 shadow-xs">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] block mb-2">
                Direct Email
              </span>
              <p className="text-base font-semibold text-[#1F2937] truncate mb-4">
                {contact.email}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#E5E7EB] px-4 py-2 text-xs font-medium text-[#1F2937] shadow-xs transition-all duration-200 hover:bg-[#F3F4F6] hover:border-[#D1D5DB] active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} className="text-[#6B7280]" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#1F2937] px-4 py-2 text-xs font-medium text-[#F9FAFB] shadow-xs transition-all duration-200 hover:bg-[#111827] active:scale-95"
                >
                  <Mail size={13} />
                  <span>Open Mail App</span>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] p-6 shadow-xs">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] block mb-3">
                Social Profiles
              </span>
              <div className="flex flex-wrap gap-2">
                {contact.socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#E5E7EB] px-3.5 py-1.5 text-xs font-medium text-[#1F2937] transition-all duration-200 hover:border-[#D1D5DB] hover:shadow-xs"
                  >
                    <span>{social.label}</span>
                    <ArrowUpRight size={13} className="text-[#9CA3AF]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Column: Interactive Inquiry Form (7 Cols) ─────────── */}
          <div data-reveal className="lg:col-span-7 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] p-6 sm:p-8 shadow-xs">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Project Type Pills */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-3">
                  I&apos;m interested in:
                </label>
                <div className="flex flex-wrap gap-2">
                  {PROJECT_TYPES.map((type) => {
                    const isSelected = selectedType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedType(type)}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                          isSelected
                            ? "bg-[#1F2937] text-[#F9FAFB] shadow-xs"
                            : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:text-[#1F2937] hover:border-[#D1D5DB]"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="form-name" className="block text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-2">
                    Your Name
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full rounded-xl bg-white border border-[#E5E7EB] px-4 py-3 text-sm text-[#1F2937] placeholder:text-[#9CA3AF] transition-colors focus:border-[#1F2937] focus:outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label htmlFor="form-email" className="block text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-2">
                    Your Email
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alex@example.com"
                    className="w-full rounded-xl bg-white border border-[#E5E7EB] px-4 py-3 text-sm text-[#1F2937] placeholder:text-[#9CA3AF] transition-colors focus:border-[#1F2937] focus:outline-none shadow-xs"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="form-message" className="block text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-2">
                  Project Details or Message
                </label>
                <textarea
                  id="form-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me a bit about your goals, timeline, or what you're looking to build..."
                  className="w-full rounded-xl bg-white border border-[#E5E7EB] px-4 py-3 text-sm text-[#1F2937] placeholder:text-[#9CA3AF] transition-colors focus:border-[#1F2937] focus:outline-none shadow-xs resize-y"
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#1F2937] px-8 py-3.5 text-sm font-semibold text-[#F9FAFB] shadow-xs transition-all duration-200 hover:bg-[#111827] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Send size={15} />
                  <span>Send Inquiry</span>
                </button>

                {submitted && (
                  <p className="text-xs text-emerald-700 font-medium text-center sm:text-right">
                    ✓ Opening email client with your message...
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
