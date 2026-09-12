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
Please use the following EXACT template structure. Do not change the headings, words, or layout of the template. Only replace the bracketed placeholders (like [Date], [Hiring Manager], etc.) with the appropriate information synthesized from the Job Description, Company Profile, and CV data.

=== TEMPLATE START ===
[Your Full Name]
[Your Phone Number] | [Your Email] | [Your LinkedIn/Portfolio URL]

[Date]

[Hiring Manager Name or "Hiring Team"]
[Company Name]
[Company Address or "Remote"]

Dear [Hiring Manager Name or "Hiring Team"],

I am writing to express my strong interest in the [Job Title] position at [Company Name]. [Insert a strong hook sentence about why their mission or product excites you based on the company profile/JD].

In my recent experience as a [Your Recent Role] at [Your Recent Company/Project], I successfully [Insert 1-2 major achievements directly relevant to the JD, using metrics where possible]. I am particularly drawn to your team's work in [Mention a specific tech stack or goal from the JD], and I am confident that my background in [Mention 1-2 of your core skills like React, Node.js, AI APIs] will allow me to make an immediate impact.

[Insert a short paragraph connecting another relevant project/experience to a specific requirement in the Job Description. Highlight how you thrive in fast-paced environments or solve complex problems.]

I would welcome the opportunity to discuss how my technical skills and product mindset align with [Company Name]'s goals. Thank you for your time and consideration.

Sincerely,

[Your Full Name]
=== TEMPLATE END ===
`,
  },
  {
    id: "enterprise",
    name: "Enterprise & Scalable Systems",
    badge: "Structured",
    description: "Formal, thorough, and architectural. Emphasizes reliability and cross-team collaboration.",
    systemDirective: `
Please use the following EXACT template structure. Do not change the headings, words, or layout of the template. Only replace the bracketed placeholders with the appropriate synthesized information.

=== TEMPLATE START ===
[Your Full Name]
[Your Address]
[Your Phone Number] | [Your Email]

[Date]

[Hiring Manager Name or "Hiring Committee"]
[Company Name]
[Company Address]

Subject: Application for [Job Title]

Dear [Hiring Manager Name or "Hiring Committee"],

Please accept this letter as a formal expression of my interest in the [Job Title] role at [Company Name]. With a proven track record in software engineering and a deep focus on building reliable, scalable systems, I am eager to contribute to your engineering department.

Throughout my career, particularly during my time working on [Insert relevant Enterprise/Scalable Project], I have honed my expertise in [Insert 2-3 enterprise skills, e.g., relational databases, system architecture, backend optimization]. I note from your job description that [Company Name] is currently focusing on [Insert a core JD requirement], which aligns perfectly with my experience in [Insert matching experience/metric].

I am highly collaborative and accustomed to working with cross-functional teams to deliver robust software solutions that meet stringent business requirements. I admire [Company Name]'s commitment to [Insert Company Value/Mission] and am highly motivated to bring my technical rigor to your organization.

I have attached my resume for your review. I look forward to the possibility of discussing this opportunity with you in greater detail.

Respectfully yours,

[Your Full Name]
=== TEMPLATE END ===
`,
  },
  {
    id: "creative-technologist",
    name: "Product & Creative Technologist",
    badge: "Craft & UX",
    description: "Narrative and craftsmanship focused. Bridges high-fidelity UI/UX with AI workflows.",
    systemDirective: `
Please use the following EXACT template structure. Do not change the headings, words, or layout of the template. Only replace the bracketed placeholders with the appropriate synthesized information.

=== TEMPLATE START ===
[Your Full Name]
[Your Email] | [Your Portfolio URL]

[Date]

[Hiring Manager Name or "Design & Engineering Team"]
[Company Name]

Hi [Hiring Manager Name or "Team"],

Great products happen at the intersection of beautiful design and flawless engineering. That is exactly why I am thrilled to apply for the [Job Title] position at [Company Name]. 

When I saw that you are building [Insert something cool they are building from JD/Company Profile], I knew I had to reach out. In my work on [Insert a visually/creatively impressive project from CV, e.g., LearnMuse or interactive portfolio], I bridged the gap between complex backend systems (like [Insert Tech]) and fluid, intuitive user interfaces (using [Insert Tech]). 

I love obsessing over the micro-interactions as much as I love architecting the database schema. [Insert a brief paragraph about how your specific technical and creative skills map to their current needs/JD].

I would love to show you some of my recent work and discuss how I can help [Company Name] continue to build delightful experiences.

Best regards,

[Your Full Name]
=== TEMPLATE END ===
`,
  },
  {
    id: "custom",
    name: "Custom Instructions Blueprint",
    badge: "Flexible",
    description: "Follows your exact custom instructions and guidance.",
    systemDirective: `
Please generate a cover letter adhering strictly to the candidate's custom instructions provided in the prompt. If the user provides a literal template in the custom instructions, fill it out exactly. Otherwise, use a standard professional format.
`,
  },
];
