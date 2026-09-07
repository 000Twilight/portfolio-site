"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { ContactForm } from "@/components/ui/contact-form";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4 sm:px-6">
      {/* Backdrop */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-[#E5E7EB] p-6 sm:p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB] hover:text-[#1F2937] transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="mb-8 pr-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1F2937] mb-2">
            Let&apos;s build something together.
          </h2>
          <p className="text-sm text-[#6B7280]">
            Have a project in mind, an engineering role, or a technical inquiry? Send a message below.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
