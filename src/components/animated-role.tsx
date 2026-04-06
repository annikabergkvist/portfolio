"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const roles = [
  "UX/UI Design",
  "Frontend Development",
  "AI & Vibe Coding",
  "Product Design",
] as const;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const CURTAIN_INSTANT = "animated-role__curtain--instant";
const CURTAIN_COVER = "animated-role__curtain--cover";
const CURTAIN_GONE = "animated-role__curtain--gone";

const fadeClass = "transition-opacity duration-300 ease-out";

export type AnimatedRoleProps = {
  className?: string;
};

export function AnimatedRole({ className }: AnimatedRoleProps) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
    let intervalId: ReturnType<typeof setInterval> | null = null;

    function clearPendingTimeouts() {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    }

    function stopAnimationLoop() {
      clearPendingTimeouts();
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }

    function schedule(fn: () => void, ms: number) {
      const id = setTimeout(fn, ms);
      timeoutsRef.current.push(id);
    }

    function setFadeVisible(visible: boolean, instant = false) {
      const line = lineRef.current;
      if (!line) return;
      if (instant) {
        const prevTransition = line.style.transition;
        line.style.transition = "none";
        line.classList.toggle("opacity-0", !visible);
        line.classList.toggle("opacity-100", visible);
        void line.offsetHeight;
        line.style.transition = prevTransition;
        return;
      }
      line.classList.toggle("opacity-0", !visible);
      line.classList.toggle("opacity-100", visible);
    }

    function applyReducedMotion() {
      const curtain = curtainRef.current;
      const word = wordRef.current;
      if (!curtain || !word) return;

      stopAnimationLoop();
      word.textContent = roles.join(" · ");
      setFadeVisible(true);
    }

    function animate() {
      const curtain = curtainRef.current;
      const word = wordRef.current;
      if (!curtain || !word) return;

      clearPendingTimeouts();

      /* Hide before swapping text so the new word does not flash one frame at full opacity */
      setFadeVisible(false, true);
      word.textContent = roles[indexRef.current];

      curtain.classList.add(CURTAIN_INSTANT);
      curtain.classList.remove(CURTAIN_COVER, CURTAIN_GONE);

      schedule(() => {
        curtain.classList.remove(CURTAIN_INSTANT);
        curtain.classList.add(CURTAIN_COVER);
      }, 50);

      schedule(() => {
        setFadeVisible(true, false);
      }, 950);

      schedule(() => {
        curtain.classList.remove(CURTAIN_COVER);
        curtain.classList.add(CURTAIN_GONE);
      }, 1600);

      indexRef.current = (indexRef.current + 1) % roles.length;
    }

    function startAnimationLoop() {
      if (intervalId !== null) return;
      animate();
      intervalId = setInterval(animate, 6500);
    }

    function syncMotionPreference() {
      if (mq.matches) {
        applyReducedMotion();
        return;
      }

      const word = wordRef.current;
      if (word) {
        word.textContent = roles[indexRef.current];
      }

      startAnimationLoop();
    }

    syncMotionPreference();
    mq.addEventListener("change", syncMotionPreference);

    return () => {
      mq.removeEventListener("change", syncMotionPreference);
      stopAnimationLoop();
    };
  }, []);

  return (
    <div
      className={cn(
        /* w-max for the + line + word; max-w-full inside MAIN_CONTENT */
        "animated-role relative inline-block h-[1.2em] w-max min-w-0 max-w-full",
        className,
      )}
    >
      <span className="animated-role__text relative block h-full font-bold leading-none tracking-[-0.05em] md:tracking-[-0.04em]">
        <span className="animated-role__word-slot relative inline-block h-full overflow-hidden align-baseline">
          <span
            ref={lineRef}
            className={cn(
              "animated-role__line relative z-0 inline-flex items-baseline gap-4 whitespace-nowrap",
              fadeClass,
              "opacity-0",
            )}
          >
            <span className="text-muted-foreground" aria-hidden>
              +
            </span>
            <span ref={wordRef} className="animated-role__word text-foreground">
              {roles[0]}
            </span>
          </span>
          <div
            ref={curtainRef}
            className={cn(
              "animated-role__curtain absolute top-0 left-0 z-[1] h-full w-[110%] bg-primary",
              CURTAIN_INSTANT,
            )}
            aria-hidden
          />
        </span>
      </span>
    </div>
  );
}
