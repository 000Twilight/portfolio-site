export interface Project {
  title: string;
  year: string;
  role: string;
  imageFolder: string;
  alt: string;
  summary: string;
  description: string;
  tags: string[];
  link: string;
}

export const projectsData = {
  title: "Projects",
  subtitle: "Selected Engineering & Research Work",
  items: [
    {
      title: "Bazaarku Event Platform",
      year: "2025",
      role: "Full-Stack Developer",
      imageFolder: "/assets/images/projects/bazaarku",
      alt: "Event management dashboard and vendor approval workflow",
      summary: "A multi-tenant event management platform featuring complex role-based access control and automated booth approval workflows.",
      description: "Architected and developed a comprehensive event management platform for a freelance client, designed to connect event organizers, vendors, and UMKM (Micro, Small, and Medium Enterprises). The core technical challenge was designing a highly normalized relational database schema in Supabase (PostgreSQL) to handle multi-tier Role-Based Access Control (RBAC). \n\nI implemented a complex state machine for booth approvals, ensuring that UMKM users could seamlessly apply for spaces while vendors and admins maintained strict oversight. The frontend was built with React, focusing on a responsive, intuitive UI that simplifies complex data entry. By leveraging Supabase's real-time capabilities, the platform provides instant notifications for application status updates, significantly reducing manual coordination overhead.",
      tags: ["React", "Supabase", "PostgreSQL", "TypeScript", "System Design"],
      link: "#"
    },
    {
      title: "LearnMuse AI Educator",
      year: "2025",
      role: "Full-Stack & AI Engineer",
      imageFolder: "/assets/images/projects/learnmuse",
      alt: "AI lesson plan interface with animated math explanations",
      summary: "An AI-driven educational platform built in a 30-hour hackathon, featuring dynamic lesson generation and animated math explanations.",
      description: "Engineered a full-stack AI educational platform under the intense pressure of a 30-hour hackathon. The application leverages React for a highly interactive frontend and Node.js/Express.js for a robust backend, with Supabase handling authentication and data persistence. \n\nThe standout feature is the multimodal AI pipeline: I integrated the Google Gemini API to dynamically generate structured, multi-language lesson plans and quizzes tailored to student proficiency. To address the difficulty of teaching complex mathematics, I built a custom rendering pipeline that takes the AI's output, passes it to Manim to generate programmatic animations, and syncs it with Azure Text-to-Speech for natural narration.",
      tags: ["React", "Node.js", "Gemini API", "Manim", "Azure TTS", "Supabase"],
      link: "#"
    },
    {
      title: "ML Drug Discovery Pipeline",
      year: "2025 - 2026",
      role: "Lead ML Researcher",
      imageFolder: "/assets/images/projects/ml-drug-discovery",
      alt: "Molecular data visualization and model performance metrics",
      summary: "Undergraduate thesis research utilizing ensemble machine learning to predict drug-target interactions for lung cancer therapies.",
      description: "Spearheaded an end-to-end machine learning pipeline to predict drug-target interactions (DTI) for lung cancer therapies, focusing on natural compounds derived from Indonesian herbs. \n\nI engineered a data preprocessing workflow using cheminformatics tools to parse complex molecular structures from the KNApSAcK database, converting them into machine-readable fingerprints and features. For the predictive modeling, I trained, hyperparameter-tuned, and rigorously evaluated multiple ensemble models, including XGBoost, Random Forest, LightGBM, and Cascade Deep Forest. The research focuses on optimizing metrics like AUPRC to establish a robust baseline for identifying high-potential therapeutic candidates.",
      tags: ["Python", "XGBoost", "LightGBM", "Cheminformatics", "Data Engineering"],
      link: "#"
    },
    {
      title: "NusaVision Freelance Hub",
      year: "2024 - 2025",
      role: "Frontend Developer",
      imageFolder: "/assets/images/projects/nusavision",
      alt: "Freelance marketplace UI with authentication and chatbot",
      summary: "A paid client project delivering a robust, secure frontend for a freelance marketplace with integrated AI support.",
      description: "Served as the lead frontend developer for a paid client project, tasked with bringing the NusaVision freelance marketplace to life. The primary objective was to deliver a highly polished, production-ready UI/UX that instills trust and facilitates seamless transactions. \n\nI implemented secure, frictionless user authentication using Google Firebase. A key feature of the project was the integration of a static AI chatbot designed to handle common user queries, reducing the support burden on the client's team. I collaborated closely with cross-functional teams to ensure application stability, optimize load times, and maintain pixel-perfect responsiveness.",
      tags: ["React", "Firebase", "Tailwind CSS", "UI/UX", "Chatbot Integration"],
      link: "#"
    },
    {
      title: "PPOB Payment Prototype",
      year: "2024",
      role: "Sole Mobile Developer",
      imageFolder: "/assets/images/projects/ppob",
      alt: "PPOB mobile payment app interface",
      summary: "A cross-platform mobile payment prototype handling complex transaction logic for utilities and digital goods.",
      description: "Designed and developed a comprehensive prototype for a Payment Point Online Bank (PPOB) hybrid application using React Native and Expo. As the sole developer, I was responsible for the entire mobile lifecycle, from UI implementation to complex state management. \n\nThe application features secure transaction logic for a variety of services, including electricity token purchases, mobile phone credit top-ups, and health assurance payments. I implemented a robust local state management solution to handle multi-step checkout flows, ensuring data integrity and a smooth user experience, alongside a detailed transaction history module.",
      tags: ["React Native", "Expo", "TypeScript", "State Management", "Mobile UI"],
      link: "#"
    },
    {
      title: "FamilyTask: Android To-Do App",
      year: "2024 - 2025",
      role: "Full-Stack Mobile Developer",
      imageFolder: "/assets/images/projects/familytask-android",
      alt: "Android app interface showing parent-child task assignment and reminder settings",
      summary: "A native Android application designed to synchronize tasks between parents and children, featuring role-based access and automated local reminders.",
      description: "Engineered a native Android application tailored for family task management, specifically designed to bridge the communication gap between parents and children through shared digital to-do lists. The core technical challenge was architecting a flexible data model that seamlessly supports both independent single-user modes and interconnected parent-child modes. \n\nUtilizing Kotlin and modern Android development practices, I built a robust local database for offline-first task creation. To justify the full-stack nature of the app, I integrated a backend service to handle cross-device synchronization, ensuring that when a parent assigns a chore, it instantly reflects on the child's device. Furthermore, I implemented Android's WorkManager to handle background processes, enabling precise, battery-efficient local reminders for upcoming deadlines without draining the device's resources.",
      tags: ["Kotlin", "Android SDK", "WorkManager", "Mobile Architecture", "REST APIs"],
      link: "#"
    },
    {
      title: "Dansons: Real-Time Dance App",
      year: "2024",
      role: "Lead UI/UX Designer",
      imageFolder: "/assets/images/projects/dansons",
      alt: "Mobile app interface for real-time dance matching with intuitive navigation",
      summary: "A mobile application featuring innovative real-time dance matching, validated through user testing with an 85% satisfaction rate.",
      description: "Led the end-to-end UI/UX design for a mobile application that connects dancers in real-time, enabling spontaneous collaboration and practice sessions. The core innovation was designing an intuitive interface for the real-time dance matching feature, which required balancing complex location-based logic with a frictionless user experience. \n\nI spearheaded the design of 70% of the application using Figma, conducting extensive user research and iterative prototyping to ensure the interface felt natural for dancers on the go. The design process involved creating detailed user flows, wireframes, and high-fidelity prototypes, followed by rigorous usability testing. I conducted campus trials with peer testers, gathering quantitative and qualitative feedback to refine the interface. The final design achieved an 85% satisfaction rate, validating the user-centered approach and demonstrating the ability to translate complex technical features into delightful, accessible user experiences.",
      tags: ["Figma", "UI/UX Design", "User Research", "Prototyping", "Usability Testing"],
      link: "#"
    },
    {
      title: "SMP Mater Dei E-Learning Platform",
      year: "2023",
      role: "Full-Stack Developer",
      imageFolder: "/assets/images/projects/mater-dei-elearning",
      alt: "Interactive academic calendar and e-learning dashboard",
      summary: "A full-stack e-learning prototype featuring a custom interactive calendar for managing academic schedules, events, and homework deadlines.",
      description: "Developed a comprehensive, full-stack e-learning platform prototype tailored for SMP Mater Dei School Pamulang to digitize and streamline academic management. The core challenge was designing an intuitive, centralized system for students and teachers to track academic progress without feeling overwhelmed by cluttered interfaces. \n\nI engineered a highly interactive calendar feature using React and Tailwind CSS, allowing users to seamlessly view, filter, and manage class schedules, school events, and homework deadlines. On the backend, I utilized Laravel (PHP) and Node.js to build robust RESTful APIs, backed by a MySQL database to ensure reliable data persistence and efficient querying of complex relational academic data. This project honed my ability to bridge highly interactive frontend components with secure, scalable backend architecture.",
      tags: ["React", "Laravel", "Node.js", "MySQL", "Tailwind CSS"],
      link: "#"
    },
    {
      title: "KicksAtrium Sneaker E-commerce",
      year: "2023",
      role: "Lead Front-end Developer",
      imageFolder: "/assets/images/projects/kicksatrium",
      alt: "Sneaker e-commerce storefront with real-time search",
      summary: "A high-performance, frontend-only e-commerce prototype integrating multiple APIs for dynamic product fetching.",
      description: "Built a high-fidelity, frontend-only e-commerce prototype for a premium sneaker marketplace. The technical focus of this project was on performance optimization and complex data fetching strategies. \n\nI successfully integrated 5 distinct external REST APIs to dynamically source product data, pricing, and inventory status. To handle the influx of data, I implemented advanced debouncing and caching mechanisms for the real-time search and filtering features, ensuring the UI remained highly responsive even with large datasets.",
      tags: ["React", "Tailwind CSS", "REST APIs", "JavaScript", "Performance Optimization"],
      link: "#"
    }
  ] as Project[],
};
