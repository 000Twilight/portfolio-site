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
You are an expert technical career strategist and seasoned software engineer writing a bespoke, deeply human cover letter for Mario Richie Lim.

Today's Date: ${todayDate}

=== CANDIDATE PROFILE & VERIFIED CV DATA ===
${cvData}

=== TARGET JOB DESCRIPTION ===
${jobDescription}

${companyProfile ? `=== TARGET COMPANY PROFILE & CONTEXT ===\n${companyProfile}\n` : ""}

=== SELECTED ARCHETYPE STRATEGY: ${selectedTemplate.name} ===
${selectedTemplate.systemDirective}

${customInstructions ? `=== CANDIDATE'S CUSTOM INSTRUCTIONS (HIGHEST PRIORITY) ===\n${customInstructions}\n` : ""}

=== ANTI-AI HUMANIZATION DIRECTIVES (FROM cover-letter-instructions.md) ===
${instructionsMarkdown}

=== CRITICAL STRATEGIC PROCESS (EXECUTE BEFORE WRITING) ===
1. DETECT SPECIAL JD PROMPTS: Look closely at the Job Description. Does it ask any specific questions or request specific stories (e.g., "tell us about a project you built end to end", "why this company", remote work preferences, async tools, etc.)? If yes, you MUST naturally weave an authentic answer into the body.
2. CHOOSE THE STRONGEST EVIDENCE: Select 1 or 2 specific projects or work experiences from Mario's CV that directly match the required technologies and domain. Use verified metrics (e.g. 50% efficiency boost, 40% reduction in booking conflicts, 3.8 GPA, C2/940 TOEIC) and real tech stacks (React, Node.js, Next.js, Python, PostgreSQL, MySQL, Socket.IO, Gemini API, Supabase, Kotlin, etc.).
3. NO FORMULAIC FILL-IN-THE-BLANKS: Do NOT use boilerplate template phrasing like "In my recent experience as a [Role] at [Company], I... What drew me to your team is...". Write an organic, cohesive narrative with varied sentence structures and natural paragraph progression.
4. RESPECT CANDIDATE'S CUSTOM INSTRUCTIONS: If custom instructions are provided above, seamlessly incorporate them (e.g., highlighting specific technical documentation, video tutorials, or particular responsibilities).

=== STRICT OUTPUT INSTRUCTIONS ===
1. The output MUST start directly with the candidate contact header and today's date (${todayDate}), followed by the recipient block, salutation, and body:
Mario Richie Lim
Jakarta, Indonesia | +62 878-0929-0500 | mario.richie.lim@gmail.com | linkedin.com/in/mario-richie-lim | github.com/000Twilight | mario-richie-lim.vercel.app

${todayDate}

[Hiring Manager Name, Role, or "Hiring Team"]
[Company Name]
[Company Address, City, or "Remote"]

Dear [Recipient Name or "Hiring Team"],

2. NO DECORATIVE LINES: Do not output any "---", "===", line dividers, or horizontal rules.
3. NO MARKDOWN FORMATTING IN BODY: Do not use "#", "##", bullet lists, or bold formatting asterisks inside the letter body. Produce clean, typed text with natural paragraph breaks.
4. ZERO AI CLICHÉS: Follow all anti-AI humanization directives (no "I am writing to express my strong interest", no "Furthermore/Moreover", vary rhythm and length, sound real and grounded).
5. Output ONLY the completed cover letter text. No preamble, no meta-commentary, and no post-signature notes.
`;

    const response = await ai.models.generateContent({
      model: targetModel,
      contents: prompt,
      config: {
        temperature: 0.45,
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
