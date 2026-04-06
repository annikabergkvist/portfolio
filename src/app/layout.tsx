import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { MobileHeader } from "@/components/mobile-header";
import { Sidebar, SIDEBAR_WIDTH_CLASS } from "@/components/sidebar";
import { cn } from "@/lib/utils";
import "./globals.css";

/** DM Sans via next/font; sets --font-sans on <html> for globals.css / Tailwind font-sans. */
const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Annika Bergkvist — Design Engineer",
  description:
    "Design Engineer based in Kristianstad, Sweden. Bridging product design and frontend development.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/**
 * Root layout for the App Router. `children` is the active route (e.g. home `page.tsx`).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        dmSans.variable,
        /* "dark" enables .dark CSS variables and Tailwind dark:* variants */
        "dark",
      )}
    >
      {/*
        Below xl: mobile header + pt-16. From xl: in-flow w-24 spacer + fixed sidebar; body scrolls.
      */}
      <body className="min-h-dvh overflow-x-hidden overflow-y-auto">
        <MobileHeader />
        <Sidebar />
        <div
          className={cn(
            "flex min-h-dvh min-w-0 flex-col pt-16 xl:flex-row xl:pt-0",
          )}
        >
          <div
            className={cn("hidden shrink-0 xl:block", SIDEBAR_WIDTH_CLASS)}
            aria-hidden
          />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
