"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type Phase = "typing" | "holding" | "deleting";

type TypewriterRoleProps = {
  roles: readonly string[];
  className?: string;
  /** ms per character, before variance */
  baseSpeedMs?: number;
  /** 0..1, how much randomness to add to speed */
  variance?: number;
  /** pause when a word is fully typed */
  holdMs?: number;
  /** pause after deleting before typing next */
  betweenMs?: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function jitter(ms: number, variance: number) {
  const v = clamp(variance, 0, 1);
  const mult = 1 + (Math.random() * 2 - 1) * v;
  return Math.max(18, Math.round(ms * mult));
}

export function TypewriterRole({
  roles,
  className,
  baseSpeedMs = 60,
  variance = 0.42,
  holdMs = 1150,
  betweenMs = 240,
}: TypewriterRoleProps) {
  const safeRoles = useMemo(() => roles.filter(Boolean), [roles]);
  const [reduced, setReduced] = useState(false);
  const [text, setText] = useState(safeRoles[0] ?? "");

  const phaseRef = useRef<Phase>("typing");
  const indexRef = useRef(0);
  const charRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;

    if (safeRoles.length === 0) return;

    function clearTimer() {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    function step() {
      const role = safeRoles[indexRef.current] ?? "";
      const phase = phaseRef.current;

      if (phase === "typing") {
        charRef.current = Math.min(role.length, charRef.current + 1);
        setText(role.slice(0, charRef.current));
        if (charRef.current >= role.length) {
          phaseRef.current = "holding";
          timeoutRef.current = setTimeout(step, holdMs);
          return;
        }

        // Small hesitation after spaces and punctuation
        const last = role.charAt(charRef.current - 1);
        const extra =
          last === " " ? 60 : last === "&" || last === "/" ? 45 : 0;
        timeoutRef.current = setTimeout(
          step,
          jitter(baseSpeedMs + extra, variance),
        );
        return;
      }

      if (phase === "holding") {
        phaseRef.current = "deleting";
        timeoutRef.current = setTimeout(step, betweenMs);
        return;
      }

      // deleting
      charRef.current = Math.max(0, charRef.current - 1);
      setText(role.slice(0, charRef.current));
      if (charRef.current <= 0) {
        indexRef.current = (indexRef.current + 1) % safeRoles.length;
        phaseRef.current = "typing";
        timeoutRef.current = setTimeout(step, betweenMs);
        return;
      }
      timeoutRef.current = setTimeout(step, jitter(36, variance * 0.65));
    }

    // Reset to a clean cycle whenever roles change
    phaseRef.current = "typing";
    indexRef.current = 0;
    charRef.current = 0;
    clearTimer();
    timeoutRef.current = setTimeout(step, betweenMs);

    return clearTimer;
  }, [safeRoles, reduced, baseSpeedMs, variance, holdMs, betweenMs]);

  const displayText = reduced ? safeRoles.join(" · ") : text;

  return (
    <span
      className={cn(
        "inline-flex min-w-0 max-w-full items-baseline gap-4 whitespace-nowrap",
        className,
      )}
      aria-label={`+ ${displayText}`}
    >
      <span className="text-muted-foreground" aria-hidden>
        +
      </span>
      <span className="min-w-0 text-foreground">
        {displayText}
        <span className="typewriter-cursor" aria-hidden />
      </span>
    </span>
  );
}

