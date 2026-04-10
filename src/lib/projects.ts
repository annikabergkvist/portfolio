export const PROJECT_SLUGS = [
  "fintech-dashboard",
  "leader-linne",
  "wexiodisk",
  "vdff",
] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

export type Project = {
  slug: ProjectSlug;
  index: string;
  title: string;
  /** Shown under the title on the project detail page only */
  subtitle?: string;
  /** Short teaser on the home work section */
  description: string;
  /** Longer narrative on the project detail page */
  fullDescription: string;
  /** Full role line (detail page + home row); often starts with "Role: …" */
  role: string;
  /** Public URL when the work is live; omit when not applicable */
  liveUrl?: string;
  mockupSrc: string;
  floatDurationMs?: number;
  floatDelayMs?: number;
};

export const projects: Project[] = [
  {
    slug: "fintech-dashboard",
    index: "01",
    title: "Fintech Dashboard UI",
    description:
      "A Wise-inspired dashboard redesigned and built from scratch. The focus: translating a complex fintech UI into a clean, scalable component architecture—supported by a custom design system, light/dark mode, and clear data visualization.",
    fullDescription:
      "This project started from a product that needed to feel as clear and trustworthy as leading fintech apps, without copying them blindly. I redesigned the dashboard from the ground up and implemented it as a maintainable React surface.\n\nThe work centered on a small design system: tokens for color, type, and spacing, plus reusable primitives for cards, tables, and charts. Light and dark modes were first-class so states and data stayed legible in both themes.\n\nComplex flows were broken into focused views and consistent patterns for filters, summaries, and empty states, so the UI could grow without turning into a patchwork. The outcome is a dashboard that reads cleanly at a glance and scales as new data and features are added.",
    role: "Role: Design Engineer — UX/UI design, design system, component architecture, frontend development",
    mockupSrc: "/images/mockup-fintech.png",
    floatDurationMs: 6800,
    floatDelayMs: 80,
  },
  {
    slug: "leader-linne",
    index: "02",
    title: "Leader Linné",
    subtitle: "Homepage Redesign & Development",
    description:
      "Homepage redesign and build for a regional NGO: outdated navigation and clutter made key content hard to find. I simplified information architecture, designed in Figma, and shipped responsive HTML/CSS/JS and Liquid templates—with ongoing client collaboration through to launch.",
    fullDescription:
      "The problem\n\nLeader Linné Småland's website was outdated, cluttered and difficult to navigate. An oversized, unorganised menu with links scattered across every page made it nearly impossible for visitors to find what they were looking for. The client needed a modern, streamlined site that surfaced the most important content, grant applications, ongoing projects and news, without making users hunt for it.\n\nWhat I did\n\nBy combining UX research, UI design and hands-on frontend development, I was able to own the full process from first client call to final deployment.\n\nI started by working closely with the client to understand their business goals, user needs and pain points, gathering insights through interviews and discussions to inform design decisions. I then conducted heuristic evaluation, analysing the existing site and benchmarking against similar organisations to identify structural and usability issues.\n\nFrom there I simplified the entire site architecture, reducing and reorganising the navigation into clear categories with dropdowns where needed. Priority content, how to apply for grants, what the process involves, news, and current and upcoming projects, was brought forward and made immediately accessible.\n\nHigh-fidelity prototypes were built in Figma, with a strong focus on crafting a visually modern and intuitive interface that aligned with the client's brand identity. Designs were presented and iterated based on client feedback before moving into frontend development. The approved designs were translated into fully responsive, pixel-perfect pages using HTML, CSS, JavaScript and Liquid templating.\n\nThroughout the project I maintained open communication with the client, gathering feedback at every stage and guiding them through design and development decisions to ensure clarity and alignment. Conducted cross-device and cross-browser testing to ensure a polished, consistent experience before launch.\n\nThe result\n\nThe simplified navigation and clearer information hierarchy made key content significantly easier to find. Visitors no longer had to search for grant information or project updates, it was front and centre. The client reported positive feedback from users following launch, noting that the site felt modern, easier to navigate and better represented the organisation.",
    role:
      "Role: Design Engineer — UX research, UI design, Figma prototyping, frontend development, client collaboration, QA & testing",
    liveUrl: "https://leaderlinne.se/",
    mockupSrc: "/images/mockup-leader2.png",
    floatDurationMs: 7600,
    floatDelayMs: 260,
  },
  {
    slug: "wexiodisk",
    index: "03",
    title: "Wexiödisk",
    description:
      "Users struggled to understand the savings potential of industrial dishwashers. I designed and tested an intuitive calculator experience that made complex inputs and outcomes easy to grasp and act on.",
    fullDescription:
      "Industrial buyers often compare equipment on sticker price, not total cost of ownership. Wexiödisk wanted a tool that made savings—from water, energy, and labor—tangible without overwhelming non-technical users.\n\nI designed a stepped calculator flow: progressive disclosure for inputs, plain-language labels, and immediate feedback as numbers changed. Wireframes moved quickly into interactive prototypes for stakeholder review and usability tests with realistic scenarios.\n\nIterations focused on trust and clarity: showing assumptions, rounding sensibly, and surfacing a concise summary users could share internally. The experience turned a dense spreadsheet problem into something people could actually use in a sales conversation.",
    role: "Role: UI/UX Designer — interaction design, prototyping, usability testing",
    mockupSrc: "/images/mockup-wexiodisk.png",
    floatDurationMs: 7200,
    floatDelayMs: 420,
  },
  {
    slug: "vdff",
    index: "04",
    title: "VDFF Website Redesign",
    description:
      "Translated high-fidelity designs into a responsive, performant website for a Swedish football club—ensuring a consistent, pixel-precise experience across breakpoints and devices.",
    fullDescription:
      "The club’s new visual identity arrived as detailed desktop designs. My job was to ship a site that honored that craft on phones and large screens alike, with fast loads and solid accessibility.\n\nI implemented responsive layouts with a consistent grid and type scale, handled imagery and video responsibly, and paid attention to focus states, contrast, and semantic structure so fans and staff get a polished experience everywhere.\n\nWhere designs didn’t specify every breakpoint, I extended the system logically—spacing, component variants, and motion—so the site feels intentional from the first hero to the deepest article page.",
    role: "Role: Frontend Developer — responsive implementation, performance, accessibility",
    mockupSrc: "/images/mockup-vdff2.png",
    floatDurationMs: 8000,
    floatDelayMs: 140,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
