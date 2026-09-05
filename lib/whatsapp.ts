import { Order } from "./types";

export function buildOrderWhatsAppUrl(order: Order, whatsappNumber: string) {
  const lines = order.items
    .map((i) => `- ${i.name_en} x${i.qty} (${i.weight}) — AED ${i.price_aed * i.qty}`)
    .join("\n");

  const text = [
    `New order from DRINCOFFEE`,
    ``,
    `Order #${order.id}`,
    `Customer: ${order.customer_name}`,
    `Phone: ${order.phone}`,
    `Address: ${order.address}, ${order.city}`,
    ``,
    lines,
    ``,
    `Subtotal: AED ${order.subtotal}`,
    `Delivery: AED ${order.delivery_fee}`,
    `Total: AED ${order.total}`,
    `Payment: ${order.payment_method}`,
  ].join("\n");

  const digits = whatsappNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function openOrderWhatsApp(order: Order, whatsappNumber: string) {
  if (typeof window === "undefined") return;
  const url = buildOrderWhatsAppUrl(order, whatsappNumber);
  window.open(url, "_blank");
}
