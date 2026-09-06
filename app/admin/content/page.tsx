"use client";

import { useEffect, useState } from "react";
import { ContentDB } from "@/lib/local-db";
import { SiteContent } from "@/lib/types";
import { defaultContent } from "@/lib/data/content";
import Logo from "@/components/Logo";

function Field({
  label,
  value,
  onChange,
  textarea = false,
  dir = "ltr",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs text-stone">{label}</label>
      {textarea ? (
        <textarea
          dir={dir}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="focus-ring w-full rounded border border-goldline bg-char2 px-3 py-2.5 text-sm text-bone"
        />
      ) : (
        <input
          dir={dir}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="focus-ring w-full rounded border border-goldline bg-char2 px-3 py-2.5 text-sm text-bone"
        />
      )}
    </div>
  );
}

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setContent(ContentDB.get());
  }, []);

  function set<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent((c) => ({ ...c, [key]: value }));
    setSaved(false);
  }

  function save() {
    ContentDB.set(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set("logo_url", reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-bone">Content</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <section className="rounded-sm border border-goldline/60 bg-char p-6 lg:col-span-2">
          <h2 className="font-display text-xl text-bone">Identity</h2>
          <p className="mt-1 text-xs text-stone">
            Upload your logo to replace the built-in text wordmark everywhere it appears
            (header, footer, admin sidebar, checkout, payment page).
          </p>

          <div className="mt-5 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="flex h-28 w-56 items-center justify-center rounded border border-goldline/60 bg-char2 px-4">
              <Logo size="md" tagline={!content.logo_url} overrideSrc={content.logo_url} />
            </div>

            <div className="flex flex-col gap-3">
              <label className="focus-ring inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-goldline bg-char2 px-4 py-2 text-xs text-bone hover:border-gold hover:text-gold">
                Upload logo image
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>

              {content.logo_url && (
                <button
                  onClick={() => set("logo_url", "")}
                  className="w-fit text-xs text-stone underline-offset-2 hover:text-red-400 hover:underline"
                >
                  Remove logo — use text wordmark instead
                </button>
              )}

              <p className="max-w-sm text-[11px] text-stone">
                Best results: a transparent PNG or SVG, roughly 400×120px (wide, not square).
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-sm border border-goldline/60 bg-char p-6">
          <h2 className="font-display text-xl text-bone">Hero</h2>
          <div className="mt-4 space-y-4">
            <Field label="Title (EN)" value={content.hero_title_en} onChange={(v) => set("hero_title_en", v)} />
            <Field label="Title (AR)" value={content.hero_title_ar} onChange={(v) => set("hero_title_ar", v)} dir="rtl" />
            <Field label="Subtitle (EN)" value={content.hero_subtitle_en} onChange={(v) => set("hero_subtitle_en", v)} textarea />
            <Field label="Subtitle (AR)" value={content.hero_subtitle_ar} onChange={(v) => set("hero_subtitle_ar", v)} textarea dir="rtl" />
          </div>
        </section>

        <section className="rounded-sm border border-goldline/60 bg-char p-6">
          <h2 className="font-display text-xl text-bone">Story</h2>
          <div className="mt-4 space-y-4">
            <Field label="Title (EN)" value={content.story_title_en} onChange={(v) => set("story_title_en", v)} />
            <Field label="Title (AR)" value={content.story_title_ar} onChange={(v) => set("story_title_ar", v)} dir="rtl" />
            <Field label="Body (EN)" value={content.story_body_en} onChange={(v) => set("story_body_en", v)} textarea />
            <Field label="Body (AR)" value={content.story_body_ar} onChange={(v) => set("story_body_ar", v)} textarea dir="rtl" />
          </div>
        </section>

        <section className="rounded-sm border border-goldline/60 bg-char p-6 lg:col-span-2">
          <h2 className="font-display text-xl text-bone">Store settings</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Field label="Instagram URL" value={content.instagram_url} onChange={(v) => set("instagram_url", v)} />
            <Field label="WhatsApp number (no +)" value={content.whatsapp_number} onChange={(v) => set("whatsapp_number", v)} />
            <Field
              label="Delivery price (AED)"
              value={String(content.delivery_price)}
              onChange={(v) => set("delivery_price", parseFloat(v) || 0)}
            />
          </div>
        </section>
      </div>

      <button
        onClick={save}
        className="focus-ring mt-8 rounded-full bg-gold px-8 py-3 text-sm font-semibold text-ink hover:bg-gold2"
      >
        Save changes
      </button>
      {saved && <span className="ml-4 text-sm text-gold">Saved.</span>}
    </div>
  );
}
