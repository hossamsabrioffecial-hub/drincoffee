"use client";

import Link from "next/link";
import { Product } from "@/lib/types";
import { useLang } from "@/lib/store/lang";
import { useCart } from "@/lib/store/cart";
import { useT } from "@/lib/i18n";

export default function ProductCard({ product }: { product: Product }) {
  const lang = useLang((s) => s.lang);
  const add = useCart((s) => s.add);
  const t = useT();
  const outOfStock = product.stock <= 0;

  return (
    <div className="group">
      <Link
        href={`/products/${product.id}`}
        className="focus-ring relative block overflow-hidden rounded-sm bg-char2 ring-1 ring-goldline/40 transition-all duration-500 group-hover:ring-gold/70"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={product.image}
            alt={lang === "ar" ? product.name_ar : product.name_en}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {outOfStock && (
            <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[10px] tracking-widest2 text-stone backdrop-blur">
              {t("out_of_stock")}
            </span>
          )}

          {/* Quick-add button revealed on hover */}
          {!outOfStock && (
            <button
              onClick={(e) => {
                e.preventDefault();
                add(product, 1);
              }}
              className="focus-ring absolute inset-x-3 bottom-3 translate-y-3 rounded-full bg-gold/95 py-2.5 text-xs font-semibold tracking-widest2 text-ink opacity-0 backdrop-blur transition-all duration-300 hover:bg-gold2 group-hover:translate-y-0 group-hover:opacity-100"
            >
              {t("add_to_cart")}
            </button>
          )}
        </div>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <Link href={`/products/${product.id}`} className="focus-ring">
            <h3 className="font-display text-lg text-bone transition-colors group-hover:text-gold">
              {lang === "ar" ? product.name_ar : product.name_en}
            </h3>
          </Link>
          <p className="mt-1 text-xs tracking-wide text-stone">{product.weight}</p>
        </div>
        <p className="whitespace-nowrap text-sm text-gold">AED {product.price_aed}</p>
      </div>
    </div>
  );
}
