export type PortfolioPageData = {
  slug: string;
  navLabel: string;
  kicker: string;
  title: string;
  intro: string;
  color: "red" | "blue" | "gold" | "purple";
  cards: {
    title: string;
    meta: string;
    badge: string;
    description: string;
    tags: string[];
    wide?: boolean;
    accent?: boolean;
  }[];
};

export const pages: Record<string, PortfolioPageData> = {
  about: {
    slug: "about",
    navLabel: "About me",
    kicker: "Bottom-left finish",
    title: "The player behind the pixels.",
    intro:
      "I’m Alex, a product-minded developer who likes turning ambitious ideas into clear, useful, and memorable digital experiences.",
    color: "red",
    cards: [
      {
        title: "My game",
        meta: "Based in New York",
        badge: "Profile",
        description:
          "I work at the intersection of design and engineering. My favorite projects begin with a fuzzy problem and end with something people genuinely enjoy using.",
        tags: ["Product thinking", "UI engineering", "Prototyping"],
        wide: true,
        accent: true,
      },
      {
        title: "What I value",
        meta: "Principles",
        badge: "01",
        description:
          "Clarity over cleverness, momentum over perfection, and details that reward attention. I care about accessible interfaces and resilient systems.",
        tags: ["Craft", "Empathy", "Ownership"],
      },
      {
        title: "Currently",
        meta: "Summer 2026",
        badge: "02",
        description:
          "Exploring playful interaction design, sharpening my full-stack toolkit, and looking for a team that cares equally about product quality and technical depth.",
        tags: ["Open to work", "Learning in public"],
      },
    ],
  },
  experience: {
    slug: "experience",
    navLabel: "Experience",
    kicker: "Top-left finish",
    title: "Seasons of shipping.",
    intro:
      "A sample career timeline focused on building thoughtful products, leading projects, and making teams faster.",
    color: "blue",
    cards: [
      {
        title: "Senior Product Engineer",
        meta: "Northstar Labs · 2024—Now",
        badge: "Current",
        description:
          "Lead front-end architecture for a collaborative analytics product. Shipped a new design system, reduced key workflow time, and mentored two engineers.",
        tags: ["React", "TypeScript", "Node.js", "Design systems"],
        wide: true,
        accent: true,
      },
      {
        title: "Software Engineer",
        meta: "Studio Meridian · 2022—2024",
        badge: "02",
        description:
          "Partnered with designers to build polished web experiences for early-stage companies, from clickable prototype through production launch.",
        tags: ["Next.js", "Motion", "APIs"],
      },
      {
        title: "Frontend Developer",
        meta: "Fieldwork Digital · 2020—2022",
        badge: "01",
        description:
          "Built responsive campaign sites and internal tools while improving accessibility, reusable components, and release confidence.",
        tags: ["JavaScript", "CSS", "Accessibility"],
      },
    ],
  },
  projects: {
    slug: "projects",
    navLabel: "Projects",
    kicker: "Top-right finish",
    title: "Selected match highlights.",
    intro:
      "A few example builds that balance strong product thinking, technical execution, and an eye for the delightful details.",
    color: "gold",
    cards: [
      {
        title: "Atlas",
        meta: "Productivity · 2026",
        badge: "Featured",
        description:
          "A spatial planning tool that helps distributed teams turn messy research into an actionable product roadmap.",
        tags: ["Next.js", "Postgres", "Realtime", "AI"],
        wide: true,
        accent: true,
      },
      {
        title: "Tempo",
        meta: "Mobile companion · 2025",
        badge: "02",
        description:
          "A calm habit tracker designed around flexible streaks, meaningful reflection, and beautifully restrained data visualization.",
        tags: ["React Native", "Expo", "SQLite"],
      },
      {
        title: "Local XI",
        meta: "Community platform · 2024",
        badge: "01",
        description:
          "A lightweight platform that helps amateur soccer clubs organize pickup games, manage RSVPs, and find nearby players.",
        tags: ["TypeScript", "Maps", "PWA"],
      },
      {
        title: "This portfolio",
        meta: "Interactive web · 2026",
        badge: "Meta",
        description:
          "A playable portfolio that turns site navigation into a penalty shootout—built with responsive CSS pixel art and accessible controls.",
        tags: ["React", "CSS animation", "Creative dev"],
        wide: true,
      },
    ],
  },
  hobbies: {
    slug: "hobbies",
    navLabel: "Off the pitch",
    kicker: "Bottom-right finish",
    title: "Life beyond the laptop.",
    intro:
      "Good work needs a bigger world around it. These are a few things that keep me curious, competitive, and recharged.",
    color: "purple",
    cards: [
      {
        title: "Sunday league",
        meta: "Center midfield",
        badge: "90 mins",
        description:
          "Equal parts exercise, tactics, and an excuse to spend Sunday morning outside. I’m much better at through balls than penalties.",
        tags: ["Soccer", "Team sport", "Coffee after"],
        wide: true,
        accent: true,
      },
      {
        title: "Street photography",
        meta: "35mm + digital",
        badge: "01",
        description:
          "Chasing interesting light, candid geometry, and small stories hiding in ordinary city blocks.",
        tags: ["Photography", "Walking", "Visual stories"],
      },
      {
        title: "Cooking",
        meta: "No recipe survived",
        badge: "02",
        description:
          "Experimenting with hand-pulled noodles, overly ambitious weekend sauces, and the perfect match-day sandwich.",
        tags: ["Food", "Iteration", "Hosting"],
      },
      {
        title: "Indie games",
        meta: "Player one",
        badge: "03",
        description:
          "I love compact games with distinctive systems and art direction—the same constraints that often produce the best digital products.",
        tags: ["Game design", "Pixel art", "Storytelling"],
        wide: true,
      },
    ],
  },
};
