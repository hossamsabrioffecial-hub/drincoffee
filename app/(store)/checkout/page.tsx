"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { useCart } from "@/lib/store/cart";
import { useLang } from "@/lib/store/lang";
import { useT } from "@/lib/i18n";
import { OrdersDB, ProductsDB, ContentDB } from "@/lib/local-db";
import { Order, PaymentMethod, SiteContent } from "@/lib/types";
import { defaultContent } from "@/lib/data/content";
import { openOrderWhatsApp } from "@/lib/whatsapp";

export default function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const lang = useLang((s) => s.lang);
  const t = useT();
  const router = useRouter();

  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("COD");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setContent(ContentDB.get());
  }, []);

  useEffect(() => {
    if (lines.length === 0) router.replace("/cart");
  }, [lines, router]);

  const deliveryFee = content.delivery_price;
  const total = subtotal() + deliveryFee;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone || !address || !city) return;
    setSubmitting(true);

    const order: Order = {
      id: uuid().slice(0, 8).toUpperCase(),
      customer_name: name,
      phone,
      address,
      city,
      items: lines.map((l) => ({
        product_id: l.product_id,
        name_en: l.name_en,
        name_ar: l.name_ar,
        price_aed: l.price_aed,
        qty: l.qty,
        weight: l.weight,
      })),
      subtotal: subtotal(),
      delivery_fee: deliveryFee,
      total,
      status: "New",
      payment_method: method,
      payment_status: method === "COD" ? "Unpaid" : "Unpaid",
      notes,
      created_at: new Date().toISOString(),
    };

    OrdersDB.create(order);
    lines.forEach((l) => ProductsDB.decrementStock(l.product_id, l.qty));

    // Fire WhatsApp notification to the store
    openOrderWhatsApp(order, content.whatsapp_number);

    clear();

    if (method === "Online") {
      router.push(`/pay/${order.id}`);
    } else {
      router.push(`/checkout/success?order=${order.id}`);
    }
  }

  return (
    <div className="container-x py-16">
      <h1 className="font-display text-4xl text-bone">{t("checkout")}</h1>

      <div className="mt-10 grid gap-12 md:grid-cols-3">
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-5">
          <div>
            <label className="mb-1.5 block text-xs text-stone">{t("full_name")}</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus-ring w-full rounded border border-goldline bg-char2 px-4 py-3 text-sm text-bone"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-stone">{t("phone")}</label>
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="971 5X XXX XXXX"
              className="focus-ring w-full rounded border border-goldline bg-char2 px-4 py-3 text-sm text-bone"
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs text-stone">{t("address")}</label>
              <input
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="focus-ring w-full rounded border border-goldline bg-char2 px-4 py-3 text-sm text-bone"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-stone">{t("city")}</label>
              <input
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="focus-ring w-full rounded border border-goldline bg-char2 px-4 py-3 text-sm text-bone"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-stone">{t("notes")}</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="focus-ring w-full rounded border border-goldline bg-char2 px-4 py-3 text-sm text-bone"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs text-stone">{t("payment_method")}</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setMethod("COD")}
                className={`focus-ring rounded border px-4 py-3 text-sm transition-colors ${
                  method === "COD" ? "border-gold text-gold" : "border-goldline text-stone"
                }`}
              >
                {t("cod")}
              </button>
              <button
                type="button"
                onClick={() => setMethod("Online")}
                className={`focus-ring rounded border px-4 py-3 text-sm transition-colors ${
                  method === "Online" ? "border-gold text-gold" : "border-goldline text-stone"
                }`}
              >
                {t("pay_online")}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="focus-ring w-full rounded-full bg-gold py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-gold2 disabled:opacity-50"
          >
            {t("place_order")}
          </button>
        </form>

        <div className="h-fit rounded-sm border border-goldline/60 bg-char p-6">
          <ul className="space-y-3 divide-y divide-goldline/30">
            {lines.map((l) => (
              <li key={l.product_id} className="flex justify-between pt-3 first:pt-0 text-sm">
                <span className="text-stone">
                  {lang === "ar" ? l.name_ar : l.name_en} × {l.qty}
                </span>
                <span className="text-bone">AED {l.price_aed * l.qty}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t border-goldline/40 pt-4 text-sm">
            <div className="flex justify-between text-stone">
              <span>{t("subtotal")}</span>
              <span className="text-bone">AED {subtotal()}</span>
            </div>
            <div className="flex justify-between text-stone">
              <span>{t("delivery")}</span>
              <span className="text-bone">AED {deliveryFee}</span>
            </div>
            <div className="flex justify-between text-base pt-2 border-t border-goldline/40">
              <span className="text-bone">{t("total")}</span>
              <span className="text-gold">AED {total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
