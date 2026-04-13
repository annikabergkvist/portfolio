"use client";

import { cn } from "@/lib/utils";

/**
 * Deters casual “Save image as” / drag-out; does not prevent determined copying
 * (screenshots, devtools, etc.). See /privacy for copyright notice.
 */
export function BlockImageSaveUI({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(className)}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
}
