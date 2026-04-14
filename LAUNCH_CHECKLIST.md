# Launch checklist — portfolio

Use this before pointing a custom domain or sharing widely.

## Domain & environment

- [ ] Set `NEXT_PUBLIC_SITE_URL` in the host (e.g. Vercel) to your canonical URL **without** a trailing slash (example: `https://www.annikabergkvist.se`).
- [ ] Confirm `robots.txt` and `sitemap.xml` use the correct host (they read from that env + Vercel fallback).
- [ ] Optional: add `www` → apex (or reverse) redirects so only one canonical URL is indexed.

## Assets

- [ ] `public/videos/bg3.mp4` exists and is optimized (compressed, reasonable bitrate; hero uses `preload="metadata"` to limit upfront download).
- [ ] `public/images/*` present: mockups, `about-me.jpg`, `vdff-desktop.png`, `ab-logo.svg`, etc.
- [ ] Run `npm run build` locally after adding assets.

## SEO & sharing

- [ ] Open Graph: default image is generated at `/opengraph-image` (see `src/app/opengraph-image.tsx`). Optionally add per-route OG later.
- [ ] Share a link in [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or similar to refresh cache after deploy.
- [ ] Project case studies already set `title`, `description`, and OG/Twitter fields in `generateMetadata`.

## Icons

- [ ] Favicon uses `/images/ab-logo.svg`. For **Apple touch icon**, add e.g. `app/apple-icon.png` (180×180) or set `apple` in `layout.tsx` `metadata.icons` once the file exists.
- [ ] Optional: `favicon.ico` in `app/` for older clients.

## Contact form (Resend)

- [ ] In Resend, verify your domain and ensure `hello@annikabergkvist.se` is allowed as a sender.
- [ ] In Vercel → Environment Variables (Production), add: `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (sender), and `CONTACT_TO_EMAIL` (recipient inbox).
- [ ] Redeploy after saving env vars.
- [ ] Test the live contact form; confirm delivery (and any forwarding rules to Hotmail if configured).

## Legal & trust

- [ ] Cookie banner copy matches reality (add analytics wording if you add Plausible/GA/etc.).
- [ ] Privacy page reflects how you actually handle data and contact.

## Performance

- [ ] Lighthouse (mobile) on home and one project page; fix any large layout shifts or oversized images.
- [ ] If hero video feels slow to start, consider a shorter clip, lower resolution, or a poster image + load video after `requestIdleCallback` / in-view.

## Final smoke test

- [ ] All work slugs open (`/work/...`).
- [ ] External links (live demos, GitHub) open in a new tab with `rel="noopener noreferrer"`.
- [ ] Contact form sends successfully on mobile; sidebar mail icon still opens `mailto:` as fallback.
