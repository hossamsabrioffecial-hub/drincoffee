"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types";

export interface CartLine {
  product_id: string;
  name_en: string;
  name_ar: string;
  price_aed: number;
  weight: string;
  image: string;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  add: (product: Product, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  subtotal: () => number;
  count: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      add: (product, qty = 1) => {
        const lines = [...get().lines];
        const idx = lines.findIndex((l) => l.product_id === product.id);
        if (idx >= 0) {
          lines[idx] = { ...lines[idx], qty: lines[idx].qty + qty };
        } else {
          lines.push({
            product_id: product.id,
            name_en: product.name_en,
            name_ar: product.name_ar,
            price_aed: product.price_aed,
            weight: product.weight,
            image: product.image,
            qty,
          });
        }
        set({ lines, isOpen: true });
      },
      remove: (productId) =>
        set({ lines: get().lines.filter((l) => l.product_id !== productId) }),
      setQty: (productId, qty) =>
        set({
          lines: get()
            .lines.map((l) =>
              l.product_id === productId ? { ...l, qty: Math.max(1, qty) } : l
            ),
        }),
      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      subtotal: () =>
        get().lines.reduce((sum, l) => sum + l.price_aed * l.qty, 0),
      count: () => get().lines.reduce((sum, l) => sum + l.qty, 0),
    }),
    { name: "drincoffee_cart" }
  )
);
