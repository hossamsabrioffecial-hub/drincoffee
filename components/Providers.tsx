"use client";

import { useEffect } from "react";
import { useLang } from "@/lib/store/lang";

export default function Providers({ children }: { children: React.ReactNode }) {
  const lang = useLang((s) => s.lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return <>{children}</>;
}
