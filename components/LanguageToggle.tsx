"use client";

import { useLang } from "@/lib/store/lang";

export default function LanguageToggle() {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      className="focus-ring rounded-full border border-goldline px-3 py-1.5 text-xs tracking-widest2 text-stone transition-colors hover:border-gold hover:text-gold"
      aria-label="Toggle language"
    >
      {lang === "en" ? "العربية" : "English"}
    </button>
  );
}
