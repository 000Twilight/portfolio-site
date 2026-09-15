import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import { COVER_LETTER_TEMPLATES } from "@/lib/data/cover-letter-templates";
import { DEFAULT_CV_MARKDOWN } from "@/lib/data/default-cv";

// GET endpoint: returns the exact markdown instructions file
export async function GET() {
  try {
    const instructionsPath = path.join(process.cwd(), "src/lib/data/cover-letter-instructions.md");
    const instructions = fs.readFileSync(instructionsPath, "utf-8");
    return NextResponse.json({ instructions });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to read cover-letter-instructions.md" },
      { status: 500 }
    );
  }
}

// POST endpoint: synthesizes the cover letter using Gemini Flash models
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      jobDescription,
      companyProfile = "",
      cvData = DEFAULT_CV_MARKDOWN,
      templateId = "modern-tech",
      customInstructions = "",
      model = "gemini-3.7-flash",
      apiKey: clientApiKey,
    } = body;

    if (!jobDescription || typeof jobDescription !== "string" || !jobDescription.trim()) {
      return NextResponse.json(
        { error: "Job description is required. Please paste or upload the job details." },
        { status: 400 }
      );
    }

    // Determine active API key: prioritize client BYOK, then environment variable
    const activeApiKey = clientApiKey?.trim() || process.env.GEMINI_API_KEY?.trim();

    if (!activeApiKey) {
      return NextResponse.json(
        {
          error:
            "No Gemini API key found. Please enter your Gemini API key in the studio settings or set GEMINI_API_KEY in your .env.local file.",
          code: "MISSING_API_KEY",
        },
        { status: 401 }
      );
    }

    // Find template
    const selectedTemplate =
      COVER_LETTER_TEMPLATES.find((t) => t.id === templateId) || COVER_LETTER_TEMPLATES[0];

    // Supported models whitelist: strictly 3.6, 3.7, and 3.8 Flash
    const allowedModels = ["gemini-3.6-flash", "gemini-3.7-flash", "gemini-3.8-flash"];
    const targetModel = allowedModels.includes(model) ? model : "gemini-3.7-flash";

    const ai = new GoogleGenAI({ apiKey: activeApiKey });

    // Format today's date dynamically (e.g. "September 15, 2026")
    const todayDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    }).format(new Date());

    // Read instructions and humanization directives directly from the single source of truth: cover-letter-instructions.md
    const instructionsPath = path.join(process.cwd(), "src/lib/data/cover-letter-instructions.md");
    let instructionsMarkdown = fs.readFileSync(instructionsPath, "utf-8");
    instructionsMarkdown = instructionsMarkdown.replace(/\{\{TODAYS_DATE\}\}/g, todayDate);

    const prompt = `
You are an expert career strategist and technical writing partner crafting a bespoke, human-sounding cover letter for Mario Richie Lim.

Today's Date: ${todayDate}

=== DEDICATED INSTRUCTIONS & ANTI-AI DIRECTIVES (FROM cover-letter-instructions.md) ===
${instructionsMarkdown}

=== CANDIDATE CV DATA ===
${cvData}

=== TARGET JOB DESCRIPTION ===
${jobDescription}

${companyProfile ? `=== TARGET COMPANY PROFILE & CONTEXT ===\n${companyProfile}\n` : ""}

=== SELECTED ARCHETYPE: ${selectedTemplate.name} ===
${selectedTemplate.systemDirective}

${customInstructions ? `=== CANDIDATE'S CUSTOM INSTRUCTIONS ===\n${customInstructions}\n` : ""}

=== STRICT OUTPUT INSTRUCTIONS ===
1. The output MUST start directly with the candidate contact header and today's date (${todayDate}), followed by the recipient block, salutation, and body:
Mario Richie Lim
Jakarta, Indonesia | +62 878-0929-0500 | mario.richie.lim@gmail.com | linkedin.com/in/mario-richie-lim/ | github.com/000Twilight | mario-richie-lim.vercel.app

${todayDate}

2. NO DECORATIVE LINES: Do not output any "---", "===", line dividers, or horizontal rules.
3. NO MARKDOWN HEADINGS: Do not use "#", "##", or bold formatting asterisks inside the letter. Produce clean, typed text with natural paragraph breaks.
4. ZERO AI CLICHÉS: Follow all anti-AI humanization directives from the instructions file above (no "I am writing to express my strong interest", no "Furthermore/Moreover", vary rhythm and length, sound real and grounded).
5. Output ONLY the cover letter text. No preamble, no meta-commentary.
`;

    const response = await ai.models.generateContent({
      model: targetModel,
      contents: prompt,
      config: {
        temperature: 0.85,
      },
    });

    const outputText = response.text || "";

    if (!outputText) {
      return NextResponse.json(
        { error: "Model returned an empty response. Please check your inputs and try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      coverLetter: outputText,
      model: targetModel,
      template: selectedTemplate.id,
    });
  } catch (err: any) {
    console.error("Cover Letter Generation Error:", err);
    const errorMessage = err?.message || "Failed to generate cover letter.";

    if (errorMessage.includes("API_KEY_INVALID") || errorMessage.includes("API key not valid")) {
      return NextResponse.json(
        { error: "Invalid Gemini API key. Please check your key in the settings and try again.", code: "INVALID_KEY" },
        { status: 401 }
      );
    }

    if (errorMessage.includes("RESOURCE_EXHAUSTED") || errorMessage.includes("Quota exceeded")) {
      return NextResponse.json(
        { error: "Gemini API quota exceeded. Please try again later or use a different API key.", code: "QUOTA_EXCEEDED" },
        { status: 429 }
      );
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
