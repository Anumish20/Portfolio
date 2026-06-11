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
    "Right now I'm deliberately pointing that curiosity at AI engineering — agentic systems, local LLMs through Ollama, and building with Claude Code. I treat side projects as my lab: a place to break things and understand why. Honestly, debugging is the part I enjoy most — I learn more chasing a root cause than I do writing the happy path.",
    "I care about the details that make software feel considered: clean component boundaries, readable code, and interfaces that don't make people think too hard. The thread through all of it is simple — stay curious, keep building, and learn by doing.",
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
  { label: "Build", href: "#build" },
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

// Real hobbies, in Anubhuti's own framing — what he actually does and why.
export const interests: Interest[] = [
  {
    title: "Building software",
    description: "Taking an idea from an empty file all the way to something people can actually use.",
  },
  {
    title: "Debugging",
    description: "I genuinely enjoy finding the root cause — I usually learn more from a broken system than a working one.",
  },
  {
    title: "Gaming",
    description: "A good systems game scratches the same itch as a good codebase — strategy and problem-solving.",
  },
  {
    title: "Learning new tech",
    description: "Always pulling apart something new to understand how it works on the inside.",
  },
];

// What I read — the raw material most of my thinking starts from.
export const readingInterests: string[] = [
  "Fiction",
  "Non-fiction",
  "Psychology",
  "Technology",
  "Productivity",
  "Human behaviour",
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
      "Server Component — only a tiny client island for the field-notes button",
      "Quote + philosophy share one source with the Field Notes reveal",
      "Scroll reveal via IntersectionObserver (Framer whileInView, once)",
    ],
  },
  {
    id: "skills",
    label: "Developer DNA",
    kind: "server",
    notes: [
      "Honest tiers instead of fake proficiency bars",
      "Developer Journey (HTML → AI) is a CSS scroll-progress rail",
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
    id: "build",
    label: "How it's built",
    kind: "client",
    notes: [
      "Interactive build story — selecting a phase swaps the panel via AnimatePresence",
      "Meta touch: this section documents the process that produced the site you're on",
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

/* ===========================================================================
 * PERSONAL PROFILE — powers the clickable-name reveal (a premium side drawer).
 * Not an About card: a "hidden profile" you discover, revealed section by
 * section. Content is real (supplied by Anubhuti); keep it that way.
 * The drawer also reuses `interests` (hobbies) and `readingInterests` so the
 * personality details never drift between the page and the reveal.
 * ======================================================================== */

// Three rules Anubhuti builds by — shared by the About section and the
// profile reveal so they never drift apart.
export const philosophy: string[] = ["Stay curious.", "Keep building.", "Learn through doing."];

export const personalProfile = {
  // The anchor of the whole piece — opens the reveal.
  quote: "Excellence in action is Yoga.",
  quoteReflection:
    "I keep coming back to this. Software is a continuous loop of learning, building, debugging and improving — and progress comes from doing meaningful work consistently while staying curious.",
  philosophy,
  // What I'm deep in right now.
  obsessions: ["AI Engineering", "Agentic Systems", "Understanding how systems work"],
  // Actively learning, today.
  learning: ["Next.js", "PostgreSQL", "AI Systems"],
  // Why I enjoy debugging — the through-line a recruiter should remember.
  mindset:
    "Debugging is genuinely my favourite part. I break a complex problem into smaller pieces and chase the root cause until it makes sense — and I almost always learn more from a broken system than a working one. A bug is just the system telling me something I didn't understand yet.",
  // The thing I'm building toward.
  dreamProject: "Building practical AI products that people genuinely use.",
  // NOTE FOR ANUBHUTI: these are drawn from what you've told me — tweak or
  // swap any so they're 100% you. They're meant to feel human, not polished.
  funFacts: [
    "I'll happily lose an evening to a single bug — not just to fix it, but to understand exactly why it happened.",
    "A good systems game and a clean codebase scratch the same part of my brain.",
    "Most of my project ideas start in a book, not in an editor.",
    "I'd rather understand how something works under the hood than just be told that it works.",
    "This very profile was built human-in-the-loop with an AI pair — fitting, given the obsession.",
  ],
};

/* ===========================================================================
 * DEVELOPER JOURNEY — the HTML → AI arc, folded into the Skills section.
 * Not a résumé timeline: an evolving thought process. Each stop is the
 * QUESTION that pulled Anubhuti there, what she LEARNED, and what it LED TO.
 * The `next` line names the following stop, so the chain reads as one
 * continuous thread of curiosity.
 * ======================================================================== */
export type JourneyStop = {
  label: string;
  /** Styling band: foundation → language → framework → runtime → data → frontier. */
  kind: "foundation" | "language" | "framework" | "runtime" | "data" | "frontier";
  /** The question that pulled me here. */
  question: string;
  /** What I took away. */
  learned: string;
  /** The itch / next question that led onward. */
  next: string;
  /** Only on the frontier stop: the directions this is opening up. */
  frontier?: string[];
};

export const journey: JourneyStop[] = [
  {
    label: "HTML",
    kind: "foundation",
    question: "How does a webpage even exist?",
    learned: "Structure, semantics, and accessibility — that a page is a document before it's a design.",
    next: "It worked, but it looked plain. So: how do I control how it looks?",
  },
  {
    label: "CSS",
    kind: "foundation",
    question: "Why does it look like that — and how do I shape it?",
    learned: "Layout, the box model, and responsive design. Styling turned into a puzzle I actually enjoyed solving.",
    next: "The page still couldn't respond to me. Could it think back?",
  },
  {
    label: "JavaScript",
    kind: "language",
    question: "Can a page actually react and respond?",
    learned: "State, events, and the DOM — the moment static became interactive. This is where it got addictive.",
    next: "Managing all that state by hand got messy fast. There had to be a cleaner way.",
  },
  {
    label: "React",
    kind: "framework",
    question: "Is there a saner way to build and reuse UI?",
    learned: "Components and composition — building interfaces as small, reusable pieces instead of one giant file.",
    next: "I owned the frontend, but only half the product. What's on the other side of the request?",
  },
  {
    label: "Node.js",
    kind: "runtime",
    question: "What's really happening on the server?",
    learned: "APIs, auth, and request handling — how to own the whole loop instead of just the screen.",
    next: "An app is only as real as the data it remembers. Where does that actually live?",
  },
  {
    label: "PostgreSQL",
    kind: "data",
    question: "Where does the data live, and how do I trust it?",
    learned: "Relational modelling, schemas, and migrations — designing the data contract, not just storing rows. It's what backs the contact form on this very site, through Prisma.",
    next: "With a full stack in hand, one question got louder than the rest.",
  },
  {
    label: "AI Engineering",
    kind: "frontier",
    question: "How are AI products actually built — from the inside?",
    learned: "Local LLMs, token streaming, prompt design, and agentic systems — running the model myself instead of only calling an API.",
    next: "And this is the part that doesn't have an end. It's not the finish line of the journey — it's the start of a much bigger one, and the most curious I've ever been.",
    frontier: [
      "AI agents",
      "Local LLMs",
      "Multi-agent systems",
      "AI-assisted development",
      "Intelligent software",
    ],
  },
];

/* ===========================================================================
 * BUILD STORY — "How This Website Was Built".
 * The meta-project: this portfolio, built human-in-the-loop with Claude Code.
 * Each phase has the story AND a real prompt-evolution note, so it doubles as
 * evidence of prompt engineering and AI-assisted development.
 * ======================================================================== */
export type BuildPhase = {
  phase: string;
  /** One-line summary shown on the rail. */
  summary: string;
  /** The human-in-the-loop story for this phase. */
  detail: string;
  /** How the prompting / collaboration actually went here. */
  craft: string;
};

export const buildStory: BuildPhase[] = [
  {
    phase: "Idea",
    summary: "A portfolio that proves how I work, not just what I made.",
    detail:
      "I didn't want another template. The goal was a site that itself demonstrates an AI-first engineering workflow — honest about the stack, honest about the process.",
    craft: "Started by writing the brief as if onboarding a teammate: constraints, taste, and what 'done' meant — before any code.",
  },
  {
    phase: "Planning",
    summary: "Design system and content model before pixels.",
    detail:
      "Decided the dark premium theme, the indigo→cyan accent, and a single source of truth for content (lib/data.ts) so the site could grow without touching JSX.",
    craft: "Prompts moved from 'build a hero' to 'here are my tokens and primitives — compose within them.' Setting the system up front made every later prompt cheaper.",
  },
  {
    phase: "Claude Code",
    summary: "Pair-building section by section.",
    detail:
      "I drove direction and taste; Claude Code handled scaffolding, motion wiring, and the tedious parts. Every component was reviewed and adjusted, not accepted blindly.",
    craft: "The unlock was specificity: referencing real files, naming the exact component to match, and giving feedback in terms of intent ('feels gimmicky') instead of code.",
  },
  {
    phase: "Iterations",
    summary: "Tighten taste, kill anything that felt generic.",
    detail:
      "Several passes removed clichés — fake proficiency bars became honest tiers, invented metrics were cut, animations were calmed down until they felt premium, not flashy.",
    craft: "Prompts evolved from 'add features' to 'would a recruiter remember this after 100 portfolios? If not, redesign it.' Editing taste, not just code.",
  },
  {
    phase: "Debugging",
    summary: "The part I actually enjoy.",
    detail:
      "Real bugs, real root causes — e.g. mobile nav links appeared dead because the closing sheet cancelled the in-flight smooth scroll. Fixed by scrolling the document, then closing.",
    craft: "I treat the model as a debugging partner: describe the symptom precisely, form a hypothesis together, then verify — instead of pasting an error and hoping.",
  },
  {
    phase: "PostgreSQL",
    summary: "A real backend, not a mailto: link.",
    detail:
      "The contact form posts to a Next.js route handler, validates with Zod, and persists to Neon PostgreSQL through Prisma — with a live /api/health endpoint to prove it.",
    craft: "Moved from 'make a form' to 'validate at the edge, type the data model, and surface a health check' — designing the contract, not just the happy path.",
  },
  {
    phase: "Deployment",
    summary: "Shipped, and self-documenting.",
    detail:
      "Deployed on Vercel with the database migration running in the build. The 'how it's built' inspector means the live site narrates its own architecture as you scroll.",
    craft: "The last prompt wasn't about code at all — it was 'what would make this unforgettable without making it try too hard?' Curation over addition.",
  },
];

/* ===========================================================================
 * RECRUITER BRIEF — powers "Recruiter Mode": evaluate in ~60 seconds.
 * Curated, scannable, links straight to proof.
 * ======================================================================== */
export const recruiterBrief = {
  pitch:
    "Full-stack developer (React · Next.js · Node.js) who ships end-to-end products and is going deep on AI engineering — local LLMs, agentic systems, and AI-assisted development.",
  stack: {
    Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    Backend: ["Node.js", "Express", "Next.js Route Handlers", "Zod"],
    Data: ["PostgreSQL (Neon)", "Prisma", "MongoDB"],
    "AI / Tooling": ["Local LLMs (Ollama)", "Prompt engineering", "Claude Code", "Git"],
  } as Record<string, string[]>,
  ai: [
    "Built SigmaGPT — a local-first ChatGPT-style assistant with token streaming over SSE.",
    "Hands-on with local LLM inference (Ollama), prompt design, and AI-assisted development.",
    "This portfolio was itself built human-in-the-loop with Claude Code.",
  ],
};

export const siteMeta = {
  title: `${profile.name} — Full-Stack Developer`,
  description:
    "Portfolio of Anubhuti Mishra, a full-stack developer (React, Next.js, Node.js) actively learning AI engineering.",
  url: "https://anubhuti-mishra.vercel.app",
};
