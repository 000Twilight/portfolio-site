export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
  tags: string[];
  imageFolder: string;
}

export const experienceData = {
  title: "Experience",
  subtitle: "Professional Background",
  items: [
    {
      company: "PT. Bonumata Asia",
      role: "Junior Developer (Internship)",
      period: "September 2025 – January 2026",
      description: [
        "Engineered a comprehensive construction project management platform using Scriptcase and PostgreSQL, digitizing critical workflows including Cost Budget Plans (RAB), contract generation, and version control for 3D files.",
        "Translated complex construction business requirements into scalable software modules (budgeting, project execution, and reporting), significantly reducing manual administrative overhead and improving cross-stakeholder project visibility."
      ],
      tags: ["Scriptcase", "PostgreSQL", "System Design", "Workflow Automation"],
      imageFolder: "/assets/images/experience/bonumata"
    },
    {
      company: "PT. Nusantara Compnet Integrator",
      role: "Internal Application Developer (Internship)",
      period: "February 2025 – August 2025",
      description: [
        "Architected a full-stack resource management system (Laravel, PHP, MySQL) featuring digital borrowing and multi-tier approval workflows, increasing equipment request efficiency by 50% across multiple divisions.",
        "Developed a web-based meeting room booking system that digitized manual reservation workflows, improving overall scheduling efficiency by approximately 40%.",
        "Built a real-time, multiplayer team quiz web application using Socket.IO for internal company events, achieving a >90% positive feedback rate from participants."
      ],
      tags: ["Laravel", "PHP", "MySQL", "Socket.IO", "Full-Stack Development"],
      imageFolder: "/assets/images/experience/nusantara"
    }
  ] as ExperienceItem[],
};
