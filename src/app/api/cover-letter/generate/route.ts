import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { COVER_LETTER_TEMPLATES } from "@/lib/data/cover-letter-templates";
import { DEFAULT_CV_MARKDOWN } from "@/lib/data/default-cv";

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

    // Supported models whitelist
    const allowedModels = ["gemini-3.5-flash-lite", "gemini-2.5-flash", "gemini-3.7-flash", "gemini-2.5-pro"];
    const targetModel = allowedModels.includes(model) ? model : "gemini-3.5-flash-lite";

    const ai = new GoogleGenAI({ apiKey: activeApiKey });

    const prompt = `
You are an expert executive recruiter and elite career strategist crafting a bespoke, persuasive, high-conversion cover letter.

=== CANDIDATE CV DATA ===
${cvData}

=== TARGET JOB DESCRIPTION ===
${jobDescription}

${companyProfile ? `=== TARGET COMPANY PROFILE & CONTEXT ===\n${companyProfile}\n` : ""}

=== ARCHETYPE DIRECTIVES (${selectedTemplate.name}) ===
${selectedTemplate.systemDirective}

${customInstructions ? `=== CANDIDATE'S CUSTOM INSTRUCTIONS ===\n${customInstructions}\n` : ""}

=== INSTRUCTIONS & FORMATTING RULES ===
1. Craft a complete, authentic, highly tailored cover letter based directly on the candidate's verified achievements, metrics, and technology stack.
2. DO NOT invent fake companies or experiences not present in the CV data. Anchor every claim in their actual background (e.g. Supabase, PostgreSQL, React, Laravel, Gemini API automation, ML research).
3. Connect specific technical accomplishments directly to the responsibilities and requirements listed in the Job Description.
4. Output cleanly structured Markdown format with standard formal letter components:
   - Date
   - Recipient / Hiring Team & Company Name (extract from JD/Company profile if available, or "Hiring Team")
   - Subject Line (e.g., Application for [Role Title] - [Candidate Name])
   - Formal Greeting
   - Letter Body (3-4 focused, impactful paragraphs)
   - Professional Sign-off and Candidate Name
5. Do NOT include meta-commentary like "Here is your cover letter:". Start directly with the letter.
`;

    const response = await ai.models.generateContent({
      model: targetModel,
      contents: prompt,
      config: {
        temperature: 0.7,
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

    // Handle common Gemini API errors gracefully
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
