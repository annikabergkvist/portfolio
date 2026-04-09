"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SITE_EMAIL_ADDRESS } from "@/lib/site-nav";
import { cn } from "@/lib/utils";

export function ContactDialogTrigger({
  children,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) {
  return (
    <DialogTrigger asChild>
      {children}
    </DialogTrigger>
  );
}

export function ContactDialog({ children }: { children: React.ReactNode }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = "Portfolio inquiry";
    const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
    const mailto = `mailto:${SITE_EMAIL_ADDRESS}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  return (
    <Dialog>
      {children}
      <DialogContent
        aria-describedby={undefined}
        className={cn(
          "before:pointer-events-none before:absolute before:inset-0 before:-z-10",
          "before:bg-[radial-gradient(55%_70%_at_20%_20%,color-mix(in_oklab,var(--ring)_20%,transparent),transparent_70%)]",
        )}
      >
        <DialogTitle className="sr-only">Contact</DialogTitle>
        <DialogDescription className="sr-only">
          Contact form dialog
        </DialogDescription>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.02em] text-foreground sm:text-5xl">
              Let&apos;s talk.
            </h2>
            <ul className="space-y-1 md:space-y-2 text-[17px] font-medium leading-relaxed text-muted-foreground">
              <li>Design Engineering</li>
              <li>UX/UI Design</li>
              <li>Frontend Development</li>
              <li>AI-assisted workflows &amp; Vibe coding</li>
            </ul>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <Field
              label="Name"
              input={
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={fieldClass}
                  autoComplete="name"
                  placeholder="Your name"
                />
              }
            />
            <Field
              label="Email"
              input={
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={fieldClass}
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  required
                />
              }
            />
            <Field
              label="Message"
              input={
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={cn(fieldClass, "min-h-32 resize-y")}
                  placeholder="Write your message here"
                  required
                />
              }
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="default"
                size="pill"
                className="w-full"
              >
                Send message
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, input }: { label: string; input: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {input}
    </label>
  );
}

const fieldClass = cn(
  "w-full rounded-md border border-input bg-background/50 px-3 py-2 text-[15px] text-foreground",
  "placeholder:text-muted-foreground/70",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
);

