"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "annika-portfolio-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        if (window.localStorage.getItem(STORAGE_KEY)) return;
        setVisible(true);
      } catch {
        setVisible(true);
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  function accept() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[100] border-t border-border/80 bg-card/95 p-4 shadow-[0_-24px_64px_rgba(0,0,0,0.45)] backdrop-blur-md",
        "sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md sm:rounded-xl sm:border sm:p-5",
      )}
    >
      <h2
        id="cookie-consent-title"
        className="text-sm font-bold tracking-tight text-foreground"
      >
        Cookies &amp; privacy
      </h2>
      <p
        id="cookie-consent-desc"
        className="mt-2 text-sm font-medium leading-relaxed text-muted-foreground"
      >
        This site uses essential cookies so it works in your browser. I don&apos;t run
        third-party analytics by default. See{" "}
        <Link
          href="/privacy"
          className="font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
        >
          Privacy
        </Link>{" "}
        for how content is protected and how to contact me.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" variant="glow" size="pill" onClick={accept}>
          OK
        </Button>
        <Button type="button" variant="outline" size="pill" asChild>
          <Link href="/privacy">Read more</Link>
        </Button>
      </div>
    </div>
  );
}
