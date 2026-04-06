import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SocialGlyph } from "@/components/social-glyphs";
import { SITE_NAV_ITEMS, SITE_SOCIAL_LINKS } from "@/lib/site-nav";
import { cn } from "@/lib/utils";

/**
 * Fixed sidebar width. SIDEBAR_INSET_CLASS must match so main content is not covered.
 * Mobile: no inset (hamburger nav). From lg: inset matches this rail.
 */
export const SIDEBAR_WIDTH_CLASS = "w-24";
export const SIDEBAR_INSET_CLASS = "pl-0 lg:pl-24";

/** Horizontal padding on the aside only (~28px left, 12px right) to avoid double padding on nav/social. */
const SIDEBAR_INNER_X = "pl-20 pr-3";

const navLinkClassName = cn(
  "h-auto rounded-md px-2 py-1 text-base font-medium tracking-wide",
  "text-sidebar-accent-foreground",
  "hover:bg-sidebar-accent hover:text-muted-foreground",
  "focus-visible:border-sidebar-ring focus-visible:ring-sidebar-ring/50",
);

const socialButtonClassName = cn(
  "text-sidebar-accent-foreground hover:text-muted-foreground",
  "hover:bg-sidebar-accent",
  "focus-visible:border-sidebar-ring focus-visible:ring-sidebar-ring/50",
);

/** Fixed left rail: hidden below lg, column fills the viewport from lg. */
export function Sidebar() {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 box-border hidden h-dvh flex-col bg-background lg:flex",
        SIDEBAR_INNER_X,
        SIDEBAR_WIDTH_CLASS,
      )}
      aria-label="Site"
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <nav
          className="flex shrink-0 flex-col items-center justify-start gap-14 pt-[5.25rem]"
          aria-label="Main navigation"
        >
          {SITE_NAV_ITEMS.map(({ href, label }) => (
            <div
              key={href}
              className="flex min-h-6 items-center justify-center"
            >
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  navLinkClassName,
                  "origin-center -rotate-90 whitespace-nowrap",
                )}
                asChild
              >
                <Link href={href}>{label}</Link>
              </Button>
            </div>
          ))}
        </nav>

        <div
          className="min-h-24 min-w-0 flex-1 basis-0"
          aria-hidden
        />

        <div
          className="flex shrink-0 flex-col items-center gap-3 pb-24"
          aria-label="Social links"
        >
          {SITE_SOCIAL_LINKS.map(({ href, label }) => (
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
                <SocialGlyph label={label} />
              </a>
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
}
