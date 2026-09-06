"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/store/lang";
import { ContentDB } from "@/lib/local-db";
import { SiteContent } from "@/lib/types";
import { defaultContent } from "@/lib/data/content";
import { useT } from "@/lib/i18n";
import { parseVideoUrl } from "@/lib/video";
import Logo from "./Logo";

export default function Hero() {
  const lang = useLang((s) => s.lang);
  const t = useT();
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    setContent(ContentDB.get());
  }, []);

  const video = parseVideoUrl(content.hero_video_url || "");

  return (
    <section className="grain-overlay relative overflow-hidden border-b border-goldline/60 bg-ink">
      {/* Background photo, dimmed and vignetted so text stays crisp */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="h-full w-full scale-105 object-cover opacity-[0.28]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/75 to-ink" />
        <div className="absolute inset-0 bg-radial-vignette" />
      </div>

      {/* Ambient gold glow blobs */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 animate-float-slow rounded-full bg-gold/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 animate-float-slower rounded-full bg-gold/[0.08] blur-[100px]" />

      <div className="container-x relative z-10 flex min-h-[92vh] flex-col items-center justify-center py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Logo size="lg" tagline className="items-center gold-glow" />
        </motion.div>

        {video && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="gold-glow mt-8 w-full max-w-2xl overflow-hidden rounded-sm ring-1 ring-goldline/60"
          >
            <div className="aspect-video w-full bg-black">
              {video.kind === "file" ? (
                <video
                  src={video.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <iframe
                  src={video.embedUrl}
                  className="h-full w-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  title="DRINCOFFEE promo video"
                />
              )}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-8 h-px w-16 bg-gold/50"
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 max-w-3xl font-display text-6xl leading-[1.05] text-bone md:text-8xl"
        >
          {lang === "ar" ? content.hero_title_ar : content.hero_title_en}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-7 max-w-md text-base leading-relaxed text-stone md:text-lg"
        >
          {lang === "ar" ? content.hero_subtitle_ar : content.hero_subtitle_en}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-11 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href="/products"
            className="focus-ring group relative overflow-hidden rounded-full bg-gold px-10 py-3.5 text-sm font-semibold tracking-wide text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            {t("shop_all")}
          </Link>
          <Link
            href="/#story"
            className="focus-ring rounded-full border border-goldline px-10 py-3.5 text-sm tracking-wide text-stone transition-colors hover:border-gold hover:text-gold"
          >
            {lang === "ar" ? "قصتنا" : "Our Story"}
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-goldline p-1.5"
        >
          <div className="h-1.5 w-1 rounded-full bg-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
