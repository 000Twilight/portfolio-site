import { projectsData } from "../data/projects";
import { experienceData } from "../data/experience";

export const siteContent = {
  nav: {
    homeLabel: "MRL",
    homeName: "Mario Richie Lim",
    availableLabel: "Available for work",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Work", href: "/work" },
      { label: "Now", href: "/now" },
      { label: "Uses", href: "/uses" },
    ],
  },
  hero: {
    firstName: "Mario",
    lastName: "Richie Lim",
    eyebrow: "",
    primaryCta: "View selected work",
    secondaryCta: "Get in touch",
    portraitAlt: "Portrait of Mario Richie Lim",
    portrait: "/assets/images/portrait.jpeg",
    spotlightTitle: "Design that\nbehaves beautifully",
    spotlightCopy: "Full-stack developer and AI enthusiast based in Jakarta, specializing in building high-fidelity web, mobile apps, and automated workflows.",
  },
  projects: projectsData,
  experience: experienceData,
  about: {
    title: "About",
    copy: "I build full-stack web and mobile applications, combining modern front-end experiences (React, React Native, Tailwind CSS) with robust backends (Laravel, Node.js, Supabase). I'm passionate about integrating AI solutions and translating complex business workflows into clean, functional software.",
    capabilities: [
      "React & TypeScript",
      "React Native & Expo",
      "Laravel & PHP",
      "PostgreSQL & Supabase",
      "UI/UX & Figma",
      "AI & Automation",
    ],
    metrics: [
      { value: 2, suffix: "", label: "Professional internships" },
      { value: 8, suffix: "+", label: "Projects completed" },
      { value: 940, suffix: "", label: "TOEIC English score" },
      { value: 100, suffix: "%", label: "Hands on code" },
    ],
  },
  marquee: {
    words: ["Interfaces", "Systems", "Motion", "Typography", "Craft"],
  },
  contact: {
    title: "Let's build something\nworth looking at.",
    email: "mario.richie.lim@gmail.com",
    socialLinks: [
      { label: "Instagram", href: "https://instagram.com/mario_r_lim" },
      { label: "Github", href: "https://github.com/000Twilight" },
      { label: "LinkedIn", href: "https://linkedin.com/in/mario-richie-lim" },
    ],
    footerPrefix: "©",
    footerSuffix: "Mario Richie Lim — Jakarta",
  },
} as const;
