"use client";

import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/** Mobile-only hint to scroll to #work (hidden from lg; desktop uses the sidebar). */
export function ScrollChevron() {
  return (
    <a
      href="#work"
      className={cn(
        "animate-scroll-chevron-bounce pointer-events-auto absolute left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-1 text-foreground/55 transition-colors hover:text-foreground xl:hidden",
        "bottom-[max(1rem,env(safe-area-inset-bottom,0px)+0.5rem)]",
      )}
      aria-label="Scroll to selected work"
    >
      <ChevronDown
        className="h-9 w-9 sm:h-11 sm:w-11"
        strokeWidth={1.35}
        aria-hidden
      />
    </a>
  );
}
