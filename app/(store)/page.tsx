"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { ProductsDB, ContentDB } from "@/lib/local-db";
import { Product, SiteContent } from "@/lib/types";
import { defaultContent } from "@/lib/data/content";
import { useLang } from "@/lib/store/lang";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const features = [
  {
    icon: "M12 2v20M2 12h20",
    title_en: "Small-Batch Roasted",
    title_ar: "تحميص بدفعات صغيرة",
    body_en: "Roasted in limited runs, dated on every bag.",
    body_ar: "يتم تحميصها بكميات محدودة، ومؤرخة على كل كيس.",
  },
  {
    icon: "M3 12l6 6L21 6",
    title_en: "Rare, Sourced with Care",
    title_ar: "نادرة ومختارة بعناية",
    body_en: "Single-origin lots chosen for character, not volume.",
    body_ar: "دفعات أحادية المنشأ تُختار لطابعها المميز، لا لكميتها.",
  },
  {
    icon: "M3 7h18M3 12h18M3 17h18",
    title_en: "Delivered Across the UAE",
    title_ar: "التوصيل في جميع أنحاء الإمارات",
    body_en: "Fast, careful delivery to your door.",
    body_ar: "توصيل سريع وآمن حتى باب منزلك.",
  },
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const lang = useLang((s) => s.lang);

  useEffect(() => {
    setProducts(ProductsDB.all().slice(0, 4));
    setContent(ContentDB.get());
  }, []);

  return (
    <>
      <Hero />

      {/* Trust / feature strip */}
      <section className="border-b border-goldline/60 bg-char">
        <div className="container-x grid divide-y divide-goldline/30 py-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {features.map((f) => (
            <div key={f.title_en} className="flex items-center gap-4 px-4 py-6">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c9a227"
                strokeWidth="1.5"
                className="shrink-0"
              >
                <path d={f.icon} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <p className="text-sm text-bone">{lang === "ar" ? f.title_ar : f.title_en}</p>
                <p className="mt-0.5 text-xs text-stone">{lang === "ar" ? f.body_ar : f.body_en}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={reveal}
        transition={{ duration: 0.7 }}
        className="container-x py-28"
      >
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest2 text-gold">
              {lang === "ar" ? "مختارة بعناية" : "Curated Selection"}
            </span>
            <h2 className="mt-2 font-display text-4xl text-bone md:text-5xl">
              {lang === "ar" ? "المجموعة" : "The Collection"}
            </h2>
          </div>
          <div className="gold-rule flex-1 mx-6 hidden md:block" />
          <Link
            href="/products"
            className="hidden shrink-0 text-sm text-stone transition-colors hover:text-gold md:block"
          >
            {lang === "ar" ? "عرض الكل →" : "View all →"}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </motion.section>

      <section id="story" className="grain-overlay relative overflow-hidden border-t border-goldline/60 bg-char">
        <div className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-gold/[0.06] blur-[110px]" />
        <div className="container-x grid gap-14 py-28 md:grid-cols-2 md:items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={reveal}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs uppercase tracking-widest2 text-gold">
              {lang === "ar" ? "قصتنا" : "Our Story"}
            </span>
            <h2 className="mt-3 font-display text-4xl text-bone md:text-5xl">
              {lang === "ar" ? content.story_title_ar : content.story_title_en}
            </h2>
            <div className="mt-6 h-px w-14 bg-gold/50" />
            <p className="mt-6 max-w-md text-base leading-relaxed text-stone">
              {lang === "ar" ? content.story_body_ar : content.story_body_en}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -left-3 -top-3 h-16 w-16 border-l border-t border-gold/60" />
            <div className="absolute -bottom-3 -right-3 h-16 w-16 border-b border-r border-gold/60" />
            <div className="aspect-[4/3] overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1509785307050-d4066910ec1e?q=80&w=1200&auto=format&fit=crop"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
