"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { ProductsDB } from "@/lib/local-db";
import { Product, Category } from "@/lib/types";
import { useT } from "@/lib/i18n";

const categories: Category[] = ["Bag", "Tin", "Capsule"];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<Category | "All">("All");
  const t = useT();

  useEffect(() => {
    setProducts(ProductsDB.all());
  }, []);

  const filtered = useMemo(
    () => (filter === "All" ? products : products.filter((p) => p.category === filter)),
    [products, filter]
  );

  return (
    <div className="grain-overlay relative border-b border-goldline/60">
      <div className="container-x py-20">
        <span className="text-xs uppercase tracking-widest2 text-gold">DRINCOFFEE</span>
        <h1 className="mt-2 font-display text-5xl text-bone md:text-6xl">{t("shop_all")}</h1>

        <div className="mt-10 flex flex-wrap gap-3">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`focus-ring rounded-full border px-5 py-2 text-xs tracking-widest2 transition-colors ${
                filter === c
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-goldline text-stone hover:border-gold hover:text-gold"
              }`}
            >
              {c === "All" ? t("all") : c}
            </button>
          ))}
        </div>

        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3"
        >
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-stone">No products in this category yet.</p>
        )}
      </div>
    </div>
  );
}
