"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Download,
  Copy,
  Check,
  Upload,
  Key,
  Eye,
  Code,
  Briefcase,
  Building2,
  FileText,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sliders,
  Zap,
  BrainCircuit,
  FileCode,
  X,
} from "lucide-react";
import { COVER_LETTER_TEMPLATES } from "@/lib/data/cover-letter-templates";
import { DEFAULT_CV_MARKDOWN } from "@/lib/data/default-cv";
import { AnimatedDropdown, type DropdownAction } from "@/components/ui/animated-dropdown";

// Strictly Gemini 3.6, 3.7, and 3.8 Flash models
const MODEL_ACTIONS: DropdownAction[] = [
  { id: "gemini-3.6-flash", label: "Gemini 3.6 Flash", description: "Fastest • Smallest", icon: <Zap size={14} className="text-amber-500" /> },
  { id: "gemini-3.7-flash", label: "Gemini 3.7 Flash", description: "Flagship • Recommended", icon: <Sparkles size={14} className="text-indigo-500" /> },
  { id: "gemini-3.8-flash", label: "Gemini 3.8 Flash", description: "Newest • Best for coding", icon: <BrainCircuit size={14} className="text-rose-500" /> }
];

const SAMPLE_JOB_DESCRIPTION = `Role: Senior Full-Stack / AI Solutions Engineer
Company: Veloce AI
Location: Remote / Singapore

About the Role:
We are seeking an experienced Full-Stack Engineer with a strong affinity for AI orchestration and modern web technologies. You will architect customer-facing intelligence features, connect high-performance frontends with scalable backend databases, and lead workflow automation pipelines.

Key Responsibilities:
- Build reactive, high-conversion web applications using React, Next.js, and TypeScript.
- Design normalized relational databases and real-time backend architectures with PostgreSQL, Supabase, and Node.js/Laravel.
- Integrate multimodal LLM APIs (Google Gemini, OpenAI) for structured document intelligence, function calling, and automated workflows.
- Bridge UI/UX design prototypes with robust engineering, ensuring high performance, fluid animations, and accessibility.

Requirements:
- 2+ years of software engineering experience across modern TypeScript ecosystems.
- Demonstrated experience deploying LLM/AI workflows in production (agents, document processing, or automation bots).
- Strong relational database modeling and API architecture skills.
- High attention to design detail, speed, and craftsmanship.`;

const SAMPLE_COMPANY_PROFILE = `Veloce AI is a fast-growing tech venture backing AI-native workflow automation for enterprise operations. We value velocity, engineering craft, pragmatic problem solving, and autonomous execution.`;

export default function CoverLetterStudioPage() {
  // Inputs state
  const [jobDescription, setJobDescription] = useState("");
  const [companyProfile, setCompanyProfile] = useState("");
  const [cvData, setCvData] = useState(DEFAULT_CV_MARKDOWN);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("modern-tech");
  const [customInstructions, setCustomInstructions] = useState("");
  const [model, setModel] = useState<string>("gemini-3.7-flash");

  // Output & UI state
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"formatted" | "markdown">("formatted");
  const [copied, setCopied] = useState(false);
  const [copiedMd, setCopiedMd] = useState(false);
  const [showCvDrawer, setShowCvDrawer] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [instructionsContent, setInstructionsContent] = useState<string>("");
  const [isLoadingInstructions, setIsLoadingInstructions] = useState(false);
  const [clientApiKey, setClientApiKey] = useState("");
  const [hasSavedKey, setHasSavedKey] = useState(false);

  const handleOpenInstructions = async () => {
    setShowInstructionsModal(true);
    if (!instructionsContent) {
      setIsLoadingInstructions(true);
      try {
        const res = await fetch("/api/cover-letter/generate");
        const data = await res.json();
        if (data.instructions) {
          setInstructionsContent(data.instructions);
        }
      } catch (e) {
        console.error("Failed to load instructions:", e);
      } finally {
        setIsLoadingInstructions(false);
      }
    }
  };

  // Dynamic Today's Date formatted as "Month Day, Year"
  const todayFormatted = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const currentTemplate = COVER_LETTER_TEMPLATES.find((t) => t.id === selectedTemplate);
  const rawTemplatePreview = currentTemplate?.systemDirective.split("=== TEMPLATE START ===")[1]?.split("=== TEMPLATE END ===")[0]?.trim() || "";
  const templatePreview = rawTemplatePreview.replace(/\[Date\]/g, todayFormatted);

  // File upload input refs
  const jdFileInputRef = useRef<HTMLInputElement>(null);
  const companyFileInputRef = useRef<HTMLInputElement>(null);
  const cvFileInputRef = useRef<HTMLInputElement>(null);

  // Load API key from localStorage on mount
  useEffect(() => {
    try {
      const savedKey = localStorage.getItem("gemini_api_key");
      if (savedKey) {
        setClientApiKey(savedKey);
        setHasSavedKey(true);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const saveApiKey = (key: string) => {
    setClientApiKey(key);
    try {
      if (key.trim()) {
        localStorage.setItem("gemini_api_key", key.trim());
        setHasSavedKey(true);
      } else {
        localStorage.removeItem("gemini_api_key");
        setHasSavedKey(false);
      }
    } catch {
      // Ignore localStorage errors
    }
    setShowApiKeyModal(false);
  };

  // Handle file uploads (reading text)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) setter(content);
    };
    reader.readAsText(file);
    e.target.value = ""; // reset
  };

  // Generate Handler
  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      setError("Please provide a Job Description (paste text or upload a file).");
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      const res = await fetch("/api/cover-letter/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription,
          companyProfile,
          cvData,
          templateId: selectedTemplate,
          customInstructions,
          model,
          apiKey: clientApiKey.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.code === "MISSING_API_KEY") {
          setShowApiKeyModal(true);
        }
        throw new Error(data.error || "Failed to generate cover letter.");
      }

      setCoverLetter(data.coverLetter);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy to clipboard
  const handleCopy = () => {
    if (!coverLetter) return;
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Print to PDF (triggers native print dialog for clean A4 PDF)
  const handlePrint = () => {
    window.print();
  };

  // Load sample data
  const handleLoadSample = () => {
    setJobDescription(SAMPLE_JOB_DESCRIPTION);
    setCompanyProfile(SAMPLE_COMPANY_PROFILE);
  };

  return (
    <>
      {/* ── Native A4 Print Stylesheet for Real Document PDF Export ── */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 24mm 20mm 20mm 20mm;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html, body {
            background: #ffffff !important;
            color: #111827 !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: auto !important;
          }
          header, nav, aside, [data-no-print] {
            display: none !important;
          }
          main {
            background: transparent !important;
            padding: 0 !important;
            margin: 0 !important;
            display: block !important;
            min-height: auto !important;
          }
          .grid, section {
            display: block !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          #printable-sheet {
            display: block !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            min-height: auto !important;
            background: transparent !important;
          }
          .print-hidden {
            display: none !important;
          }
          .print-doc-body {
            display: block !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
            font-size: 11pt !important;
            line-height: 1.65 !important;
            color: #111827 !important;
            white-space: pre-wrap !important;
            word-break: break-word !important;
          }
        }
        @media screen {
          .print-doc-body {
            display: none !important;
          }
        }
      `}</style>

      <main className="min-h-screen bg-[#F3F4F6] text-[#1F2937] flex flex-col">
        {/* ── Studio Header Bar ── */}
        <header data-no-print className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E5E7EB] px-4 sm:px-6 py-3.5">
          <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="/lab"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#1F2937] transition-colors rounded-lg px-2.5 py-1.5 hover:bg-[#F3F4F6]"
              >
                <ArrowLeft size={14} />
                <span>Lab</span>
              </Link>

              <span className="h-4 w-px bg-[#E5E7EB]" />

              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-600">
                  <Sparkles size={14} />
                </div>
                <div>
                  <h1 className="text-sm font-bold tracking-tight text-[#1F2937] leading-none">
                    AI Cover Letter Studio
                  </h1>
                  <span className="text-[10px] text-[#6B7280]">Humanized, anti-AI bespoke applications</span>
                </div>
              </div>
            </div>

            {/* Model & Settings Bar */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Dedicated Instructions MD Button */}
              <button
                type="button"
                onClick={handleOpenInstructions}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-semibold text-[#4B5563] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all shadow-2xs"
                title="View specialized anti-AI instructions markdown"
              >
                <FileCode size={13} className="text-indigo-600" />
                <span className="hidden sm:inline">Anti-AI Instructions</span>
                <span className="sm:hidden">Instructions</span>
                <span className="text-[10px] text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded font-mono">.md</span>
              </button>

              {/* Model selector (strictly 3.6, 3.7, 3.8 Flash) */}
              <div className="w-[180px] sm:w-[210px]">
                <AnimatedDropdown
                  actions={MODEL_ACTIONS}
                  selectedId={model}
                  onSelect={(action) => setModel(action.id)}
                  triggerIcon={<Sliders size={14} />}
                  placeholder="Select Flash Model..."
                />
              </div>

              {/* API Key configuration button */}
              <button
                type="button"
                onClick={() => setShowApiKeyModal(true)}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${hasSavedKey
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                  : "bg-white border-[#E5E7EB] text-[#4B5563] hover:bg-[#F9FAFB] hover:border-[#D1D5DB]"
                  }`}
              >
                <Key size={12} />
                <span>{hasSavedKey ? "Key Saved" : "API Key"}</span>
              </button>
            </div>
          </div>
        </header>

        {/* ── Studio Workspace Body (Dual Pane) ── */}
        <div className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ═════════════════════════════════════════════════════════════════════
              LEFT PANE: CONTROLS & INPUTS (lg:col-span-5)
          ══════════════════════════════════════════════════════════════════════ */}
          <section data-studio-controls data-no-print className="lg:col-span-5 flex flex-col gap-5 relative">
            {/* Generated Overlay */}
            {coverLetter && (
              <div className="absolute -inset-4 z-10 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/50 flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#E5E7EB] max-w-sm w-full animate-in zoom-in-95 duration-300">
                  <div className="h-14 w-14 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 flex items-center justify-center mx-auto mb-5 shadow-xs">
                    <Check size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-[#1F2937] mb-2">Cover Letter Ready</h3>
                  <p className="text-sm text-[#6B7280] mb-8 leading-relaxed">
                    Your bespoke cover letter has been synthesized. You can edit it directly in the typed document preview or export it to PDF.
                  </p>
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to create a new cover letter? This will discard the current one.")) {
                        setCoverLetter("");
                      }
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#1F2937] px-4 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-black hover:shadow-md"
                  >
                    <RotateCcw size={16} />
                    <span>Create New Letter</span>
                  </button>
                </div>
              </div>
            )}

            {/* Template Archetype Selector */}
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4B5563]">
                  1. Select Archetype
                </label>
                <button
                  type="button"
                  onClick={handleOpenInstructions}
                  className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <FileCode size={11} />
                  <span>Anti-AI Rules Active</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {COVER_LETTER_TEMPLATES.map((tmpl) => {
                  const isSelected = selectedTemplate === tmpl.id;
                  return (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => setSelectedTemplate(tmpl.id)}
                      className={`text-left p-3 rounded-xl border transition-all ${isSelected
                        ? "bg-indigo-50/70 border-indigo-300 shadow-xs ring-1 ring-indigo-300"
                        : "bg-[#F9FAFB] border-[#E5E7EB] hover:bg-white hover:border-[#D1D5DB]"
                        }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#1F2937] leading-tight">{tmpl.name}</span>
                        <span
                          className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${isSelected ? "bg-indigo-600 text-white" : "bg-[#E5E7EB] text-[#4B5563]"
                            }`}
                        >
                          {tmpl.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6B7280] line-clamp-2 leading-relaxed">
                        {tmpl.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target Job Description Input */}
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4B5563] flex items-center gap-1.5">
                  <Briefcase size={13} className="text-indigo-600" />
                  <span>2. Job Description *</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleLoadSample}
                    className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    Load Sample
                  </button>
                  <span className="text-[#D1D5DB]">|</span>
                  <input
                    type="file"
                    ref={jdFileInputRef}
                    accept=".txt,.md"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, setJobDescription)}
                  />
                  <button
                    type="button"
                    onClick={() => jdFileInputRef.current?.click()}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-[#6B7280] hover:text-[#1F2937] transition-colors"
                  >
                    <Upload size={11} />
                    <span>Upload .txt/.md</span>
                  </button>
                </div>
              </div>

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description, responsibilities, and required qualifications here..."
                rows={6}
                className="w-full text-xs text-[#1F2937] bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3.5 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-[#9CA3AF] resize-y"
              />
            </div>

            {/* Company Profile / Mission Context */}
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4B5563] flex items-center gap-1.5">
                  <Building2 size={13} className="text-indigo-600" />
                  <span>3. Company Context (Optional)</span>
                </label>
                <input
                  type="file"
                  ref={companyFileInputRef}
                  accept=".txt,.md"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, setCompanyProfile)}
                />
                <button
                  type="button"
                  onClick={() => companyFileInputRef.current?.click()}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#6B7280] hover:text-[#1F2937] transition-colors"
                >
                  <Upload size={11} />
                  <span>Upload .txt/.md</span>
                </button>
              </div>

              <textarea
                value={companyProfile}
                onChange={(e) => setCompanyProfile(e.target.value)}
                placeholder="Company culture, values, recent funding, tech stack, or specific challenges mentioned on their site..."
                rows={3}
                className="w-full text-xs text-[#1F2937] bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3.5 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-[#9CA3AF] resize-y"
              />
            </div>

            {/* Candidate CV Context Accordion */}
            <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-xs overflow-hidden">
              <button
                type="button"
                onClick={() => setShowCvDrawer(!showCvDrawer)}
                className="w-full flex items-center justify-between p-4 bg-[#F9FAFB] hover:bg-[#F3F4F6] transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-indigo-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4B5563]">
                    4. Candidate CV Fact Base
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#6B7280]">Mario Richie Lim</span>
                  {showCvDrawer ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
              </button>

              {showCvDrawer && (
                <div className="p-4 border-t border-[#E5E7EB] flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] text-[#6B7280]">
                      This verified CV Markdown provides the factual anchor for all claims and achievements.
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={cvFileInputRef}
                        accept=".txt,.md"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, setCvData)}
                      />
                      <button
                        type="button"
                        onClick={() => cvFileInputRef.current?.click()}
                        className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800"
                      >
                        Upload Custom CV
                      </button>
                      <button
                        type="button"
                        onClick={() => setCvData(DEFAULT_CV_MARKDOWN)}
                        title="Reset to default CV"
                        className="text-[11px] font-medium text-[#6B7280] hover:text-[#1F2937]"
                      >
                        <RotateCcw size={12} />
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={cvData}
                    onChange={(e) => setCvData(e.target.value)}
                    rows={8}
                    className="w-full font-mono text-[11px] text-[#1F2937] bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3 focus:outline-hidden"
                  />
                </div>
              )}
            </div>

            {/* Custom Notes / Prompt Tweaks */}
            {selectedTemplate === "custom" && (
              <div className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-4">
                <label className="text-xs font-bold uppercase tracking-wider text-indigo-900 block mb-2">
                  Custom Blueprint Instructions
                </label>
                <textarea
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  placeholder="Specify key points to emphasize, specific projects to highlight, desired length, tone adjustments, etc."
                  rows={3}
                  className="w-full text-xs text-[#1F2937] bg-white border border-indigo-200 rounded-xl p-3 focus:outline-hidden"
                />
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-700 flex items-start gap-2">
                <span className="font-bold">Error:</span>
                <span className="flex-1">{error}</span>
              </div>
            )}

            {/* Generate Action Button */}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 px-6 font-semibold text-sm shadow-md transition-all ${isGenerating
                ? "bg-indigo-400 text-white cursor-wait"
                : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg active:scale-[0.99]"
                }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Synthesizing Humanized Cover Letter with {model}...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Generate Bespoke Cover Letter</span>
                </>
              )}
            </button>
          </section>

          {/* ═════════════════════════════════════════════════════════════════════
              RIGHT PANE: LIVE A4 TYPED DOCUMENT CANVAS (lg:col-span-7)
          ══════════════════════════════════════════════════════════════════════ */}
          <section className="lg:col-span-7 flex flex-col gap-4">
            {/* Canvas Action Bar */}
            <div data-no-print className="flex flex-wrap items-center justify-between gap-3 bg-white border border-[#E5E7EB] rounded-2xl px-4 py-2.5 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#374151]">A4 Typed Document Canvas</span>
                {coverLetter && (
                  <span className="text-[10px] font-mono text-[#6B7280] bg-[#F3F4F6] px-2 py-0.5 rounded-full">
                    {coverLetter.trim().split(/\s+/).length} words
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Mode toggle */}
                <div className="flex rounded-lg bg-[#F3F4F6] p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setPreviewMode("formatted")}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-all ${previewMode === "formatted"
                      ? "bg-white text-[#1F2937] shadow-xs"
                      : "text-[#6B7280] hover:text-[#1F2937]"
                      }`}
                  >
                    <Eye size={12} />
                    <span>Typed View</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode("markdown")}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-all ${previewMode === "markdown"
                      ? "bg-white text-[#1F2937] shadow-xs"
                      : "text-[#6B7280] hover:text-[#1F2937]"
                      }`}
                  >
                    <Code size={12} />
                    <span>Raw Text</span>
                  </button>
                </div>

                {/* Copy Button */}
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!coverLetter}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-2.5 py-1.5 text-xs font-medium text-[#374151] hover:bg-[#F9FAFB] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>

                {/* Print / Export to PDF Button */}
                <button
                  type="button"
                  onClick={handlePrint}
                  disabled={!coverLetter}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#1F2937] px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <Download size={12} />
                  <span>Export to PDF</span>
                </button>
              </div>
            </div>

            {/* The Real Document Sheet (Starts cleanly as normal text, no lines) */}
            <div className="relative w-full flex justify-center overflow-x-auto py-2">
              <div
                id="printable-sheet"
                className="w-full max-w-[760px] min-h-[960px] bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8 sm:p-14 flex flex-col transition-all"
              >
                {coverLetter ? (
                  previewMode === "formatted" ? (
                    <div className="flex flex-col h-full w-full">
                      {/* Fully editable typed document area */}
                      <textarea
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        className="w-full flex-1 text-[13.5px] sm:text-[14px] text-[#111827] leading-[1.7] font-sans resize-none focus:outline-hidden bg-transparent print-hidden"
                        style={{ minHeight: "820px" }}
                        placeholder="Your cover letter text starts here..."
                      />
                      {/* Print-only div: natural pagination and crisp document rendering for PDF export */}
                      <div className="print-doc-body">
                        {coverLetter}
                      </div>
                    </div>
                  ) : (
                    /* Raw text view */
                    <textarea
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      className="w-full h-full min-h-[820px] font-mono text-xs text-[#1F2937] leading-relaxed resize-none focus:outline-hidden bg-transparent"
                    />
                  )
                ) : (
                  /* Template Blueprint Preview (Clean text, today's date, no decorative lines) */
                  <div className="flex flex-col h-full w-full animate-in fade-in duration-500">
                    <div data-no-print className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-[#F3F4F6]">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1F2937]">{currentTemplate?.name}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                          Blueprint Structure
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleLoadSample}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-xl transition-all hover:bg-indigo-100"
                      >
                        <Briefcase size={12} />
                        <span>Load Sample Data</span>
                      </button>
                    </div>

                    <textarea
                      value={templatePreview}
                      readOnly
                      className="w-full flex-1 text-[13.5px] sm:text-[14px] text-[#4B5563] leading-[1.7] font-sans resize-none focus:outline-hidden bg-transparent opacity-75 cursor-default"
                      style={{ minHeight: "820px" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* ── Dedicated Anti-AI Instructions Modal (.md) ── */}
        {showInstructionsModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          >
            <div className="w-full max-w-2xl max-h-[85vh] bg-white rounded-3xl border border-[#E5E7EB] shadow-2xl flex flex-col overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-[#E5E7EB] bg-[#F9FAFB]">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                    <FileCode size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1F2937]">cover-letter-instructions.md</h3>
                    <p className="text-[11px] text-[#6B7280]">Dedicated prompt instructions & anti-AI humanization directives</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowInstructionsModal(false)}
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:bg-[#E5E7EB] transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-5 overflow-y-auto flex-1 bg-[#FAFAFA]">
                {isLoadingInstructions ? (
                  <div className="flex items-center justify-center py-16 text-xs text-[#6B7280] gap-2">
                    <RefreshCw size={14} className="animate-spin text-indigo-600" />
                    <span>Loading cover-letter-instructions.md...</span>
                  </div>
                ) : (
                  <pre className="text-xs font-mono text-[#374151] whitespace-pre-wrap leading-relaxed bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-2xs">
                    {instructionsContent || "No instructions loaded."}
                  </pre>
                )}
              </div>

              <div className="flex items-center justify-between p-4 border-t border-[#E5E7EB] bg-white">
                <span className="text-xs text-[#6B7280]">
                  Location: <code className="bg-[#F3F4F6] px-1.5 py-0.5 rounded text-[11px]">src/lib/data/cover-letter-instructions.md</code>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(instructionsContent);
                      setCopiedMd(true);
                      setTimeout(() => setCopiedMd(false), 2000);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-[#E5E7EB] rounded-xl hover:bg-[#F9FAFB] text-[#374151]"
                  >
                    {copiedMd ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                    <span>{copiedMd ? "Copied" : "Copy MD"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowInstructionsModal(false)}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── API Key Configuration Modal ── */}
        {showApiKeyModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          >
            <div className="w-full max-w-md bg-white rounded-3xl border border-[#E5E7EB] shadow-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                  <Key size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1F2937]">Gemini API Key</h3>
                  <p className="text-xs text-[#6B7280]">Bring your own key (BYOK) for unlimited generation</p>
                </div>
              </div>

              <p className="text-xs text-[#4B5563] leading-relaxed">
                Your key is stored strictly in your local browser storage (<code className="bg-[#F3F4F6] px-1 py-0.5 rounded text-[11px]">localStorage</code>) and sent directly to the server generation endpoint. It is never logged or persisted in any database.
              </p>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#4B5563] block mb-1">
                  API Key
                </label>
                <input
                  type="password"
                  value={clientApiKey}
                  onChange={(e) => setClientApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full text-xs font-mono text-[#1F2937] bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  <span>Get a free key from Google AI Studio</span>
                  <ExternalLink size={11} />
                </a>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => setShowApiKeyModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#6B7280] hover:text-[#1F2937]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => saveApiKey(clientApiKey)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors"
                >
                  Save Key
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
