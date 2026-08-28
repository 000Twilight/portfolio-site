"use client";

import { siteContent } from "@/lib/content/site";
import SocialFlipButton from "@/components/UI/SocialFlipButton";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";

const { contact } = siteContent;

const getSocialIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case "instagram":
      return <FaInstagram size={18} />;
    case "github":
      return <FaGithub size={18} />;
    case "linkedin":
      return <FaLinkedin size={18} />;
    default:
      return <Mail size={18} />;
  }
};

export default function Footer() {
  const socialItems = contact.socialLinks.map((link) => ({
    letter: link.label.charAt(0),
    icon: getSocialIcon(link.label),
    label: link.label,
    href: link.href,
  }));

  return (
    <footer className="mx-auto w-full max-w-7xl px-4 sm:px-6 pb-12 mt-0">
      <div className="flex flex-col rounded-3xl p-8 sm:p-10 relative overflow-hidden bg-white border border-[#E5E7EB] shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <span className="display text-2xl font-bold tracking-tight text-[#1F2937] block">
              Mario Richie Lim
            </span>
            <p className="text-xs text-[#6B7280] mt-1 font-medium">
              Software Engineer &middot; Full-Stack &middot; AI Solutions
            </p>
          </div>

          <div className="shrink-0">
            <SocialFlipButton items={socialItems} className="!p-0" />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-6 bg-[#E5E7EB]" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#6B7280]">
          <p>
            {contact.footerPrefix} {new Date().getFullYear()} {contact.footerSuffix}
          </p>
          <p className="text-xs text-[#9CA3AF]">
            Designed & Built with Next.js, React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
