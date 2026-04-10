import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

const MASK_STYLE: CSSProperties = {
  WebkitMaskImage: "url(/images/ab-logo.png)",
  WebkitMaskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskImage: "url(/images/ab-logo.png)",
  maskSize: "contain",
  maskRepeat: "no-repeat",
  maskPosition: "center",
};

/**
 * AB mark from `public/images/ab-logo.png` (alpha mask + sidebar accent fill).
 */
export function HomeLogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-block shrink-0 bg-sidebar-accent-foreground", className)}
      style={MASK_STYLE}
      aria-hidden
    />
  );
}
