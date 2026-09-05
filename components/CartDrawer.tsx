"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/lib/store/cart";
import { useLang } from "@/lib/store/lang";
import { useT } from "@/lib/i18n";

export default function CartDrawer() {
  const { isOpen, close, lines, remove, setQty, subtotal } = useCart();
  const lang = useLang((s) => s.lang);
  const t = useT();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-goldline bg-char flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between border-b border-goldline/60 px-6 py-5">
              <h2 className="font-display text-xl text-bone">{t("cart")}</h2>
              <button onClick={close} className="focus-ring text-stone hover:text-gold" aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <p className="mt-10 text-center text-sm text-stone">{t("empty_cart")}</p>
              ) : (
                <ul className="space-y-5">
                  {lines.map((l) => (
                    <li key={l.product_id} className="flex gap-4">
                      <img src={l.image} alt="" className="h-20 w-20 rounded object-cover" />
                      <div className="flex-1">
                        <p className="text-sm text-bone">
                          {lang === "ar" ? l.name_ar : l.name_en}
                        </p>
                        <p className="text-xs text-stone">{l.weight}</p>
                        <div className="mt-2 flex items-center gap-3">
                          <input
                            type="number"
                            min={1}
                            value={l.qty}
                            onChange={(e) => setQty(l.product_id, parseInt(e.target.value) || 1)}
                            className="focus-ring w-14 rounded border border-goldline bg-ink px-2 py-1 text-xs text-bone"
                          />
                          <button
                            onClick={() => remove(l.product_id)}
                            className="text-xs text-stone underline-offset-2 hover:text-gold hover:underline"
                          >
                            {t("remove")}
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gold">AED {l.price_aed * l.qty}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-goldline/60 px-6 py-5">
                <div className="flex justify-between text-sm text-stone">
                  <span>{t("subtotal")}</span>
                  <span className="text-bone">AED {subtotal()}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={close}
                  className="mt-4 block w-full rounded-full bg-gold py-3 text-center text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-gold2"
                >
                  {t("checkout")}
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
