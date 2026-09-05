// Stripe integration stub (international cards).
// Live docs: https://stripe.com/docs/payments/checkout
//
// Real flow: install the `stripe` package, then server-side create a
// Checkout Session with STRIPE_SECRET_KEY and redirect the customer to
// session.url. Stripe redirects back on success/cancel, and a webhook
// (STRIPE_WEBHOOK_SECRET) confirms payment server-side.
//
// This stub simulates that so the UI/flow works end-to-end without live
// keys.

export async function createStripeSession(params: {
  orderId: string;
  amount: number; // AED
  returnUrl: string;
}) {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey || secretKey.startsWith("sk_test_xxxx")) {
    return {
      ok: true,
      testMode: true,
      redirectUrl: `${params.returnUrl}?provider=stripe&status=success&test=1`,
    };
  }

  // --- Live implementation ---
  // import Stripe from "stripe";
  // const stripe = new Stripe(secretKey, { apiVersion: "2024-06-20" });
  // const session = await stripe.checkout.sessions.create({
  //   mode: "payment",
  //   line_items: [
  //     {
  //       price_data: {
  //         currency: "aed",
  //         product_data: { name: `DRINCOFFEE order ${params.orderId}` },
  //         unit_amount: Math.round(params.amount * 100),
  //       },
  //       quantity: 1,
  //     },
  //   ],
  //   success_url: `${params.returnUrl}?provider=stripe&status=success`,
  //   cancel_url: `${params.returnUrl}?provider=stripe&status=cancelled`,
  //   metadata: { orderId: params.orderId },
  // });
  // return { ok: true, redirectUrl: session.url };

  return {
    ok: true,
    testMode: true,
    redirectUrl: `${params.returnUrl}?provider=stripe&status=success&test=1`,
  };
}
