"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { OrdersDB } from "@/lib/local-db";
import { Order, PaymentProvider } from "@/lib/types";
import { createTelrOrder } from "@/lib/payments/telr";
import { createStripeSession } from "@/lib/payments/stripe";
import { createPayTabsPayment } from "@/lib/payments/paytabs";
import Logo from "@/components/Logo";

const providers: { id: PaymentProvider; label: string }[] = [
  { id: "telr", label: "Telr" },
  { id: "stripe", label: "Stripe" },
  { id: "paytabs", label: "PayTabs" },
];

function PayContent() {
  const params = useParams<{ orderId: string }>();
  const search = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const [provider, setProvider] = useState<PaymentProvider>("telr");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOrder(OrdersDB.get(params.orderId) ?? null);
  }, [params.orderId]);

  // Handle return from a (simulated) payment redirect
  useEffect(() => {
    const status = search.get("status");
    const usedProvider = search.get("provider") as PaymentProvider | null;
    if (status === "success" && order) {
      OrdersDB.update(order.id, {
        payment_status: "Paid",
        payment_provider: usedProvider ?? undefined,
      });
      setOrder({ ...order, payment_status: "Paid", payment_provider: usedProvider ?? undefined });
    }
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  if (order === undefined) return null;
  if (order === null) {
    return <div className="container-x py-24 text-center text-stone">Order not found.</div>;
  }

  async function pay() {
    if (!order) return;
    setLoading(true);
    const returnUrl = `${window.location.origin}/pay/${order.id}`;
    let result;
    if (provider === "telr") {
      result = await createTelrOrder({ orderId: order.id, amount: order.total, returnUrl });
    } else if (provider === "stripe") {
      result = await createStripeSession({ orderId: order.id, amount: order.total, returnUrl });
    } else {
      result = await createPayTabsPayment({ orderId: order.id, amount: order.total, returnUrl });
    }
    setLoading(false);
    if (result.ok) window.location.href = result.redirectUrl;
  }

  const isPaid = order.payment_status === "Paid";

  return (
    <div className="min-h-screen bg-ink px-6 py-16">
      <div className="mx-auto max-w-md rounded-sm border border-goldline/60 bg-char p-8">
        <Logo size="sm" />

        <p className="mt-6 text-xs uppercase tracking-widest2 text-stone">Order #{order.id}</p>

        <ul className="mt-4 space-y-2 divide-y divide-goldline/30">
          {order.items.map((i) => (
            <li key={i.product_id} className="flex justify-between pt-2 first:pt-0 text-sm">
              <span className="text-stone">{i.name_en} × {i.qty}</span>
              <span className="text-bone">AED {i.price_aed * i.qty}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-between border-t border-goldline/40 pt-4 text-base">
          <span className="text-bone">Total</span>
          <span className="text-gold">AED {order.total}</span>
        </div>

        {isPaid ? (
          <div className="mt-8 rounded border border-gold/40 bg-gold/10 p-4 text-center text-sm text-gold">
            Payment received — thank you.
          </div>
        ) : (
          <>
            <div className="mt-8">
              <p className="mb-2 text-xs text-stone">Choose provider (test mode)</p>
              <div className="grid grid-cols-3 gap-2">
                {providers.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setProvider(p.id)}
                    className={`focus-ring rounded border px-3 py-2 text-xs transition-colors ${
                      provider === p.id ? "border-gold text-gold" : "border-goldline text-stone"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={pay}
              disabled={loading}
              className="focus-ring mt-6 w-full rounded-full bg-gold py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-gold2 disabled:opacity-50"
            >
              {loading ? "Redirecting…" : `Pay AED ${order.total}`}
            </button>
            <p className="mt-3 text-center text-[11px] text-stone">
              Test mode — no real charge is made until live keys are added in .env.local.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={null}>
      <PayContent />
    </Suspense>
  );
}
