# Portfolio Site Architecture & Page Summary

This document provides a detailed, comprehensive overview of the pages, routes, global shell overlays, component hierarchy, and data structures of this portfolio website. The application is built using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **GSAP** for high-fidelity interactive motion and animations.

---

## Table of Contents
1. [Global Layout & Shell Architecture](#global-layout--shell-architecture)
2. [Route & Page Directory](#route--page-directory)
3. [Page Summaries](#page-summaries)
    - [1. Home / Landing Page (`/`)](#1-home--landing-page-)
    - [2. About Page (`/about`)](#2-about-page-about)
    - [3. Work Page (`/work`) — Active Nav Route](#3-work-page-work--active-nav-route)
    - [4. Experience Page (`/experience`)](#4-experience-page-experience)
    - [5. Projects List Page (`/projects`)](#5-projects-list-page-projects)
    - [6. Project Detail Page (`/projects/[slug]`)](#6-project-detail-page-projectsslug)
    - [7. Now Page (`/now`)](#7-now-page-now)
    - [8. Uses Page (`/uses`)](#8-uses-page-uses)
    - [9. Contact Page (`/contact`)](#9-contact-page-contact)
4. [Global Layout & Overlay Components](#global-layout--overlay-components)
5. [Data & Content Architecture](#data--content-architecture)
6. [Design System & Animation Architecture](#design-system--animation-architecture)

---

## Global Layout & Shell Architecture

Every page on this site is wrapped inside a persistent root layout ([`src/app/layout.tsx`](file:portfolio-site/src/app/layout.tsx)) that manages global overlays, smooth scrolling, fixed navigation, and footers. The site operates exclusively in dark mode with a default background of `#070d1a` (deep navy).

### Root Shell Structure ([`src/app/layout.tsx`](file:portfolio-site/src/app/layout.tsx))
```tsx
<html lang="en" style={{ background: "#070d1a" }}>
  <body style={{ background: "#070d1a" }}>
    {/* Global overlay stack (highest z-index first) */}
    <LoadingScreen />   {/* z-9999: Curtain split loader & 0-100% counter */}
    <CursorGlow />     {/* z-9998: Ambient mouse-following spotlight */}
    <NoiseOverlay />   {/* z-9997: Film grain noise texture */}

    {/* Page chrome */}
    <SmoothScrolling>   {/* Lenis smooth scrolling wrapper */}
      <Nav />           {/* Fixed top navigation bar */}
      {children}        {/* Active route page content */}
      <Footer />        {/* Persistent bottom footer */}
    </SmoothScrolling>
  </body>
</html>
```

---

## Route & Page Directory

The application routes correspond to subdirectories under `src/app/`:

| Route Path | App Router File | Nav Label | Purpose | Data Source |
| :--- | :--- | :--- | :--- | :--- |
| `/` | [`src/app/page.tsx`](file:portfolio-site/src/app/page.tsx) | `MRL` | Home / Interactive Landing | `siteContent.hero`, `projectsData`, `siteContent.about`, `siteContent.contact` |
| `/projects` | [`src/app/projects/page.tsx`](file:portfolio-site/src/app/projects/page.tsx) | `Projects` | Full Portfolio & Research Catalog | `projectsData` |
| `/projects/[slug]` | [`src/app/projects/[slug]/page.tsx`](file:portfolio-site/src/app/projects/%5Bslug%5D/page.tsx) | — | Individual Project Case Study | `projectsData` (filtered by slug) |
| `/work` | [`src/app/work/page.tsx`](file:portfolio-site/src/app/work/page.tsx) | `Work` | Primary Career & Internship Showcase | `experienceData` |
| `/experience` | [`src/app/experience/page.tsx`](file:portfolio-site/src/app/experience/page.tsx) | — | Alternate Component-Based Resume View | `experienceData` |
| `/about` | [`src/app/about/page.tsx`](file:portfolio-site/src/app/about/page.tsx) | — | Detailed Bio, Capabilities & Metrics | `siteContent.about` |
| `/now` | [`src/app/now/page.tsx`](file:portfolio-site/src/app/now/page.tsx) | `Now` | Current Focus, Graduation & Projects | Static React JSX |
| `/uses` | [`src/app/uses/page.tsx`](file:portfolio-site/src/app/uses/page.tsx) | `Uses` | Gear, Hardware, Software & Dev Stack | Inline Dataset Constants |
| `/contact` | [`src/app/contact/page.tsx`](file:portfolio-site/src/app/contact/page.tsx) | `Available for work` | Direct Email & Social Channels | `siteContent.contact` |

---

## Page Summaries

### 1. Home / Landing Page (`/`)
* **File Path:** [`src/app/page.tsx`](file:portfolio-site/src/app/page.tsx)
* **Metadata Title:** `Mario Richie Lim | Software Engineer`
* **Use/Purpose:**
  The main entry point designed as an immersive cinematic experience introducing Mario Richie Lim, showcasing selected work snippets, a quick bio summary, and direct contact CTAs.
* **Component Stack:**
  1. [`HeroLandingScene`](file:portfolio-site/src/components/sections/hero-landing-scene.tsx): Full-height (`100vh`) animated intro section featuring interactive spotlight elements, staggered text reveals, dynamic headline switching, and high-fidelity motion graphics.
  2. [`Work`](file:portfolio-site/src/components/sections/work.tsx): Displays featured engineering projects from `projectsData` with hover scale effects.
  3. [`About`](file:portfolio-site/src/components/sections/about.tsx): Highlights core engineering capabilities, metric counters, and bio synopsis.
  4. [`Contact`](file:portfolio-site/src/components/sections/contact.tsx): Actionable call-to-action section linking to email and social channels.

### 2. About Page (`/about`)
* **File Path:** [`src/app/about/page.tsx`](file:portfolio-site/src/app/about/page.tsx)
* **Metadata Title:** `About | Mario Richie Lim`
* **Use/Purpose:**
  Provides an in-depth summary of Mario's technical background, design philosophy, core technical skill set, and quantitative career achievements.
* **Content Breakdown:**
  * **Bio Summary:** Full-stack development philosophy combining modern front-end frameworks (React, React Native, Tailwind) with robust backends (Laravel, Node.js, Supabase, PostgreSQL).
  * **Capabilities Grid:** Pill badges displaying core competencies (*React & TypeScript*, *React Native & Expo*, *Laravel & PHP*, *PostgreSQL & Supabase*, *UI/UX & Figma*, *AI & Automation*).
  * **"By the Numbers" Grid:** Highlighted quantitative stats:
    * `2` Professional internships
    * `8+` Projects completed
    * `940` TOEIC English score
    * `100%` Hands-on code
* **Data Source:** `siteContent.about` in [`src/lib/content/site.ts`](file:portfolio-site/src/lib/content/site.ts).

### 3. Work Page (`/work`) — Active Nav Route
* **File Path:** [`src/app/work/page.tsx`](file:portfolio-site/src/app/work/page.tsx)
* **Metadata Title:** `Work | Mario Richie Lim`
* **Use/Purpose:**
  The primary career history page linked directly in the navigation menu (`Nav.tsx`). It presents past professional roles, corporate internships, key technical contributions, and tech tags in a modern dark glassmorphic card format.
* **Content Breakdown:**
  * **Page Header:** Styled gradient headline ("Work.") with back-link to home and subtitle from `experienceData.subtitle`.
  * **Role Cards:** Iterates over `experienceData.items`:
    * **Index Badges:** Monospaced numerical badges (`01`, `02`) with custom cyan/amber border accents.
    * **Company & Role:** Role title, company name, and date period badge (`September 2025 – January 2026`, `February 2025 – August 2025`).
    * **Bullet Point Descriptions:** Detailed breakdown of achievements (e.g. Scriptcase + PostgreSQL construction platform, Laravel resource management, real-time multiplayer Socket.IO app).
    * **Tech Tag Badges:** Pill indicators for technology stacks.
  * **Contact Call-Out:** Bottom banner encouraging collaboration with direct mailto link.
* **Data Source:** `experienceData` in [`src/lib/data/experience.ts`](file:portfolio-site/src/lib/data/experience.ts).

### 4. Experience Page (`/experience`)
* **File Path:** [`src/app/experience/page.tsx`](file:portfolio-site/src/app/experience/page.tsx)
* **Metadata Title:** `Experience | Mario Richie Lim`
* **Use/Purpose:**
  An alternate, componentized digital resume view rendering experience items via the reusable [`ExperienceItem`](file:portfolio-site/src/components/experience/experience-item.tsx) component.
* **Key Subcomponents:**
  * [`ExperienceItem`](file:portfolio-site/src/components/experience/experience-item.tsx): Modular component displaying company metadata, period tags, bullet achievements, tech badges, and optional image folder mockups.
* **Data Source:** `experienceData` in [`src/lib/data/experience.ts`](file:portfolio-site/src/lib/data/experience.ts).

### 5. Projects List Page (`/projects`)
* **File Path:** [`src/app/projects/page.tsx`](file:portfolio-site/src/app/projects/page.tsx)
* **Metadata Title:** `Projects | Mario Richie Lim`
* **Use/Purpose:**
  A comprehensive showcase cataloging all engineering, mobile app, and research projects completed by Mario.
* **Content Breakdown:**
  * Responsive grid displaying project cards for all items in `projectsData.items` (e.g., Bazaarku Event Platform, LearnMuse AI Educator, ML Drug Discovery Pipeline, NusaVision Freelance Hub, PPOB Payment Prototype, FamilyTask Android App, Dansons, SMP Mater Dei E-Learning, KicksAtrium).
* **Key Subcomponents:**
  * [`ProjectCard`](file:portfolio-site/src/components/project/project-card.tsx): Interactive card component with hover image scaling, tag badges, year metadata, and slug route navigation.
* **Data Source:** `projectsData` in [`src/lib/data/projects.ts`](file:portfolio-site/src/lib/data/projects.ts).

### 6. Project Detail Page (`/projects/[slug]`)
* **File Path:** [`src/app/projects/[slug]/page.tsx`](file:portfolio-site/src/app/projects/%5Bslug%5D/page.tsx)
* **Metadata Title:** `[Project Title] | Mario Richie Lim` (Dynamic)
* **Use/Purpose:**
  A dynamic static-site-generated (SSG) route rendering full technical case studies for each individual project. Utilizes Next.js `generateStaticParams()` to pre-render all project slugs at build time.
* **Content Breakdown:**
  * **Header Metadata:** Year, role, title, summary, and back navigation.
  * **Tech Stack Badges:** Visual tags indicating technologies used.
  * **Case Study Narrative:** Multi-paragraph deep dive into problem statements, architectural solutions, and outcomes.
  * **External Links / Call to Action:** Production URLs or code repository links.
* **Data Source:** `projectsData` in [`src/lib/data/projects.ts`](file:portfolio-site/src/lib/data/projects.ts) (looked up via slug matching).

### 7. Now Page (`/now`)
* **File Path:** [`src/app/now/page.tsx`](file:portfolio-site/src/app/now/page.tsx)
* **Metadata Title:** `Now | Mario Richie Lim`
* **Use/Purpose:**
  Inspired by Derek Sivers' "Now Page" initiative, this page provides a real-time status update on Mario's current activities, thesis, personal projects, and pursuits.
* **Content Breakdown (4 Cards):**
  1. **Education & Graduation:** Undergraduate degree completed, graduating October 3rd, 2026. Thesis details on ML Drug-Target Interaction (DTI) predictions for lung cancer therapies.
  2. **Development Work:** Building an intelligent mobile finance tracker app using **Flutter** & **Dart**.
  3. **Focus & Career:** Reading AI research (prompt engineering, model architectures) and seeking full-time full-stack/AI roles.
  4. **Life & Hobbies:** Located in Jakarta, Indonesia; enjoying badminton matches.
* **Data Source:** Inline React component layout.

### 8. Uses Page (`/uses`)
* **File Path:** [`src/app/uses/page.tsx`](file:portfolio-site/src/app/uses/page.tsx)
* **Metadata Title:** `Uses | Mario Richie Lim`
* **Use/Purpose:**
  A curated directory of hardware gear, software tools, applications, and technical stacks utilized daily.
* **Content Categories (`UseCategory`):**
  * **Hardware Setup:** MacBook Pro 13" Early 2015 (macOS Monterey, 8GB RAM), built-in trackpad (no mouse), built-in Retina screen (no external monitor).
  * **Software & Utilities:** VS Code & Antigravity IDE, Figma, DBeaver, Git & GitHub, Make.com + Telegram Bot (automated expense tracker into Notion via Gemini API), Google AI Pro.
  * **Languages & Stack:** React, React Native (Expo), TypeScript, Laravel (PHP), Node.js, PostgreSQL, MySQL, Supabase, Tailwind CSS, Vue, Kotlin, Scriptcase.
* **Data Source:** Component constant datasets (`hardware`, `software`, `devStack`).

### 9. Contact Page (`/contact`)
* **File Path:** [`src/app/contact/page.tsx`](file:portfolio-site/src/app/contact/page.tsx)
* **Metadata Title:** `Contact | Mario Richie Lim`
* **Use/Purpose:**
  A dedicated portal designed to capture freelance inquiries, job opportunities, and networking outreach.
* **Content Breakdown:**
  * **Heading:** Typography display ("Let's build something worth looking at.").
  * **Email Link:** Direct mailto link (`mario.richie.lim@gmail.com`).
  * **Social Links:** Custom inline SVG icons and external links for **Instagram**, **Github**, and **LinkedIn**.
* **Data Source:** `siteContent.contact` in [`src/lib/content/site.ts`](file:portfolio-site/src/lib/content/site.ts).

---

## Global Layout & Overlay Components

The application shell includes 6 core persistent layout components located in `src/components/layout/`:

1. [`LoadingScreen`](file:portfolio-site/src/components/layout/LoadingScreen.tsx):
   * **Location:** Mounted at root (`layout.tsx`), `z-[9999]`.
   * **Functionality:** A curtain-split loading screen that blocks first paint, animates a monospaced percentage counter from `0` to `100%` in sync with a gradient progress line, then splits top and bottom curtains vertically via GSAP `power4.inOut` ease to reveal the page. Body scrolling is locked during load and unlocked upon completion. Respects `prefers-reduced-motion`.
2. [`CursorGlow`](file:portfolio-site/src/components/layout/CursorGlow.tsx):
   * **Location:** Mounted at root (`layout.tsx`), `z-[9998]`.
   * **Functionality:** Tracks mouse coordinates and renders a smooth radial ambient spotlight glow following the user's cursor across dark page surfaces.
3. [`NoiseOverlay`](file:portfolio-site/src/components/layout/NoiseOverlay.tsx):
   * **Location:** Mounted at root (`layout.tsx`), `z-[9997]`.
   * **Functionality:** Renders a subtle SVG film grain noise texture across the viewport to enhance cinematic depth.
4. [`SmoothScrolling`](file:portfolio-site/src/components/layout/smooth-scrolling.tsx):
   * **Location:** Wraps main page content in `layout.tsx`.
   * **Functionality:** Implements inertia smooth scrolling powered by `@studio-freight/lenis`.
5. [`Nav`](file:portfolio-site/src/components/layout/Nav.tsx):
   * **Location:** Mounted fixed at top, `z-50`.
   * **Functionality:** Fixed navigation header. Monitors scroll position (>24px) to dynamically toggle a frosted glass backdrop (`backdrop-filter: blur(18px)`). Displays brand pill ("MRL"), desktop link pill (`/projects`, `/work`, `/now`, `/uses`), and active status CTA ("Available for work" with green pulsing dot).
6. [`Footer`](file:portfolio-site/src/components/layout/Footer.tsx):
   * **Location:** Mounted at the bottom of every page.
   * **Functionality:** Displays copyright notice, location ("Jakarta"), and email link.

---

## Data & Content Architecture

All static text, projects, and work histories are decoupled from presentation components and stored in `src/lib/`:

### 1. [`src/lib/content/site.ts`](file:portfolio-site/src/lib/content/site.ts)
Contains site-wide configuration objects (`siteContent`):
* `siteContent.nav`: Monogram labels, full name, availability status, and navigation link items (`/projects`, `/work`, `/now`, `/uses`).
* `siteContent.hero`: Hero text copy, portrait image path (`/assets/images/portrait.jpg`), spotlight copy.
* `siteContent.about`: Bio copy, capabilities array, metric counters.
* `siteContent.marquee`: Dynamic ticker words (*Interfaces*, *Systems*, *Motion*, *Typography*, *Craft*).
* `siteContent.contact`: Contact heading, email address, social links array.

### 2. [`src/lib/data/experience.ts`](file:portfolio-site/src/lib/data/experience.ts)
Exports `experienceData` matching the `ExperienceItem` interface:
* **`company`**: Organization name (e.g. *PT. Bonumata Asia*, *PT. Nusantara Compnet Integrator*).
* **`role`**: Internship/job title.
* **`period`**: Date range strings.
* **`description`**: Array of bullet achievement points.
* **`tags`**: Skill and technology badges.
* **`imageFolder`**: Path to screenshot assets.

### 3. [`src/lib/data/projects.ts`](file:portfolio-site/src/lib/data/projects.ts)
Exports `projectsData` containing an array of `Project` objects (9 total):
* **Fields:** `title`, `year`, `role`, `imageFolder`, `alt`, `summary`, `description`, `tags`, `link`.
* **Projects Included:**
  1. *Bazaarku Event Platform* (React, Supabase, PostgreSQL)
  2. *LearnMuse AI Educator* (React, Gemini API, Manim, Azure TTS)
  3. *ML Drug Discovery Pipeline* (Python, XGBoost, LightGBM, Cheminformatics)
  4. *NusaVision Freelance Hub* (React, Firebase, Tailwind CSS)
  5. *PPOB Payment Prototype* (React Native, Expo, TypeScript)
  6. *FamilyTask: Android To-Do App* (Kotlin, Android SDK, WorkManager)
  7. *Dansons: Real-Time Dance App* (Figma, UI/UX Design, Usability Testing)
  8. *SMP Mater Dei E-Learning Platform* (React, Laravel, Node.js, MySQL)
  9. *KicksAtrium Sneaker E-commerce* (React, Tailwind CSS, REST APIs)

---

## Design System & Animation Architecture

* **Theme:** Cool gray & charcoal blue dark mode UI (`#111827` charcoal background, `#F9FAFB` cool white headings, `#E5E7EB` light gray accents, `#9CA3AF` slate gray text).
* **Typography:** Modern variable sans fonts (`Bricolage Grotesque`, `DM Sans`, monospaced numerical variants).
* **Motion Engine:** Powered by **GSAP** (GreenSock Animation Platform) for staggered timeline entrances, loading screen curtain splits, spotlight positioning, and Lenis smooth scrolling.
