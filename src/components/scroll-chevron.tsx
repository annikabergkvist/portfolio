"use client";

import { ChevronDown } from "lucide-react";

/** Mobile-only hint to scroll to #work (hidden from lg; desktop uses the sidebar). */
export function ScrollChevron() {
  return (
    <a
      href="#work"
      className="animate-scroll-chevron-bounce pointer-events-auto absolute bottom-8 left-1/2 z-10 flex flex-col items-center gap-1 text-foreground/55 transition-colors hover:text-foreground lg:hidden"
      aria-label="Scroll to selected work"
    >
      <ChevronDown className="h-11 w-11" strokeWidth={1.35} aria-hidden />
    </a>
  );
}
