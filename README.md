# Annika Bergkvist — Portfolio

Personal portfolio for a Design Engineer based in Sweden, built with Next.js, Tailwind CSS v4 and shadcn/ui.

**Live:** [annikabergkvist.se](https://annikabergkvist.se)

## Tech Stack

* Next.js 16 (App Router) + React 19
* TypeScript
* Tailwind CSS v4
* shadcn/ui
* Framer Motion
* Resend (contact form)
* Vercel (hosting)

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create `.env.local` in the project root:

```bash
RESEND_API_KEY=        # Resend API key
RESEND_FROM_EMAIL=     # e.g. hello@yourdomain.com
CONTACT_TO_EMAIL=      # where contact form emails are delivered
```

## Deploy

Hosted on Vercel. Set the same environment variables under Project → Settings → Environment Variables.
