"use client";

import Link from "next/link";
import { useCart } from "@/lib/store/cart";
import { useLang } from "@/lib/store/lang";
import { useT } from "@/lib/i18n";

export default function CartPage() {
  const { lines, remove, setQty, subtotal } = useCart();
  const lang = useLang((s) => s.lang);
  const t = useT();

  if (lines.length === 0) {
    return (
      <div className="container-x flex flex-col items-center py-24 text-center">
        <p className="text-stone">{t("empty_cart")}</p>
        <Link href="/products" className="mt-6 text-sm text-gold underline underline-offset-4">
          {t("continue_shopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x py-16">
      <h1 className="font-display text-4xl text-bone">{t("cart")}</h1>

      <div className="mt-10 grid gap-12 md:grid-cols-3">
        <div className="md:col-span-2 divide-y divide-goldline/40">
          {lines.map((l) => (
            <div key={l.product_id} className="flex gap-4 py-6">
              <img src={l.image} alt="" className="h-24 w-24 rounded object-cover" />
              <div className="flex-1">
                <p className="text-base text-bone">{lang === "ar" ? l.name_ar : l.name_en}</p>
                <p className="mt-1 text-xs text-stone">{l.weight}</p>
                <div className="mt-3 flex items-center gap-4">
                  <input
                    type="number"
                    min={1}
                    value={l.qty}
                    onChange={(e) => setQty(l.product_id, parseInt(e.target.value) || 1)}
                    className="focus-ring w-16 rounded border border-goldline bg-char2 px-2 py-1 text-sm text-bone"
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
            </div>
          ))}
        </div>

        <div className="h-fit rounded-sm border border-goldline/60 bg-char p-6">
          <div className="flex justify-between text-sm text-stone">
            <span>{t("subtotal")}</span>
            <span className="text-bone">AED {subtotal()}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block w-full rounded-full bg-gold py-3 text-center text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-gold2"
          >
            {t("checkout")}
          </Link>
        </div>
      </div>
    </div>
  );
}
