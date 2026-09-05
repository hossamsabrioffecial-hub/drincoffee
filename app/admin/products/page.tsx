"use client";

import { useEffect, useRef, useState } from "react";
import { ProductsDB } from "@/lib/local-db";
import { Product } from "@/lib/types";
import ProductForm from "@/components/admin/ProductForm";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const dragIndex = useRef<number | null>(null);

  function refresh() {
    setProducts(ProductsDB.all());
  }

  useEffect(refresh, []);

  function handleSave(p: Product) {
    ProductsDB.upsert(p);
    setShowForm(false);
    setEditing(null);
    refresh();
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    ProductsDB.remove(id);
    refresh();
  }

  function onDragStart(i: number) {
    dragIndex.current = i;
  }
  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
  }
  function onDrop(i: number) {
    if (dragIndex.current === null || dragIndex.current === i) return;
    const reordered = [...products];
    const [moved] = reordered.splice(dragIndex.current, 1);
    reordered.splice(i, 0, moved);
    setProducts(reordered);
    ProductsDB.reorder(reordered.map((p) => p.id));
    dragIndex.current = null;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-bone">Products</h1>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="focus-ring rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink hover:bg-gold2"
        >
          Add product
        </button>
      </div>

      <p className="mt-2 text-xs text-stone">Drag rows to reorder how products appear in the store.</p>

      <div className="mt-6 overflow-hidden rounded-sm border border-goldline/60">
        <table className="w-full text-left text-sm">
          <thead className="bg-char2 text-xs uppercase tracking-widest2 text-stone">
            <tr>
              <th className="w-8"></th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-goldline/30 bg-char">
            {products.map((p, i) => (
              <tr
                key={p.id}
                draggable
                onDragStart={() => onDragStart(i)}
                onDragOver={onDragOver}
                onDrop={() => onDrop(i)}
                className="cursor-move"
              >
                <td className="px-4 py-3 text-stone">⠿</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt="" className="h-10 w-10 rounded object-cover" />
                    <div>
                      <p className="text-bone">{p.name_en}</p>
                      <p className="text-xs text-stone" dir="rtl">{p.name_ar}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-stone">{p.category}</td>
                <td className="px-4 py-3 text-gold">AED {p.price_aed}</td>
                <td className="px-4 py-3">
                  <span className={p.stock <= 5 ? "text-red-400" : "text-stone"}>{p.stock}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setEditing(p);
                        setShowForm(true);
                      }}
                      className="text-xs text-gold hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-xs text-stone hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <ProductForm
          initial={editing ?? undefined}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
