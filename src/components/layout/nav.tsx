"use client";

/**
 * Nav
 *
 * Minimalist, high-end fixed navigation bar.
 * Clean white frosted pills, charcoal blue typography, and subtle slate hover states.
 */

import { useEffect, useRef, useState } from "react";
import { gsap, ensureGsap } from "@/lib/reveal";
import { siteContent } from "@/lib/content/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { markInitialLoadComplete } from "@/lib/store/intro-store";
import { ContactModal } from "@/components/ui/contact-modal";

export function Nav() {
  const ref = useRef<HTMLElement>(null);
  const nav = siteContent.nav;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // ── scroll-aware glass backdrop ──────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // sync on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── entrance animation ───────────────────────────────────────────────────
  useEffect(() => {
    // Mark the initial load as complete shortly after mount so that subsequent navigations
    // know they are client-side navigations.
    const timer = setTimeout(() => {
      markInitialLoadComplete();
    }, 100);

    ensureGsap();
    const ctx = gsap.context(() => {
      gsap.from("[data-nav-item]", {
        opacity: 0,
        y: -16,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.07,
        delay: 3.2, // fires after LoadingScreen exit (~3s)
      });
    }, ref);
    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace("/#", "/"));

  return (
    <>
      <header
        ref={ref}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-3 px-4 sm:px-6 py-3 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(249, 250, 251, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(160%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px) saturate(160%)" : "none",
          borderBottom: scrolled ? "1px solid #E5E7EB" : "1px solid transparent",
        }}
      >
        {/* ── Brand pill ───────────────────────────────────────────────────── */}
        <div data-nav-item>
          <Link
            href="/"
            aria-label="Home"
            onClick={() => setIsMobileMenuOpen(false)}
            className="group flex h-10 items-center gap-2.5 rounded-full px-4.5 bg-white border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-200 hover:border-[#D1D5DB]"
          >
            <span
              className="text-sm font-bold tracking-widest text-[#1F2937]"
              style={{ letterSpacing: "0.12em" }}
            >
              {nav.homeLabel}
            </span>
            <span className="hidden sm:inline text-xs font-medium text-[#6B7280] transition-colors group-hover:text-[#1F2937]">
              {nav.homeName}
            </span>
          </Link>
        </div>

        {/* ── Desktop links pill ───────────────────────────────────────────── */}
        <div data-nav-item className="hidden sm:block">
          <nav
            aria-label="Main navigation"
            className="flex h-10 items-center gap-1 rounded-full px-1.5 bg-white/90 backdrop-blur-md border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          >
            {nav.links.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`flex h-7.5 items-center rounded-full px-4 text-xs font-medium transition-all duration-200 ${active
                    ? "bg-[#1F2937] text-[#F9FAFB] shadow-xs"
                    : "text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F3F4F6]"
                    }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* ── CTA pill ─────────────────────────────────────────────────────── */}
          <div data-nav-item>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsContactModalOpen(true);
              }}
              className="group flex h-10 items-center gap-2 rounded-full px-5 text-xs font-semibold bg-[#1F2937] text-[#F9FAFB] shadow-xs transition-all duration-200 hover:bg-[#111827] hover:scale-[1.02] active:scale-[0.98]"
            >
              {/* Pulse dot */}
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ background: "#4ade80" }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ background: "#22c55e" }}
                />
              </span>
              <span className="hidden sm:inline">{nav.availableLabel}</span>
              <span className="sm:hidden">Available</span>
            </button>
          </div>

          {/* ── Mobile menu toggle ─────────────────────────────────────────── */}
          <div data-nav-item className="sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.03)] text-[#1F2937]"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Dropdown ─────────────────────────────────────────── */}
      <div
        className={`fixed inset-x-0 top-[64px] z-40 p-4 transition-all duration-300 sm:hidden ${
          isMobileMenuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
        }`}
      >
        <div className="flex flex-col gap-1 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#E5E7EB] p-3 shadow-xl">
          {nav.links.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex h-12 items-center rounded-xl px-4 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-[#1F2937] text-[#F9FAFB]"
                    : "text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F3F4F6]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </div>
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
}