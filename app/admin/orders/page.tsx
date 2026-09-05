"use client";

import { useEffect, useState } from "react";
import { OrdersDB, toCSV } from "@/lib/local-db";
import { Order, OrderStatus } from "@/lib/types";

const statuses: OrderStatus[] = ["New", "Preparing", "Delivered", "Cancelled"];

const statusColor: Record<OrderStatus, string> = {
  New: "text-gold",
  Preparing: "text-blue-300",
  Delivered: "text-green-400",
  Cancelled: "text-red-400",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selected, setSelected] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");

  function refresh() {
    const list = OrdersDB.all();
    setOrders(list);
    if (selected) {
      const updated = list.find((o) => o.id === selected.id);
      if (updated) setSelected(updated);
    }
  }

  useEffect(refresh, []);

  function updateStatus(id: string, status: OrderStatus) {
    OrdersDB.update(id, { status });
    refresh();
  }

  function createPaymentLink(order: Order) {
    const link = `${window.location.origin}/pay/${order.id}`;
    OrdersDB.update(order.id, { payment_link: link, payment_method: "Online" });
    refresh();
    navigator.clipboard?.writeText(link);
    alert(`Payment link copied:\n${link}`);
  }

  function exportCSV() {
    const csv = toCSV(orders);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `drincoffee-orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = statusFilter === "All" ? orders : orders.filter((o) => o.status === statusFilter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-bone">Orders</h1>
        <button
          onClick={exportCSV}
          className="focus-ring rounded-full border border-goldline px-5 py-2.5 text-sm text-bone hover:border-gold hover:text-gold"
        >
          Export CSV
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["All", ...statuses] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`focus-ring rounded-full border px-3 py-1.5 text-xs tracking-wide transition-colors ${
              statusFilter === s ? "border-gold text-gold" : "border-goldline text-stone"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-sm border border-goldline/60">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-char2 text-xs uppercase tracking-widest2 text-stone">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-goldline/30 bg-char">
            {filtered.map((o) => (
              <tr
                key={o.id}
                onClick={() => setSelected(o)}
                className="cursor-pointer hover:bg-char2"
              >
                <td className="px-4 py-3 text-bone">#{o.id}</td>
                <td className="px-4 py-3 text-bone">{o.customer_name}</td>
                <td className="px-4 py-3 text-stone">{o.phone}</td>
                <td className="px-4 py-3 text-gold">AED {o.total}</td>
                <td className={`px-4 py-3 ${statusColor[o.status]}`}>{o.status}</td>
                <td className="px-4 py-3 text-stone">
                  {new Date(o.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-stone">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-sm border border-goldline/60 bg-char p-6 md:p-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl text-bone">Order #{selected.id}</h2>
              <button onClick={() => setSelected(null)} className="focus-ring text-stone hover:text-gold">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="mt-6 space-y-1 text-sm">
              <p className="text-bone">{selected.customer_name}</p>
              <p className="text-stone">{selected.address}, {selected.city}</p>
              <a href={`tel:${selected.phone}`} className="mt-2 inline-flex items-center gap-2 text-gold hover:underline">
                📞 {selected.phone}
              </a>
            </div>

            <ul className="mt-5 space-y-2 divide-y divide-goldline/30">
              {selected.items.map((i) => (
                <li key={i.product_id} className="flex justify-between pt-2 first:pt-0 text-sm">
                  <span className="text-stone">{i.name_en} × {i.qty}</span>
                  <span className="text-bone">AED {i.price_aed * i.qty}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-1 border-t border-goldline/40 pt-4 text-sm">
              <div className="flex justify-between text-stone"><span>Subtotal</span><span className="text-bone">AED {selected.subtotal}</span></div>
              <div className="flex justify-between text-stone"><span>Delivery</span><span className="text-bone">AED {selected.delivery_fee}</span></div>
              <div className="flex justify-between text-base"><span className="text-bone">Total</span><span className="text-gold">AED {selected.total}</span></div>
            </div>

            {selected.notes && (
              <p className="mt-4 rounded bg-char2 p-3 text-xs text-stone">{selected.notes}</p>
            )}

            <div className="mt-6">
              <label className="mb-1.5 block text-xs text-stone">Status</label>
              <select
                value={selected.status}
                onChange={(e) => updateStatus(selected.id, e.target.value as OrderStatus)}
                className="focus-ring w-full rounded border border-goldline bg-char2 px-3 py-2.5 text-sm text-bone"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="mt-4 flex items-center justify-between rounded bg-char2 px-4 py-3 text-xs">
              <span className="text-stone">
                Payment: <span className="text-bone">{selected.payment_method}</span> · {selected.payment_status}
              </span>
              {selected.payment_status !== "Paid" && (
                <button
                  onClick={() => createPaymentLink(selected)}
                  className="text-gold hover:underline"
                >
                  Create payment link
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
