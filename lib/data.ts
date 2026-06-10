/**
 * lib/data.ts
 * -------------------------------------------------------------------------
 * Single source of truth for ALL portfolio content.
 *
 * Everything rendered on the page is derived from the objects below, so
 * updating your portfolio never means touching JSX — you edit this file only.
 *
 * Honesty guardrails (intentional):
 *  - No invented "years of experience" or fabricated metrics.
 *  - AI tooling is listed under "exploring", not "expert".
 *  - Project links only point to URLs that actually exist.
 * -------------------------------------------------------------------------
 */

export type NavItem = {
  label: string;
  href: string; // in-page anchor, e.g. "#projects"
};

export type DnaTier = {
  /** Tier name, e.g. "Build with daily". */
  label: string;
  /** One-line framing of what this tier means. */
  caption: string;
  /** Visual weight: core = strongest, learning = honestly in-progress. */
  level: "core" | "reach" | "learning";
  items: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
  kind: "live" | "repo";
};

export type Project = {
  name: string;
  tagline: string;
  domain: "Full-Stack" | "AI Engineering";
  role: string;
  status: "live" | "in-progress";
  /** One-line overview shown under the title. */
  summary: string;
  /** Why the project exists / what it solves — sets up the story. */
  problem: string;
  /** Concrete things actually built. Keep honest & verifiable. */
  highlights: string[];
  /** "How it works" data-flow, rendered as a connected step strip. */
  flow: string[];
  /** Honest, learning-oriented takeaway. */
  learnings: string;
  stack: string[];
  links: ProjectLink[];
  accent: "indigo" | "cyan";
};

export type Interest = {
  title: string;
  description: string;
};

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

/**
 * "Behind the scenes" build notes — powers the live architecture inspector.
 * Each entry maps to a section id on the page and describes how that section
 * is ACTUALLY implemented. Keep these truthful: it's a self-documenting tour
 * of the real stack, not marketing.
 */
export type BuildNote = {
  /** Matches the section's DOM id (e.g. "projects"). */
  id: string;
  label: string;
  /** "server" | "client" — rendered as a small badge. */
  kind: "server" | "client";
  notes: string[];
};

export const profile = {
  name: "Anubhuti Mishra",
  initials: "AM",
  roles: ["Full-Stack Developer", "AI Engineering Enthusiast"],
  // Short, used near the hero.
  headline:
    "I build full-stack web apps — from data model to deployed UI — and I'm learning to engineer with AI.",
  // Secondary positioning line shown beneath the headline.
  subline:
    "Comfortable across the stack with React, Next.js and Node.js; currently going deep on AI engineering with local LLMs.",
  // Compact tech row in the hero — signals the stack at a glance.
  heroStack: ["React", "Next.js", "Node.js", "Express", "PostgreSQL", "Ollama"],
  // Longer narrative for the About section (kept honest, no inflated claims).
  about: [
    "I'm a full-stack developer who enjoys taking an idea from an empty file all the way to something people can actually use. Most of my work lives in the JavaScript ecosystem — React and Next.js on the front end, Node.js and Express on the back end, with MongoDB or PostgreSQL behind them.",
    "Right now I'm deliberately pointing that curiosity at AI engineering: experimenting with local LLMs through Ollama, learning how prompt design changes results, and thinking about what privacy-first AI products could look like. I treat side projects as my lab — a place to break things and understand why.",
    "I care about the details that make software feel considered: clean component boundaries, readable code, and interfaces that don't make people think too hard.",
  ],
  email: "mishraanu383@gmail.com",
  // Résumé lives in /public, so it's served from the site root.
  resumeUrl: "/Resume.pdf",
  resumeNote: "Open to full-stack & AI-adjacent roles.",
  // Contact section signals (kept honest — adjust if your situation changes).
  availability: "Open to internships, full-time & freelance",
  responseNote: "I read every message and usually reply within a day.",
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Interests", href: "#interests" },
  { label: "Contact", href: "#contact" },
];

// "Developer DNA" — tiers framed by honesty, not proficiency bars.
// NOTE FOR ANUBHUTI: adjust which tools sit in each tier so it matches how
// you actually work. The tiers are a self-assessment, so they should be true.
export const developerDna: DnaTier[] = [
  {
    label: "Build with daily",
    caption: "My default toolkit — what I reach for without thinking.",
    level: "core",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Express", "Tailwind CSS"],
  },
  {
    label: "Reach for when needed",
    caption: "Comfortable and productive, used as the problem calls for it.",
    level: "reach",
    items: ["MongoDB", "PostgreSQL", "Git"],
  },
  {
    label: "Actively learning",
    caption: "Where my curiosity is pointed right now.",
    level: "learning",
    items: ["Local LLMs (Ollama)", "Prompt engineering", "AI product thinking"],
  },
];

// NOTE FOR ANUBHUTI: the `highlights`, `flow`, and `learnings` below are
// drawn from your project descriptions. They read as honest engineering
// detail — but please VERIFY each line against what you actually shipped and
// trim anything that wasn't implemented. Add repo links when public.
export const projects: Project[] = [
  {
    name: "Wanderlust",
    tagline: "Full-stack travel accommodation platform",
    domain: "Full-Stack",
    role: "Solo full-stack build",
    status: "live",
    summary:
      "An Airbnb-inspired platform for browsing and listing travel stays — a complete end-to-end product, not a UI mock.",
    problem:
      "I wanted to build something real rather than another front-end demo: an app with authentication, persistent data, and file uploads all wired together and actually deployed.",
    highlights: [
      "User authentication with protected, owner-only actions",
      "Full CRUD for listings, persisted in MongoDB via Mongoose",
      "Image uploads streamed to Cloudinary instead of the app server",
      "RESTful routes organised in an MVC structure with reusable middleware",
      "Deployed publicly on Render with a managed MongoDB instance",
    ],
    flow: ["Client", "Express API (MVC)", "Mongoose models", "MongoDB", "Cloudinary (media)"],
    learnings:
      "Wiring auth, a database, and a third-party media service together taught me more about real backend trade-offs — validation, error handling, env config — than any tutorial could.",
    stack: ["Node.js", "Express", "MongoDB", "Mongoose", "Cloudinary", "EJS", "Render"],
    links: [
      {
        label: "Live site",
        href: "https://wanderlust-travel-listings.onrender.com/",
        kind: "live",
      },
      {
        label: "Code",
        href: "https://github.com/Anumish20/Wanderlust",
        kind: "repo",
      },
    ],
    accent: "indigo",
  },
  {
    name: "SigmaGPT",
    tagline: "Private, local-first ChatGPT-style assistant",
    domain: "AI Engineering",
    role: "Solo full-stack build",
    status: "live",
    summary:
      "A ChatGPT-style assistant that runs entirely on your own machine through Ollama — no accounts, no cloud, your conversations stay yours.",
    problem:
      "I wanted to understand how AI products are built from the inside — not by calling a hosted API, but by running the model myself, streaming its output, and designing the whole chat experience end to end.",
    highlights: [
      "Local Ollama inference (default phi3) — nothing leaves the machine",
      "Token-by-token streaming over Server-Sent Events",
      "Persistent conversation history with pin, rename, delete & search (MongoDB)",
      "Command palette (⌘K), model picker, per-chat system prompt & temperature",
      "Markdown rendering with syntax-highlighted, copyable code blocks",
    ],
    flow: ["React client", "Express API", "Ollama (local LLM)", "SSE token stream"],
    learnings:
      "Building the whole loop — a React UI, an Express streaming API, and a local model — taught me far more about real AI engineering than calling a hosted endpoint ever could.",
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Ollama", "Server-Sent Events"],
    links: [
      {
        label: "Live demo",
        href: "https://sigmagpt-sandy.vercel.app/",
        kind: "live",
      },
      {
        label: "Code",
        href: "https://github.com/Anumish20/sigmagpt",
        kind: "repo",
      },
    ],
    accent: "cyan",
  },
];

export const interests: Interest[] = [
  {
    title: "Reading books",
    description: "Long-form is where most of my ideas come from.",
  },
  {
    title: "Mobile gaming",
    description: "A good systems game scratches the same itch as a good codebase.",
  },
  {
    title: "Exploring AI tools",
    description: "Trying new models and assistants to see what actually helps.",
  },
  {
    title: "Building side projects",
    description: "The fastest way I learn anything is by shipping a small version of it.",
  },
];

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Anumish20",
    handle: "@Anumish20",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anubhuti-mishra-943158257",
    handle: "Anubhuti Mishra",
  },
  {
    label: "Email",
    href: "mailto:mishraanu383@gmail.com",
    handle: "mishraanu383@gmail.com",
  },
];

export const buildNotes: BuildNote[] = [
  {
    id: "top",
    label: "Hero",
    kind: "client",
    notes: [
      "Framer Motion staggered entrance + AnimatePresence role switch",
      "Ambient aurora & grid are pure CSS transforms (GPU-composited)",
    ],
  },
  {
    id: "about",
    label: "About",
    kind: "server",
    notes: [
      "Server Component — zero client JS shipped",
      "Scroll reveal via IntersectionObserver (Framer whileInView, once)",
    ],
  },
  {
    id: "skills",
    label: "Developer DNA",
    kind: "server",
    notes: [
      "Honest tiers instead of fake proficiency bars",
      "Fully data-driven from a single source (lib/data.ts)",
    ],
  },
  {
    id: "projects",
    label: "Projects",
    kind: "server",
    notes: [
      "SpotlightCard tracks the cursor with motion values — zero re-renders",
      "Hover lift via Framer whileHover spring",
    ],
  },
  {
    id: "interests",
    label: "Interests",
    kind: "client",
    notes: ["Cards lift on hover via Framer whileHover"],
  },
  {
    id: "contact",
    label: "Contact",
    kind: "client",
    notes: [
      "Real form → POST /api/contact",
      "Zod validation → Prisma ORM → Neon PostgreSQL",
      "Node.js runtime + node-postgres driver adapter",
    ],
  },
];

export const siteMeta = {
  title: `${profile.name} — Full-Stack Developer`,
  description:
    "Portfolio of Anubhuti Mishra, a full-stack developer (React, Next.js, Node.js) actively learning AI engineering.",
  url: "https://anubhuti-mishra.vercel.app",
};
