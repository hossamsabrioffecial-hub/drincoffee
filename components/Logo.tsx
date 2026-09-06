"use client";

// Brand mark. If the admin has uploaded a logo image (Content Manager →
// Identity), that image is rendered. Otherwise this falls back to the
// built-in text wordmark: "DRINCOFFEE" with a coffee-bean icon standing in
// for the "O" in COFFEE, plus an optional "PREMIUM COFFEE" tagline.
// English-only brand name — no Arabic wordmark, per brand direction.

import { useEffect, useState } from "react";
import { ContentDB } from "@/lib/local-db";

const sizes = {
  sm: { text: "text-lg", bean: 15, img: "h-8", tagline: "text-[7px] mt-1 tracking-[0.35em]" },
  md: { text: "text-2xl", bean: 20, img: "h-12", tagline: "text-[9px] mt-1.5 tracking-[0.4em]" },
  lg: { text: "text-4xl md:text-6xl", bean: 40, img: "h-20 md:h-28", tagline: "text-xs md:text-sm mt-4 tracking-[0.5em]" },
} as const;

export default function Logo({
  size = "md",
  tagline = false,
  beanColor = "#c9a227",
  className = "",
  overrideSrc,
}: {
  size?: keyof typeof sizes;
  tagline?: boolean;
  beanColor?: string;
  className?: string;
  /** Skip reading from storage and use this src directly (or "" to force
   * the text wordmark). Used for live previews, e.g. in the admin
   * Content Manager, where the image hasn't been saved yet. */
  overrideSrc?: string;
}) {
  const s = sizes[size];
  const [storedUrl, setStoredUrl] = useState<string>("");

  useEffect(() => {
    if (overrideSrc === undefined) {
      setStoredUrl(ContentDB.get().logo_url || "");
    }
  }, [overrideSrc]);

  const logoUrl = overrideSrc !== undefined ? overrideSrc : storedUrl;

  if (logoUrl) {
    return (
      <div dir="ltr" className={`flex flex-col ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoUrl} alt="DRINCOFFEE" className={`${s.img} w-auto object-contain`} />
      </div>
    );
  }

  return (
    <div dir="ltr" className={`flex flex-col ${className}`}>
      <div className={`flex items-center ${s.text} font-sans font-semibold uppercase tracking-[0.1em]`}>
        <span>DRINC</span>
        <svg
          width={s.bean}
          height={s.bean}
          viewBox="0 0 40 40"
          fill="none"
          className="mx-[0.06em] inline-block shrink-0"
          aria-hidden="true"
        >
          <ellipse
            cx="20"
            cy="20"
            rx="17.5"
            ry="11"
            transform="rotate(-45 20 20)"
            stroke={beanColor}
            strokeWidth="2.4"
          />
          <path
            d="M11.5 23.5C15 20.5 15.5 15.5 20 12"
            stroke={beanColor}
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <span>FFEE</span>
      </div>
      {tagline && (
        <span className={`text-stone ${s.tagline} font-sans uppercase`}>
          Premium Coffee
        </span>
      )}
    </div>
  );
}
