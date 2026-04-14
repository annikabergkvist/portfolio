/**
 * Shared navigation for the desktop sidebar and mobile hamburger menu.
 * Contact opens the dialog (no on-page section); see sidebar / mobile-header.
 *
 * Set `NEXT_PUBLIC_SITE_EMAIL` in Vercel (or `.env.local`) to override without code changes.
 */
const envEmail = process.env.NEXT_PUBLIC_SITE_EMAIL?.trim();
export const SITE_EMAIL_ADDRESS =
  envEmail && envEmail.length > 0
    ? envEmail
    : "annikabergkvist@hotmail.com";
export const SITE_MAILTO = `mailto:${SITE_EMAIL_ADDRESS}`;

export type SiteNavItem =
  | { type: "anchor"; href: string; label: string }
  | { type: "contact"; label: "Contact" };

export const SITE_NAV_ITEMS: SiteNavItem[] = [
  { type: "anchor", href: "/#work", label: "Work" },
  { type: "anchor", href: "/#about", label: "About" },
  { type: "contact", label: "Contact" },
];

export const SITE_SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/annikabergkvist/",
    label: "LinkedIn",
  },
  {
    href: "https://github.com/annikabergkvist",
    label: "GitHub",
  },
  {
    href: SITE_MAILTO,
    label: "Email",
  },
] as const;
