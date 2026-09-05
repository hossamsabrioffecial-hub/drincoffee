// Lightweight localStorage "database" so the store + admin work fully
// client-side today. Every function here is written to mirror what a
// Supabase query would look like (select/insert/update/delete on a
// table), so swapping to Supabase later is a matter of replacing the
// function bodies, not the call sites.

import { Product, Order, SiteContent } from "./types";
import { seedProducts } from "./data/products";
import { defaultContent } from "./data/content";

const KEYS = {
  products: "drincoffee_products",
  orders: "drincoffee_orders",
  content: "drincoffee_content",
  cart: "drincoffee_cart",
  adminAuth: "drincoffee_admin_auth",
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

// ---------------- Products ----------------
export const ProductsDB = {
  all(): Product[] {
    const list = read<Product[]>(KEYS.products, []);
    if (list.length === 0) {
      write(KEYS.products, seedProducts);
      return seedProducts;
    }
    return [...list].sort((a, b) => a.order - b.order);
  },
  get(id: string): Product | undefined {
    return this.all().find((p) => p.id === id);
  },
  upsert(product: Product) {
    const list = this.all();
    const idx = list.findIndex((p) => p.id === product.id);
    if (idx >= 0) list[idx] = product;
    else list.push(product);
    write(KEYS.products, list);
    return product;
  },
  remove(id: string) {
    const list = this.all().filter((p) => p.id !== id);
    write(KEYS.products, list);
  },
  reorder(orderedIds: string[]) {
    const list = this.all();
    const byId = new Map(list.map((p) => [p.id, p]));
    orderedIds.forEach((id, i) => {
      const p = byId.get(id);
      if (p) p.order = i;
    });
    write(KEYS.products, Array.from(byId.values()));
  },
  decrementStock(id: string, qty: number) {
    const list = this.all();
    const p = list.find((x) => x.id === id);
    if (p) p.stock = Math.max(0, p.stock - qty);
    write(KEYS.products, list);
  },
};

// ---------------- Orders ----------------
export const OrdersDB = {
  all(): Order[] {
    return read<Order[]>(KEYS.orders, []).sort((a, b) =>
      b.created_at.localeCompare(a.created_at)
    );
  },
  get(id: string): Order | undefined {
    return this.all().find((o) => o.id === id);
  },
  create(order: Order) {
    const list = read<Order[]>(KEYS.orders, []);
    list.push(order);
    write(KEYS.orders, list);
    return order;
  },
  update(id: string, patch: Partial<Order>) {
    const list = read<Order[]>(KEYS.orders, []);
    const idx = list.findIndex((o) => o.id === id);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...patch };
      write(KEYS.orders, list);
      return list[idx];
    }
    return undefined;
  },
};

// ---------------- Site content ----------------
export const ContentDB = {
  get(): SiteContent {
    return read<SiteContent>(KEYS.content, defaultContent);
  },
  set(content: SiteContent) {
    write(KEYS.content, content);
    return content;
  },
};

// ---------------- Admin auth (simple demo auth) ----------------
export const AdminAuthDB = {
  isLoggedIn(): boolean {
    return read<boolean>(KEYS.adminAuth, false);
  },
  login() {
    write(KEYS.adminAuth, true);
  },
  logout() {
    write(KEYS.adminAuth, false);
  },
};

export function toCSV(orders: Order[]): string {
  const header = [
    "Order ID",
    "Customer",
    "Phone",
    "Products",
    "Subtotal",
    "Delivery",
    "Total",
    "Status",
    "Payment Method",
    "Payment Status",
    "Date",
  ];
  const rows = orders.map((o) => [
    o.id,
    o.customer_name,
    o.phone,
    o.items.map((i) => `${i.name_en} x${i.qty}`).join("; "),
    o.subtotal.toFixed(2),
    o.delivery_fee.toFixed(2),
    o.total.toFixed(2),
    o.status,
    o.payment_method,
    o.payment_status,
    new Date(o.created_at).toLocaleString(),
  ]);
  const escape = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
  return [header, ...rows].map((r) => r.map(escape).join(",")).join("\n");
}
