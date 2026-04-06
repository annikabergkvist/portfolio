import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { MobileHeader } from "@/components/mobile-header";
import { Sidebar, SIDEBAR_INSET_CLASS } from "@/components/sidebar";
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
        Mobile: MobileHeader + pt-16. From lg: fixed sidebar; SIDEBAR_INSET_CLASS indents main
        so content does not sit under the rail. overflow-x-hidden + overflow-y-auto on the scroller.
      */}
      <body className="min-h-dvh overflow-x-hidden">
        <MobileHeader />
        <Sidebar />
        <div
          className={cn(
            "min-h-dvh min-w-0 overflow-x-hidden overflow-y-auto pt-16 lg:pt-0",
            SIDEBAR_INSET_CLASS,
          )}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
