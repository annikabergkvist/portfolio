/**
 * Shared navigation for the desktop sidebar and mobile hamburger menu.
 */
export const SITE_EMAIL_ADDRESS = "annikabergkvist@hotmail.com" as const;
export const SITE_MAILTO = `mailto:${SITE_EMAIL_ADDRESS}` as const;

export const SITE_NAV_ITEMS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

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
