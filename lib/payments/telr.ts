// Telr (UAE) integration stub.
// Live docs: https://telr.com/support/api/
//
// Real flow: server calls Telr's "Hosted Payment Page" order.json endpoint
// with TELR_AUTH_KEY, gets back a payment page URL, and redirects the
// customer there. Telr then redirects back to your return_url with a
// status you verify server-side (via the same auth key) before marking
// the order Paid.
//
// This stub simulates that so the UI/flow works end-to-end without live
// keys. Replace `createTelrOrder` with a real fetch() once you have
// NEXT_PUBLIC_TELR_STORE_ID + TELR_AUTH_KEY in .env.local.

export async function createTelrOrder(params: {
  orderId: string;
  amount: number;
  returnUrl: string;
}) {
  const storeId = process.env.NEXT_PUBLIC_TELR_STORE_ID;
  const authKey = process.env.TELR_AUTH_KEY;

  if (!storeId || !authKey) {
    // TEST MODE — no live keys configured yet.
    return {
      ok: true,
      testMode: true,
      redirectUrl: `${params.returnUrl}?provider=telr&status=success&test=1`,
    };
  }

  // --- Live implementation (uncomment + fill once you have real keys) ---
  // const res = await fetch("https://secure.telr.com/gateway/order.json", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     method: "create",
  //     store: storeId,
  //     authkey: authKey,
  //     order: {
  //       cartid: params.orderId,
  //       test: process.env.TELR_TEST_MODE === "1" ? 1 : 0,
  //       amount: params.amount,
  //       currency: "AED",
  //       description: `DRINCOFFEE order ${params.orderId}`,
  //     },
  //     return: {
  //       authorised: params.returnUrl,
  //       declined: params.returnUrl,
  //       cancelled: params.returnUrl,
  //     },
  //   }),
  // });
  // const data = await res.json();
  // return { ok: true, redirectUrl: data.order.url };

  return {
    ok: true,
    testMode: true,
    redirectUrl: `${params.returnUrl}?provider=telr&status=success&test=1`,
  };
}
