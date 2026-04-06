import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Bredd på den fasta sidopanelen.
 * SIDEBAR_INSET_CLASS ska matcha denna bredd i layout så huvudinnehållet inte hamnar under panelen.
 */
export const SIDEBAR_WIDTH_CLASS = "w-24";
export const SIDEBAR_INSET_CLASS = "pl-24";

/** En gemensam horisontell inset (~28px vänster, 12px höger) — bara på <aside>, undviker dubbel px på nav/social. */
const SIDEBAR_INNER_X = "pl-20 pr-3";

/**
 * Navigationsankare på samma sida (kräver id="work" | "about" | "contact" i innehållet).
 */
const navItems = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

const navLinkClassName = cn(
  "h-auto rounded-md px-2 py-1 text-base font-medium tracking-wide",
  "text-sidebar-accent-foreground",
  "hover:bg-sidebar-accent hover:text-muted-foreground",
  "focus-visible:border-sidebar-ring focus-visible:ring-sidebar-ring/50"
);

const socialButtonClassName = cn(
  "text-sidebar-accent-foreground hover:text-muted-foreground",
  "hover:bg-sidebar-accent",
  "focus-visible:border-sidebar-ring focus-visible:ring-sidebar-ring/50"
);

function LinkedInGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-current"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-current"
      aria-hidden
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function MailGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-current"
      aria-hidden
    >
      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67z" />
      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908z" />
    </svg>
  );
}

const socialItems = [
  {
    href: "https://www.linkedin.com/in/annikabergkvist/",
    label: "LinkedIn",
    Icon: LinkedInGlyph,
  },
  {
    href: "https://github.com/annikabergkvist",
    label: "GitHub",
    Icon: GitHubGlyph,
  },
  {
    href: "mailto:annikabergkvist@hotmail.com",
    label: "Email",
    Icon: MailGlyph,
  },
] as const;

/**
 * Vänster sidopanel (fast): flex-kolumn fyller viewport; flex-1-spacer ger variabelt avstånd
 * nav → ikoner som växer med skärmhöjd (min-h-24 = minsta luft även på låga fönster).
 */
export function Sidebar() {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 box-border flex h-dvh flex-col bg-background",
        SIDEBAR_INNER_X,
        SIDEBAR_WIDTH_CLASS
      )}
      aria-label="Site"
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <nav
          className="flex shrink-0 flex-col items-center justify-start gap-14 pt-24"
          aria-label="Main navigation"
        >
          {navItems.map(({ href, label }) => (
            <div
              key={href}
              className="flex min-h-6 items-center justify-center"
            >
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  navLinkClassName,
                  "origin-center -rotate-90 whitespace-nowrap"
                )}
                asChild
              >
                <Link href={href}>{label}</Link>
              </Button>
            </div>
          ))}
        </nav>

        {/* Tar all ledig höjd under nav → avstånd till ikoner följer viewport */}
        <div
          className="min-h-24 min-w-0 flex-1 basis-0"
          aria-hidden
        />

        <div
          className="flex shrink-0 flex-col items-center gap-3 pb-24"
          aria-label="Social links"
        >
          {socialItems.map(({ href, label, Icon }) => (
            <Button
              key={label}
              variant="ghost"
              size="icon-sm"
              className={socialButtonClassName}
              asChild
            >
              <a
                href={href}
                aria-label={label}
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <Icon />
              </a>
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
}
