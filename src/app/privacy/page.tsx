import type { Metadata } from "next";
import Link from "next/link";
import { MAIN_CONTENT_CLASS } from "@/lib/main-content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Privacy — Annika Bergkvist",
  description:
    "How this portfolio handles cookies, imagery, and your privacy.",
};

export default function PrivacyPage() {
  return (
    <main className="flex min-w-0 flex-col pb-24 pt-12 sm:pb-28 sm:pt-14 lg:pt-16">
      <div className={cn(MAIN_CONTENT_CLASS, "flex max-w-[65ch] flex-col gap-8")}>
        <Link
          href="/"
          className="inline-flex w-fit text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          ← Home
        </Link>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Privacy
          </h1>
          <p className="text-sm font-medium text-muted-foreground">
            Last updated: April 2026
          </p>
        </div>

        <section className="flex flex-col gap-3 text-[17px] font-medium leading-relaxed text-secondary-foreground sm:text-[18px] sm:leading-relaxed">
          <h2 className="text-lg font-bold text-foreground">Cookies</h2>
          <p>
            This portfolio is a static marketing site. If you click &quot;OK&quot; on the
            cookie notice, your choice is stored only in your browser
            (localStorage) so the banner does not show again. No tracking cookies
            are set by this site unless you later add analytics and disclose that
            here.
          </p>
        </section>

        <section className="flex flex-col gap-3 text-[17px] font-medium leading-relaxed text-secondary-foreground sm:text-[18px] sm:leading-relaxed">
          <h2 className="text-lg font-bold text-foreground">Imagery &amp; copyright</h2>
          <p>
            Project mockups, photos, and other visuals on this site are owned by
            Annika Bergkvist or used with permission. They may not be copied,
            redistributed, or used commercially without written consent.
          </p>
          <p>
            Technical note: some interactions (like right-click save) are limited
            on purpose as a courtesy reminder. That does not replace copyright
            law; it is not possible to fully prevent saving from a public
            website.
          </p>
        </section>

        <section className="flex flex-col gap-3 text-[17px] font-medium leading-relaxed text-secondary-foreground sm:text-[18px] sm:leading-relaxed">
          <h2 className="text-lg font-bold text-foreground">Contact</h2>
          <p>
            The contact form sends your name, email address, and message to my
            inbox via my email provider (ImprovMX). I use that only to reply to
            you, not for marketing lists, unless you ask to stay in touch.
          </p>
          <p>
            Questions about privacy or licensing: use the contact option on the{" "}
            <Link
              href="/"
              className="font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
            >
              home page
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
