"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Lang = "en" | "ar";

interface LangState {
  lang: Lang;
  toggle: () => void;
  set: (l: Lang) => void;
}

export const useLang = create<LangState>()(
  persist(
    (set, get) => ({
      lang: "en",
      toggle: () => set({ lang: get().lang === "en" ? "ar" : "en" }),
      set: (l) => set({ lang: l }),
    }),
    { name: "drincoffee_lang" }
  )
);
