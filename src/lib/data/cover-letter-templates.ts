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
    description: "Punchy, metrics-driven, and impact-focused. Ideal for modern startups, product teams, and remote roles.",
    systemDirective: `
STRATEGIC ARCHETYPE FOCUS: Modern Tech & High-Growth
- Tone: Confident, proactive, builder-oriented, and articulate.
- Narrative Angle: Emphasize product velocity, end-to-end execution (frontend, backend, database), clean component architectures (React, Next.js, Node.js), and autonomous ownership in remote/distributed teams.
- Key Evidence to Prioritize: Full-stack applications (LearnMuse, internal systems), REST APIs, modern state management, and real-time or AI integrations where relevant.
- Address Specific JD Hooks: If the job description asks about a project built end-to-end or async remote communication across time zones, directly answer it with rich, authentic technical details.
- Important: Do NOT mechanically copy boilerplate text. Craft an original, organic narrative that addresses the company's stated tech stack and product goals.

=== TEMPLATE START ===
Mario Richie Lim
Jakarta, Indonesia | +62 878-0929-0500 | mario.richie.lim@gmail.com | linkedin.com/in/mario-richie-lim | github.com/000Twilight | mario-richie-lim.vercel.app

[Date]

Hiring Team
[Company Name]
[Location / Remote]

Dear Hiring Team,

[Open with a thoughtful observation about the company's product, mission, or explicit engineering challenge, directly connecting it to your hands-on background].

[Detail a relevant end-to-end project or recent achievement matching their primary tech stack. Highlight architectural decisions, state management, API design, and concrete metrics that demonstrate your ability to execute quickly and cleanly].

[Connect another relevant project or problem-solving accomplishment to their specific engineering needs, demonstrating your experience with distributed teams, automated workflows, or clean code practices].

[Grounded, professional closing offering to discuss how your technical background and product focus can help their engineering team hit their targets].

Sincerely,

Mario Richie Lim
=== TEMPLATE END ===
`,
  },
  {
    id: "enterprise",
    name: "Enterprise & Scalable Systems",
    badge: "Structured",
    description: "Architectural, thorough, and process-oriented. Emphasizes stability, data integrity, and cross-team execution.",
    systemDirective: `
STRATEGIC ARCHETYPE FOCUS: Enterprise & Scalable Systems
- Tone: Structured, disciplined, analytical, and professional.
- Narrative Angle: Emphasize business workflow digitalization, relational data modeling (PostgreSQL, MySQL), system stability, rigorous technical documentation (TSD/manuals), and bridging technical solutions with non-technical business users.
- Key Evidence to Prioritize: Internal enterprise systems at PT. Nusantara Compnet Integrator (50% efficiency boost), construction project management platform at PT. Bonumata Asia, and structured UAT/system handover.
- Address Specific JD Hooks: If the posting highlights documentation, technical specification writing, or stakeholder communication, highlight your experience drafting TSDs and producing video tutorials.
- Important: Do NOT mechanically copy boilerplate text. Craft an original, organic narrative that reflects engineering maturity and business impact.

=== TEMPLATE START ===
Mario Richie Lim
Jakarta, Indonesia | +62 878-0929-0500 | mario.richie.lim@gmail.com | linkedin.com/in/mario-richie-lim | github.com/000Twilight | mario-richie-lim.vercel.app

[Date]

Hiring Committee
[Company Name]
[Company Address / Location]

Dear Hiring Committee,

[Open by addressing the operational scale or business mission of the organization, linking their need for dependable web systems to your track record in enterprise application development].

[Describe your experience translating manual business workflows into scalable web solutions, emphasizing database schema design, approval hierarchies, and quantifiable operational efficiency improvements].

[Highlight your discipline in technical documentation, Technical Specification Documents (TSDs), video walkthroughs, and User Acceptance Testing (UAT) that ensure seamless adoption and long-term maintainability].

[Confident closing emphasizing your focus on data integrity, scalable architecture, and cross-functional collaboration].

Sincerely,

Mario Richie Lim
=== TEMPLATE END ===
`,
  },
  {
    id: "creative-technologist",
    name: "Product & Creative Technologist",
    badge: "Craft & UX",
    description: "Narrative and craftsmanship focused. Bridges high-fidelity UI/UX design with scalable engineering.",
    systemDirective: `
STRATEGIC ARCHETYPE FOCUS: Product & Creative Technologist
- Tone: Design-aware, articulate, user-centric, and technically sharp.
- Narrative Angle: Emphasize the bridge between thoughtful UI/UX craft (responsive layouts, accessibility, micro-interactions, Figma design systems) and performant backend engineering (clean APIs, normalized schemas, AI workflows).
- Key Evidence to Prioritize: High-conversion frontend engineering, responsive web design with Tailwind CSS, multimodal AI interfaces (LearnMuse), and client-side performance optimization.
- Important: Do NOT mechanically copy boilerplate text. Write an engaging, authentic story demonstrating technical craftsmanship.

=== TEMPLATE START ===
Mario Richie Lim
Jakarta, Indonesia | +62 878-0929-0500 | mario.richie.lim@gmail.com | linkedin.com/in/mario-richie-lim | github.com/000Twilight | mario-richie-lim.vercel.app

[Date]

Engineering & Design Team
[Company Name]
[Location / Remote]

Dear Hiring Team,

[Open directly with an observation connecting intuitive design craft to engineering execution, showing immediate alignment with what the company is creating].

[Highlight an end-to-end application where you connected complex backend pipelines and databases with fluid, intuitive client interfaces, noting user feedback and technical performance].

[Demonstrate your attention to both sides of the engineering spectrum: clean data schemas and reliable endpoints on one side, and responsive, accessible UI components on the other].

[Grounded, enthusiastic closing looking forward to walking through your projects and discussing how you can elevate their product experience].

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
STRATEGIC ARCHETYPE FOCUS: Custom Instructions Blueprint
- Strictly honor and execute all custom instructions provided by the candidate.
- Adapt tone, project selection, and formatting emphasis based directly on the candidate's custom prompt.
`,
  },
];
