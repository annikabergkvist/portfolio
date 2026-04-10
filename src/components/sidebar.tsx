"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ContactDialog, ContactDialogTrigger } from "@/components/contact-dialog";
import { HomeLogoMark } from "@/components/home-logo-mark";
import { SocialGlyph } from "@/components/social-glyphs";
import { SIDEBAR_LOGO_TOP_CLASS, SIDEBAR_NAV_TOP_CLASS } from "@/lib/hero-layout";
import { SITE_NAV_ITEMS, SITE_SOCIAL_LINKS } from "@/lib/site-nav";
import { cn } from "@/lib/utils";

/**
 * Fixed sidebar width. Layout uses an in-flow spacer with the same width on xl so content
 * aligns with this rail without padding on the scroll container (full-bleed hero under the rail).
 * Shown from `xl` (1280px) so large tablets / iPad Pro use the hamburger layout instead.
 */
export const SIDEBAR_WIDTH_CLASS = "w-24";

/** Horizontal padding on the aside only (~28px left, 12px right) to avoid double padding on nav/social. */
const SIDEBAR_INNER_X = "pl-20 pr-3";

const navLinkClassName = cn(
  "h-auto rounded-md border-transparent px-2 py-1 text-base font-medium tracking-wide shadow-none",
  "!bg-transparent text-sidebar-accent-foreground",
  "hover:!bg-transparent hover:!text-foreground",
  "active:!bg-transparent aria-expanded:!bg-transparent",
  "focus-visible:border-sidebar-ring focus-visible:ring-sidebar-ring/50",
);

const socialButtonClassName = cn(
  "border-transparent shadow-none !bg-transparent text-sidebar-accent-foreground",
  "hover:!bg-transparent hover:!text-foreground",
  "active:!bg-transparent aria-expanded:!bg-transparent",
  "focus-visible:border-sidebar-ring focus-visible:ring-sidebar-ring/50",
);

function sectionIdFromNavHref(href: string): string | null {
  const hash = href.split("#")[1];
  return hash && hash.length > 0 ? hash : null;
}

/** Fixed left rail: hidden below `xl` (1280px); column fills the viewport from `xl`. */
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 box-border hidden h-dvh flex-col bg-transparent xl:flex",
        SIDEBAR_INNER_X,
        SIDEBAR_WIDTH_CLASS,
      )}
      aria-label="Site"
    >
      <div className="relative z-10 flex min-h-0 flex-1 flex-col bg-transparent">
        <div
          className={cn(
            "flex shrink-0 flex-col items-center",
            SIDEBAR_LOGO_TOP_CLASS,
          )}
        >
          <Link
            href="/"
            aria-label="Home"
            className={cn(
              "inline-flex rounded-md transition-opacity hover:opacity-90",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring/50",
            )}
          >
            <HomeLogoMark className="size-9" />
          </Link>
        </div>
        <ContactDialog>
          <nav
            className={cn(
              "flex shrink-0 flex-col items-center justify-start gap-14",
              SIDEBAR_NAV_TOP_CLASS,
            )}
            aria-label="Main navigation"
          >
            {SITE_NAV_ITEMS.map((item) => (
              <div
                key={item.type === "contact" ? "contact" : item.href}
                className="flex min-h-6 items-center justify-center"
              >
                {item.type === "contact" ? (
                  <ContactDialogTrigger>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className={cn(
                        navLinkClassName,
                        "origin-center -rotate-90 whitespace-nowrap",
                      )}
                    >
                      {item.label}
                    </Button>
                  </ContactDialogTrigger>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      navLinkClassName,
                      "origin-center -rotate-90 whitespace-nowrap",
                    )}
                    asChild
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        if (pathname !== "/") return;
                        const id = sectionIdFromNavHref(item.href);
                        if (!id) return;
                        const el = document.getElementById(id);
                        if (!el) return;
                        e.preventDefault();
                        const smooth = !window.matchMedia(
                          "(prefers-reduced-motion: reduce)",
                        ).matches;
                        el.scrollIntoView({
                          behavior: smooth ? "smooth" : "auto",
                          block: "start",
                        });
                        window.history.pushState(null, "", `#${id}`);
                      }}
                    >
                      {item.label}
                    </Link>
                  </Button>
                )}
              </div>
            ))}
          </nav>
        </ContactDialog>

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
