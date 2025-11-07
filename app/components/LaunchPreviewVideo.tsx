"use client";

import { useEffect, useRef, useState } from "react";

export function LaunchPreviewVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldAutoplay, setShouldAutoplay] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyPreference = (source: MediaQueryList | MediaQueryListEvent) => {
      const prefersReducedMotion = source.matches;
      const enableAutoplay = !prefersReducedMotion;

      setShouldAutoplay(enableAutoplay);

      if (prefersReducedMotion) {
        const node = videoRef.current;
        if (node) {
          node.pause();
          node.currentTime = 0;
        }
      } else {
        const node = videoRef.current;
        if (node) {
          const playPromise = node.play();
          if (typeof playPromise?.catch === "function") {
            playPromise.catch(() => {
              // Ignore autoplay rejections caused by browser policies.
            });
          }
        }
      }
    };

    applyPreference(mediaQuery);

    const listener = (event: MediaQueryListEvent) => applyPreference(event);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", listener);
    } else {
      mediaQuery.addListener(listener);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", listener);
      } else {
        mediaQuery.removeListener(listener);
      }
    };
  }, []);

  return (
    <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl border border-steel/60 bg-black/60">
      {/* Launch Preview Video start */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/100.mp4"
        preload="metadata"
        muted
        loop
        playsInline
        autoPlay={shouldAutoplay}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-carbon/40 to-carbon/80" />
      <div className="relative z-10 flex flex-col items-center justify-center gap-2 text-center">
        <span className="font-display text-base uppercase tracking-[0.3em] text-white md:text-lg">
          ALIXINDEX100 Launch Preview
        </span>
        <span className="text-xs uppercase tracking-[0.4em] text-grey400 md:text-sm">
          Coming Soon
        </span>
      </div>
      {/* Launch Preview Video end */}
    </div>
  );
}
