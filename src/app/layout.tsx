import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Sidebar, SIDEBAR_INSET_CLASS } from "@/components/sidebar";
import { cn } from "@/lib/utils";
import "./globals.css";

/**
 * DM Sans från Google Fonts (next/font): variabeln --font-sans sätts på <html>
 * och används i globals.css (body font-family + ev. font-sans-utilities).
 */
const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "900"],
});

/**
 * Metadata används av Next för <title>, <meta description>, Open Graph, m.m.
 * Syns i flikens titel och när länken delas — inte själva sidans innehåll.
 */
export const metadata: Metadata = {
  title: "Annika Bergkvist — Design Engineer",
  description:
    "Design Engineer based in Kristianstad, Sweden. Bridging product design and frontend development.",
};

/**
 * RootLayout omsluter ALLA sidor i app/ (App Router).
 * children = den aktuella sidans innehåll (page.tsx för "/", m.m.).
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
        /* "dark" aktiverar .dark-variablerna i globals.css och gör att Tailwinds
           dark:*-klasser matchar (t.ex. i shadcn-knappar). */
        "dark"
      )}
    >
      {/*
        Sidebar är fixed — den tar inte plats i flexflödet. SIDEBAR_INSET_CLASS (pl-24) skjuter
        in huvudinnehållet så det inte hamnar under panelen.
        min-h-dvh + overflow-auto: långt innehåll scrollar i huvudytan.
      */}
      <body className="min-h-dvh">
        <Sidebar />
        <div
          className={cn(
            "min-h-dvh min-w-0 overflow-auto",
            SIDEBAR_INSET_CLASS
          )}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
