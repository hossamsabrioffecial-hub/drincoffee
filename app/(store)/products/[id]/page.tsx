"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProductsDB } from "@/lib/local-db";
import { Product } from "@/lib/types";
import { useLang } from "@/lib/store/lang";
import { useCart } from "@/lib/store/cart";
import { useT } from "@/lib/i18n";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [qty, setQty] = useState(1);
  const lang = useLang((s) => s.lang);
  const add = useCart((s) => s.add);
  const t = useT();

  useEffect(() => {
    setProduct(ProductsDB.get(params.id) ?? null);
  }, [params.id]);

  if (product === undefined) return null;
  if (product === null) {
    return (
      <div className="container-x py-32 text-center text-stone">
        <p>Not found.</p>
        <Link href="/products" className="mt-4 inline-block text-sm text-gold underline underline-offset-4">
          {t("continue_shopping")}
        </Link>
      </div>
    );
  }

  const outOfStock = product.stock <= 0;

  return (
    <div className="container-x py-16">
      <nav className="mb-10 flex items-center gap-2 text-xs text-stone">
        <Link href="/" className="hover:text-gold">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-gold">{t("shop_all")}</Link>
        <span>/</span>
        <span className="text-bone">{lang === "ar" ? product.name_ar : product.name_en}</span>
      </nav>

      <div className="grid gap-14 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -left-3 -top-3 h-14 w-14 border-l border-t border-gold/60" />
          <div className="absolute -bottom-3 -right-3 h-14 w-14 border-b border-r border-gold/60" />
          <div className="aspect-[4/5] overflow-hidden rounded-sm bg-char2">
            <img
              src={product.image}
              alt={lang === "ar" ? product.name_ar : product.name_en}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <span className="text-xs uppercase tracking-widest2 text-gold">{product.category}</span>
          <h1 className="mt-3 font-display text-5xl text-bone">
            {lang === "ar" ? product.name_ar : product.name_en}
          </h1>
          <p className="mt-2 text-sm text-stone">{product.weight}</p>

          <div className="mt-6 h-px w-14 bg-gold/50" />

          <p className="mt-6 text-3xl text-gold">AED {product.price_aed}</p>

          <p className="mt-6 max-w-md text-base leading-relaxed text-stone">
            {lang === "ar" ? product.description_ar : product.description_en}
          </p>

          {!outOfStock && product.stock <= 5 && (
            <p className="mt-4 text-xs text-gold">{t("only_left", { n: product.stock })}</p>
          )}

          <div className="mt-9 flex items-center gap-4">
            <input
              type="number"
              min={1}
              max={product.stock}
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              disabled={outOfStock}
              className="focus-ring w-20 rounded border border-goldline bg-char2 px-3 py-3 text-sm text-bone"
            />
            <button
              disabled={outOfStock}
              onClick={() => add(product, qty)}
              className="focus-ring flex-1 rounded-full bg-gold py-3.5 text-sm font-semibold tracking-wide text-ink transition-transform hover:scale-[1.01] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {outOfStock ? t("out_of_stock") : t("add_to_cart")}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
