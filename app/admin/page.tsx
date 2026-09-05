"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { OrdersDB, ProductsDB } from "@/lib/local-db";
import { Order, Product } from "@/lib/types";
import StatCard from "@/components/admin/StatCard";

const LOW_STOCK_THRESHOLD = 5;

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setOrders(OrdersDB.all());
    setProducts(ProductsDB.all());
  }, []);

  const today = new Date().toDateString();
  const revenueToday = orders
    .filter((o) => new Date(o.created_at).toDateString() === today)
    .reduce((sum, o) => sum + o.total, 0);

  const lowStock = products.filter((p) => p.stock <= LOW_STOCK_THRESHOLD);
  const newOrders = orders.filter((o) => o.status === "New");

  return (
    <div>
      <h1 className="font-display text-3xl text-bone">Dashboard</h1>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <StatCard label="Total orders" value={String(orders.length)} />
        <StatCard label="Revenue today" value={`AED ${revenueToday}`} accent />
        <StatCard label="Low stock items" value={String(lowStock.length)} />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-sm border border-goldline/60 bg-char p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl text-bone">New orders</h2>
            <Link href="/admin/orders" className="text-xs text-gold hover:underline">
              View all
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-goldline/30">
            {newOrders.slice(0, 5).map((o) => (
              <li key={o.id} className="flex justify-between py-3 text-sm">
                <div>
                  <p className="text-bone">{o.customer_name}</p>
                  <p className="text-xs text-stone">#{o.id}</p>
                </div>
                <span className="text-gold">AED {o.total}</span>
              </li>
            ))}
            {newOrders.length === 0 && (
              <li className="py-6 text-center text-sm text-stone">No new orders.</li>
            )}
          </ul>
        </div>

        <div className="rounded-sm border border-goldline/60 bg-char p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl text-bone">Low stock</h2>
            <Link href="/admin/products" className="text-xs text-gold hover:underline">
              Manage
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-goldline/30">
            {lowStock.map((p) => (
              <li key={p.id} className="flex justify-between py-3 text-sm">
                <span className="text-bone">{p.name_en}</span>
                <span className="text-gold">{p.stock} left</span>
              </li>
            ))}
            {lowStock.length === 0 && (
              <li className="py-6 text-center text-sm text-stone">Stock levels look healthy.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
