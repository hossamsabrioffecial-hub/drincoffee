// PayTabs integration stub.
// Live docs: https://site.paytabs.com/en/developers/
//
// Real flow: server calls PayTabs' `/payment/request` endpoint with
// PAYTABS_SERVER_KEY, gets a `redirect_url`, and sends the customer
// there. PayTabs calls your webhook + return URL after payment.
//
// This stub simulates that so the UI/flow works end-to-end without live
// keys.

export async function createPayTabsPayment(params: {
  orderId: string;
  amount: number;
  returnUrl: string;
}) {
  const profileId = process.env.NEXT_PUBLIC_PAYTABS_PROFILE_ID;
  const serverKey = process.env.PAYTABS_SERVER_KEY;

  if (!profileId || !serverKey) {
    return {
      ok: true,
      testMode: true,
      redirectUrl: `${params.returnUrl}?provider=paytabs&status=success&test=1`,
    };
  }

  // --- Live implementation ---
  // const res = await fetch(
  //   `https://secure.paytabs.com/payment/request`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: serverKey,
  //     },
  //     body: JSON.stringify({
  //       profile_id: profileId,
  //       tran_type: "sale",
  //       tran_class: "ecom",
  //       cart_id: params.orderId,
  //       cart_currency: "AED",
  //       cart_amount: params.amount,
  //       cart_description: `DRINCOFFEE order ${params.orderId}`,
  //       return: params.returnUrl,
  //     }),
  //   }
  // );
  // const data = await res.json();
  // return { ok: true, redirectUrl: data.redirect_url };

  return {
    ok: true,
    testMode: true,
    redirectUrl: `${params.returnUrl}?provider=paytabs&status=success&test=1`,
  };
}
