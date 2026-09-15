export interface CoverLetterTemplate {
  id: string;
  name: string;
  badge: string;
  description: string;
  systemDirective: string;
}

export const COVER_LETTER_TEMPLATES: CoverLetterTemplate[] = [
  {
    id: "modern-tech",
    name: "Modern Tech & High-Growth",
    badge: "Recommended",
    description: "Punchy, metrics-driven, and impact-focused. Ideal for modern startups and tech teams.",
    systemDirective: `
Please use the following template structure. Do not include markdown headers, decorative lines, or dividers. Start directly with the plain text contact info and date. Replace bracketed placeholders with synthesized details from the Job Description and CV.

=== TEMPLATE START ===
Mario Richie Lim
Jakarta, Indonesia | +62 878-0929-0500 | mario.richie.lim@gmail.com | linkedin.com/in/mario-richie-lim/ | github.com/000Twilight | mario-richie-lim.vercel.app

[Date]

[Hiring Manager Name or "Hiring Team"]
[Company Name]
[Company Address or "Remote"]

Dear [Hiring Manager Name or "Hiring Team"],

[Open directly with a sharp observation about the company's product or mission, connecting it to why this engineering challenge fits your background].

In my recent experience as a [Your Recent Role] at [Your Recent Company/Project], I [Insert 1-2 major technical achievements directly relevant to the JD, using metrics where possible]. What drew me to your team is [Mention a specific tech stack or engineering goal from the JD], where my experience in [Mention 1-2 core skills like React, TypeScript, Laravel, or Gemini API automation] will allow me to hit the ground running.

[Insert a short, focused paragraph connecting another relevant project or problem-solving accomplishment to a key requirement in the Job Description. Keep the tone grounded, confident, and direct.]

I would love to talk through how my technical background and focus on product velocity can help [Company Name] execute on these goals. Thanks for your time and consideration.

Sincerely,

Mario Richie Lim
=== TEMPLATE END ===
`,
  },
  {
    id: "enterprise",
    name: "Enterprise & Scalable Systems",
    badge: "Structured",
    description: "Formal, thorough, and architectural. Emphasizes reliability and cross-team collaboration.",
    systemDirective: `
Please use the following template structure. Do not include markdown headers, decorative lines, or dividers. Start directly with the plain text contact info and date. Replace bracketed placeholders with synthesized details from the Job Description and CV.

=== TEMPLATE START ===
Mario Richie Lim
Jakarta, Indonesia | +62 878-0929-0500 | mario.richie.lim@gmail.com | linkedin.com/in/mario-richie-lim/ | github.com/000Twilight | mario-richie-lim.vercel.app

[Date]

[Hiring Manager Name or "Hiring Committee"]
[Company Name]
[Company Address or "Remote"]

Dear [Hiring Manager Name or "Hiring Committee"],

I am reaching out regarding the [Job Title] role at [Company Name]. Having built robust full-stack applications and automated internal operational systems that improved business efficiency by up to 50%, I am eager to bring this architectural rigor to your team.

During my work on [Insert relevant Enterprise/Scalable Project], I focused heavily on [Insert 2-3 enterprise skills, e.g., relational databases, system architecture, backend optimization]. From your description, [Company Name] is prioritizing [Insert a core JD requirement], which directly matches my background in [Insert matching experience/metric].

I place a premium on system stability, maintainable data models, and tight cross-functional execution. [Company Name]'s standard for [Insert Company Value/Mission] resonates with how I build software, and I am excited about the opportunity to contribute.

I look forward to the possibility of discussing how my technical background aligns with your engineering roadmap.

Sincerely,

Mario Richie Lim
=== TEMPLATE END ===
`,
  },
  {
    id: "creative-technologist",
    name: "Product & Creative Technologist",
    badge: "Craft & UX",
    description: "Narrative and craftsmanship focused. Bridges high-fidelity UI/UX with AI workflows.",
    systemDirective: `
Please use the following template structure. Do not include markdown headers, decorative lines, or dividers. Start directly with the plain text contact info and date. Replace bracketed placeholders with synthesized details from the Job Description and CV.

=== TEMPLATE START ===
Mario Richie Lim
Jakarta, Indonesia | +62 878-0929-0500 | mario.richie.lim@gmail.com | linkedin.com/in/mario-richie-lim/ | github.com/000Twilight | mario-richie-lim.vercel.app

[Date]

[Hiring Manager Name or "Design & Engineering Team"]
[Company Name]
[Company Address or "Remote"]

Dear [Hiring Manager Name or "Team"],

Great products happen at the intersection of thoughtful design and solid engineering. That philosophy is what immediately caught my attention about the [Job Title] role at [Company Name].

Seeing that your team is building [Insert a specific initiative or feature from JD/Company Profile] felt like a natural fit. In my work on [Insert a project from CV, e.g., LearnMuse or interactive systems], I worked directly across the stack, connecting complex APIs and database pipelines with fluid, intuitive user interfaces.

I care as much about clean database schemas and reliable endpoints as I do about responsive layouts and micro-interactions. [Insert a brief paragraph about how your technical range maps directly to their current product needs].

I would love to walk through some of my work and explore how I can help [Company Name] build exceptional products.

Best regards,

Mario Richie Lim
=== TEMPLATE END ===
`,
  },
  {
    id: "custom",
    name: "Custom Instructions Blueprint",
    badge: "Flexible",
    description: "Follows your exact custom instructions and guidance.",
    systemDirective: `
Please generate a cover letter adhering strictly to the candidate's custom instructions provided in the prompt. Always start with the candidate contact header and today's date in plain text with no decorative lines.
`,
  },
];
