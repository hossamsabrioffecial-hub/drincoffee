"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/store/lang";
import { useT } from "@/lib/i18n";
import { ContentDB } from "@/lib/local-db";
import { SiteContent } from "@/lib/types";
import { defaultContent } from "@/lib/data/content";
import Logo from "./Logo";

export default function Footer() {
  const lang = useLang((s) => s.lang);
  const t = useT();
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    setContent(ContentDB.get());
  }, []);

  return (
    <footer id="contact" className="border-t border-goldline/60 mt-24">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo size="sm" />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone">
              {lang === "ar" ? content.hero_subtitle_ar : content.hero_subtitle_en}
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest2 text-stone">
              {t("nav_contact")}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-bone">
              <li>
                <a
                  href={`https://wa.me/${content.whatsapp_number}`}
                  target="_blank"
                  className="transition-colors hover:text-gold"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={content.instagram_url}
                  target="_blank"
                  className="transition-colors hover:text-gold"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest2 text-stone">DRINCOFFEE</h4>
            <p className="mt-4 text-sm text-stone">
              &copy; {new Date().getFullYear()} DRINCOFFEE. {t("footer_rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
