// Brand wordmark: "DRINCOFFEE" with a coffee-bean icon standing in for the
// "O" in COFFEE, plus an optional "PREMIUM COFFEE" tagline underneath.
// English-only brand name — no Arabic wordmark, per brand direction.

const sizes = {
  sm: { text: "text-lg", bean: 15, tagline: "text-[7px] mt-1 tracking-[0.35em]" },
  md: { text: "text-2xl", bean: 20, tagline: "text-[9px] mt-1.5 tracking-[0.4em]" },
  lg: { text: "text-4xl md:text-6xl", bean: 40, tagline: "text-xs md:text-sm mt-4 tracking-[0.5em]" },
} as const;

export default function Logo({
  size = "md",
  tagline = false,
  beanColor = "#c9a227",
  className = "",
}: {
  size?: keyof typeof sizes;
  tagline?: boolean;
  beanColor?: string;
  className?: string;
}) {
  const s = sizes[size];

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
