"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useT } from "@/lib/i18n";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("order");
  const t = useT();

  return (
    <div className="container-x flex flex-col items-center py-32 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.5">
          <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="mt-6 font-display text-3xl text-bone">{t("order_placed")}</h1>
      {orderId && <p className="mt-2 text-sm text-gold">#{orderId}</p>}
      <p className="mt-4 max-w-sm text-sm text-stone">{t("order_placed_body")}</p>
      <Link href="/" className="mt-8 text-sm text-gold underline underline-offset-4">
        {t("back_home")}
      </Link>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
