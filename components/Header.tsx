"use client";

import Link from "next/link";
import { useLang } from "@/lib/store/lang";
import { useCart } from "@/lib/store/cart";
import { useT } from "@/lib/i18n";
import LanguageToggle from "./LanguageToggle";
import Logo from "./Logo";

export default function Header() {
  const lang = useLang((s) => s.lang);
  const count = useCart((s) => s.count());
  const openCart = useCart((s) => s.open);
  const t = useT();

  return (
    <header className="sticky top-0 z-40 border-b border-goldline/60 bg-ink/90 backdrop-blur">
      <div className="container-x flex h-20 items-center justify-between">
        <Link href="/" className="text-bone">
          <Logo size="sm" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/products" className="text-sm text-stone transition-colors hover:text-gold">
            {t("nav_shop")}
          </Link>
          <Link href="/#story" className="text-sm text-stone transition-colors hover:text-gold">
            {t("nav_story")}
          </Link>
          <Link href="/#contact" className="text-sm text-stone transition-colors hover:text-gold">
            {t("nav_contact")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <button
            onClick={openCart}
            className="focus-ring relative flex h-10 w-10 items-center justify-center rounded-full border border-goldline text-bone transition-colors hover:border-gold hover:text-gold"
            aria-label={t("cart")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 4h2l2.4 12.4a2 2 0 002 1.6h8.2a2 2 0 002-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="21" r="1" />
              <circle cx="18" cy="21" r="1" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-ink">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
