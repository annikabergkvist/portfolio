"use client";

import { useEffect, useRef, useState } from "react";

/** Hero loop — file in `public/videos/`. */
const HERO_VIDEO_SRC = "/api/hero-video";

/** Slightly slower than real time; re-applied on `play` (some browsers reset on loop). */
const PLAYBACK_RATE = 0.78;

export function HeroBackgroundVideo({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

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

  if (failed) return null;

  return (
    <video
      key={HERO_VIDEO_SRC}
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      onError={() => setFailed(true)}
    >
      <source src={HERO_VIDEO_SRC} type="video/mp4" />
    </video>
  );
}
