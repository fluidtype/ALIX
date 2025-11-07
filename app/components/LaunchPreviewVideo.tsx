"use client";

import { useEffect, useState } from "react";

export function LaunchPreviewVideo() {
  const [shouldAutoplay, setShouldAutoplay] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateAutoplay = (source: MediaQueryListEvent | MediaQueryList) => {
      setShouldAutoplay(!source.matches);
    };

    updateAutoplay(mediaQuery);

    const listener = (event: MediaQueryListEvent) => updateAutoplay(event);

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
