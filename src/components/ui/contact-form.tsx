"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const PROJECT_TYPES = [
  "Full-Stack Web",
  "Mobile App (React Native/Flutter)",
  "AI & Automation",
  "UI/UX Design",
  "Other",
];

export function ContactForm() {
  const [selectedType, setSelectedType] = useState<string>("Full-Stack Web");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          name: name,
          email: email,
          project_type: selectedType,
          message: message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        console.error("Form submission failed:", result);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
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
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#1F2937] px-8 py-3.5 text-sm font-semibold text-[#F9FAFB] shadow-xs transition-all duration-200 hover:bg-[#111827] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          <Send size={15} className={isSubmitting ? "animate-pulse" : ""} />
          <span>{isSubmitting ? "Sending..." : "Send Inquiry"}</span>
        </button>

        {submitted && (
          <p className="text-xs text-emerald-700 font-medium text-center sm:text-right">
            ✓ Message sent successfully! I'll get back to you soon.
          </p>
        )}
      </div>
    </form>
  );
}
