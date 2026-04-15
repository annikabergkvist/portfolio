"use client";

import { useEffect, useRef, useState } from "react";

/** Hero loop — file in `public/videos/`. */
const HERO_VIDEO_SRC = "/api/hero-video";

/** Slightly slower than real time; re-applied on `play` (some browsers reset on loop). */
const PLAYBACK_RATE = 0.78;

export function HeroBackgroundVideo({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    function applyRate() {
      const el = ref.current;
      if (el) el.playbackRate = PLAYBACK_RATE;
    }

    applyRate();
    video.addEventListener("play", applyRate);
    video.addEventListener("loadeddata", applyRate);

    return () => {
      video.removeEventListener("play", applyRate);
      video.removeEventListener("loadeddata", applyRate);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const video = ref.current;
    if (!video) return;

    // Some browsers won't start playback when `autoplay` is toggled after mount.
    // Explicitly trigger playback when the hero enters the viewport.
    const p = video.play();
    if (p && typeof (p as Promise<void>).catch === "function") {
      (p as Promise<void>).catch(() => {
        // Autoplay may still be blocked in some contexts; poster remains visible.
      });
    }
  }, [inView]);

  if (failed) return null;

  return (
    <video
      key={HERO_VIDEO_SRC}
      ref={ref}
      className={className}
      autoPlay={inView}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      onError={() => setFailed(true)}
    >
      <source src={HERO_VIDEO_SRC} type="video/mp4" />
    </video>
  );
}
