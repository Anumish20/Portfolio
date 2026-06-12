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
  /** Marks the strongest, lead build — surfaces a "Signature build" badge so a
   *  recruiter's eye lands here first. Keep at most one true. */
  signature?: boolean;
  /** One-line overview shown under the title. */
  summary: string;
  /** Why the project exists / what it solves — sets up the story. */
  problem: string;
  /** Concrete things actually built. Keep honest & verifiable. */
  highlights: string[];
  /** "How it works" data-flow, rendered as a connected step strip. */
  flow: string[];
  /**
   * A short, honest "debugging trace" — the hard part and how it was reasoned
   * through. Deliberately HIDDEN: a recruiter uncovers it by interacting, so
   * the card teaches "how I solve problems" instead of just listing features.
   * NOTE FOR ANUBHUTI: verify each line maps to what you actually hit — these
   * are drawn from your real highlights/learnings, not invented bugs.
   */
  debug: {
    /** The hard part / the symptom worth chasing. */
    challenge: string;
    /** How the problem was traced — the reasoning, step by step. */
    trace: string;
    /** The thing that clicked — the root-cause-level takeaway. */
    insight: string;
  };
  /** Honest, learning-oriented takeaway. */
  learnings: string;
  stack: string[];
  links: ProjectLink[];
  accent: "indigo" | "cyan";
};

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
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
  { label: "Off the clock", href: "#off-the-clock" },
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
    debug: {
      challenge:
        "Letting users upload listing images without buffering big files through my own server or letting anyone edit a listing they didn't own.",
      trace:
        "I followed the request the whole way through. Instead of holding files in app memory, I streamed each upload straight to Cloudinary and persisted only the returned URL in MongoDB. Then I traced the edit/delete paths and put owner-only middleware in front of them, so the server checks identity before it ever touches the database.",
      insight:
        "Real backends are mostly about the edges — validation, auth, and deciding where heavy work should NOT happen. That's where the actual engineering lives, not in the happy path.",
    },
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
    signature: true,
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
    debug: {
      challenge:
        "Making the assistant feel alive — tokens appearing one by one as the model thinks, instead of the UI freezing until the whole reply lands.",
      trace:
        "I stopped treating it as request/response and traced it as a stream. Express keeps the connection open, Ollama emits tokens as it generates, and the React client reads them off a Server-Sent Events stream and appends each chunk as it arrives — so the screen updates in real time instead of waiting for a final blob.",
      insight:
        "A chat UI is really a streaming problem wearing a text box. Once I owned the whole pipe — model, API, and client — the rest of the product finally made sense.",
    },
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

/* ===========================================================================
 * THOUGHTS — the four fragments revealed by clicking the name in the hero.
 * One small, memorable discovery at a time (see components/ui/ThoughtCard).
 * Curated hard: quality over quantity, ordered to build a personality
 * narrative — debugging → obsession → reading → the line I live by.
 * ======================================================================== */
export type Thought = {
  /** A short, lowercase mono label. */
  label: string;
  /** One short line — the discovery itself. */
  body: string;
};

export const thoughts: Thought[] = [
  {
    label: "why I enjoy debugging",
    body: "I learn more from a broken system than a working one.",
  },
  {
    label: "current obsession",
    body: "AI systems · agentic workflows · understanding how things work.",
  },
  {
    label: "what I'm reading",
    body: "Fiction · Non-fiction · Psychology.",
  },
  {
    label: "the line I live by",
    body: "Excellence in action is Yoga.",
  },
];

/* ===========================================================================
 * OFF THE CLOCK — the human behind the commits.
 * A small, playful personality grid (see components/sections/OffTheClock).
 * The section renders a shuffled SUBSET of this pool and lets a visitor
 * reshuffle it — so it feels alive, like a person rather than a CV.
 *
 * NOTE FOR ANUBHUTI: these are TRUE categories you confirmed (reading, gaming,
 * music, movement/yoga) but the one-liners are deliberately editable. Make each
 * `note` specifically YOU — a book you actually loved, a game you sink hours
 * into, an artist on repeat. Specific beats generic every time. Keep it honest.
 * ======================================================================== */
export type Interest = {
  /** Decorative glyph marker. */
  glyph: string;
  /** Short title. */
  title: string;
  /** One honest, specific line. */
  note: string;
  /** Loose category — drives the accent tint. */
  tag: "reading" | "gaming" | "music" | "movement";
};

export const offTheClock: Interest[] = [
  {
    glyph: "📖",
    title: "Lost in a book",
    note: "Fiction to escape, psychology to understand why we do what we do.",
    tag: "reading",
  },
  {
    glyph: "🧠",
    title: "Why we tick",
    note: "Psychology and non-fiction — debugging people the way I debug code.",
    tag: "reading",
  },
  {
    glyph: "🎮",
    title: "One more round",
    note: "Games are just systems with a feedback loop — I can't help but optimise them.",
    tag: "gaming",
  },
  {
    glyph: "🕹️",
    title: "Late-night runs",
    note: "The kind of game that quietly eats an evening before you notice.",
    tag: "gaming",
  },
  {
    glyph: "🎧",
    title: "Always a soundtrack",
    note: "Code goes down smoother with the right thing playing — there's always a queue.",
    tag: "music",
  },
  {
    glyph: "🎵",
    title: "On repeat",
    note: "One track on loop until a problem cracks. Don't ask how many times.",
    tag: "music",
  },
  {
    glyph: "🧘",
    title: "Excellence in action",
    note: "Yoga and movement — “yogah karmasu kaushalam”, the line I actually live by.",
    tag: "movement",
  },
  {
    glyph: "💪",
    title: "Away from the screen",
    note: "Moving the body so the head stays clear — the best debugger is a walk.",
    tag: "movement",
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

/* ===========================================================================
 * CURIOSITY JOURNEY — the HTML → AI arc, folded into the Skills section.
 * Not a résumé timeline: curiosity evolving into engineering. Each stop reads
 * as a four-beat loop — the QUESTION that pulled me there, what I DISCOVERED
 * by chasing it, what it taught me (LEARNED), and the NEXT question it sparked.
 * The chain reads as one continuous thread.
 * ======================================================================== */
export type JourneyStop = {
  label: string;
  /** Styling band: foundation → language → framework → runtime → data → frontier. */
  kind: "foundation" | "language" | "framework" | "runtime" | "data" | "frontier";
  /** The question that pulled me here. */
  question: string;
  /** What I actually did / found by chasing the question. */
  discovery: string;
  /** What it taught me. */
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
    discovery: "Hand-wrote my first pages — headings, links, forms — and watched a browser turn plain text into a document.",
    learned: "Structure, semantics, and accessibility — that a page is a document before it's a design.",
    next: "It worked, but it looked plain. So: how do I control how it looks?",
  },
  {
    label: "CSS",
    kind: "foundation",
    question: "Why does it look like that — and how do I shape it?",
    discovery: "Rebuilt the same pages with layout, spacing, and colour until they finally looked deliberate.",
    learned: "Layout, the box model, and responsive design. Styling turned into a puzzle I actually enjoyed solving.",
    next: "The page still couldn't respond to me. Could it think back?",
  },
  {
    label: "JavaScript",
    kind: "language",
    question: "Can a page actually react and respond?",
    discovery: "Made buttons do things, content change on click, and the page respond to me for the first time.",
    learned: "State, events, and the DOM — the moment static became interactive. This is where it got addictive.",
    next: "Managing all that state by hand got messy fast. There had to be a cleaner way.",
  },
  {
    label: "React",
    kind: "framework",
    question: "Is there a saner way to build and reuse UI?",
    discovery: "Broke a sprawling interface into small components and reused them instead of repeating myself.",
    learned: "Components and composition — building interfaces as small, reusable pieces instead of one giant file.",
    next: "I owned the frontend, but only half the product. What's on the other side of the request?",
  },
  {
    label: "Node.js",
    kind: "runtime",
    question: "What's really happening on the server?",
    discovery: "Stood up my own API — routes, auth, request handling — and owned the back end, not just the screen.",
    learned: "APIs, auth, and request handling — how to own the whole loop instead of just the screen.",
    next: "An app is only as real as the data it remembers. Where does that actually live?",
  },
  {
    label: "PostgreSQL",
    kind: "data",
    question: "Where does the data live, and how do I trust it?",
    discovery: "Designed schemas and ran migrations — and wired the contact form on this very site through Prisma.",
    learned: "Relational modelling, schemas, and migrations — designing the data contract, not just storing rows.",
    next: "With a full stack in hand, one question got louder than the rest.",
  },
  {
    label: "AI Engineering",
    kind: "frontier",
    question: "How are AI products actually built — from the inside?",
    discovery: "Ran a local LLM myself, streamed its tokens over SSE, and built SigmaGPT end to end.",
    learned: "Local LLMs, token streaming, prompt design, and agentic systems — running the model myself instead of only calling an API.",
    next: "And this is the part that doesn't have an end. It's not the finish line — it's the start of a much bigger one, and the most curious I've ever been.",
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
 * BUILD STORY — "Behind the Build".
 * The meta-project: this portfolio, built human-in-the-loop with Claude Code.
 * Each stage is deliberately tight — Problem → Decision → Outcome — plus an
 * explicit human-in-the-loop split (what the AI did vs. what I owned). It's
 * meant to answer "how does Anubhuti build software?", not "how to use Next.js".
 * ======================================================================== */
export type BuildPhase = {
  phase: string;
  /** The problem this stage faced — one line. */
  problem: string;
  /** The call I made — one line. */
  decision: string;
  /** What it produced — one line. */
  outcome: string;
  /** Human-in-the-loop split: what Claude Code did vs. what I owned. */
  loop: { ai: string; me: string };
};

export const buildStory: BuildPhase[] = [
  {
    phase: "Idea",
    problem: "Another template that lists what I know wouldn't be remembered.",
    decision: "Make the site itself prove how I work — built with AI, honest about the process.",
    outcome: "A portfolio with a point of view instead of a checklist.",
    loop: {
      ai: "Nothing yet — on purpose.",
      me: "Wrote the brief like I was onboarding a teammate.",
    },
  },
  {
    phase: "Planning",
    problem: "Ad-hoc styling and scattered copy would rot the moment the site grew.",
    decision: "Lock in design tokens and one content source (lib/data.ts) before any UI.",
    outcome: "Every later change is a single edit — never a hunt through JSX.",
    loop: {
      ai: "Proposed the token system and file structure.",
      me: "Chose the palette, the taste, and the constraints.",
    },
  },
  {
    phase: "Claude Code",
    problem: "Scaffolding and motion wiring eat the hours — not the thinking.",
    decision: "Pair-build: Claude writes the boilerplate, I drive direction and review every diff.",
    outcome: "Fast to build, with nothing accepted blindly.",
    loop: {
      ai: "Scaffolded components and wired the animations.",
      me: "Set the direction and reviewed each change before it stayed.",
    },
  },
  {
    phase: "Iteration",
    problem: "The first drafts looked competent but generic.",
    decision: "Cut the clichés — fake proficiency bars became honest tiers; motion got calmer.",
    outcome: "It started to feel like mine, not a theme I downloaded.",
    loop: {
      ai: "Generated variations on request.",
      me: "Judged taste — 'feels gimmicky', 'too much', 'calmer'.",
    },
  },
  {
    phase: "Debugging",
    problem: "On mobile, the nav links looked dead — taps did nothing.",
    decision: "Hypothesis first: the closing sheet cancels the in-flight scroll. Scroll, then close.",
    outcome: "Fixed at the root cause, not patched over — the part I enjoy most.",
    loop: {
      ai: "Helped me trace the hypothesis through the code.",
      me: "Reproduced it, verified the fix, confirmed the root cause.",
    },
  },
  {
    phase: "PostgreSQL",
    problem: "A mailto: link isn't a backend — I wanted something real.",
    decision: "Contact form → Zod validation → Prisma → Neon Postgres, with a live /api/health route.",
    outcome: "Messages persist in a real database, and the connection is provable.",
    loop: {
      ai: "Wrote the route handler and the schema.",
      me: "Designed the data contract and the health check.",
    },
  },
  {
    phase: "Deployment",
    problem: "The last 10% is knowing what to cut, not what to add.",
    decision: "Ship on Vercel with the migration in the build; remove anything that doesn't earn its place.",
    outcome: "Live, lean, and self-documenting — this section included.",
    loop: {
      ai: "Handled the deploy config and migration wiring.",
      me: "Decided what made the final cut.",
    },
  },
];

export const siteMeta = {
  title: `${profile.name} — Full-Stack Developer`,
  description:
    "Portfolio of Anubhuti Mishra, a full-stack developer (React, Next.js, Node.js) actively learning AI engineering.",
  url: "https://anubhuti-portfolio.vercel.app",
};
