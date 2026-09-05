"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Product, Category } from "@/lib/types";

const categories: Category[] = ["Bag", "Tin", "Capsule"];

export default function ProductForm({
  initial,
  onSave,
  onClose,
}: {
  initial?: Product;
  onSave: (p: Product) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Product>(
    initial ?? {
      id: uuid(),
      name_en: "",
      name_ar: "",
      description_en: "",
      description_ar: "",
      price_aed: 0,
      weight: "",
      stock: 0,
      category: "Bag",
      image: "",
      order: 999,
      created_at: new Date().toISOString(),
    }
  );

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, image: reader.result as string }));
    reader.readAsDataURL(file);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <form
        onSubmit={submit}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-sm border border-goldline/60 bg-char p-6 md:p-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-bone">
            {initial ? "Edit product" : "Add product"}
          </h2>
          <button type="button" onClick={onClose} className="focus-ring text-stone hover:text-gold">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs text-stone">Name (EN)</label>
            <input
              required
              value={form.name_en}
              onChange={(e) => setForm({ ...form, name_en: e.target.value })}
              className="focus-ring w-full rounded border border-goldline bg-char2 px-3 py-2.5 text-sm text-bone"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-stone">Name (AR)</label>
            <input
              required
              dir="rtl"
              value={form.name_ar}
              onChange={(e) => setForm({ ...form, name_ar: e.target.value })}
              className="focus-ring w-full rounded border border-goldline bg-char2 px-3 py-2.5 text-sm text-bone"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-stone">Price (AED)</label>
            <input
              required
              type="number"
              min={0}
              value={form.price_aed}
              onChange={(e) => setForm({ ...form, price_aed: parseFloat(e.target.value) || 0 })}
              className="focus-ring w-full rounded border border-goldline bg-char2 px-3 py-2.5 text-sm text-bone"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-stone">Weight</label>
            <input
              required
              placeholder="250g"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
              className="focus-ring w-full rounded border border-goldline bg-char2 px-3 py-2.5 text-sm text-bone"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-stone">Stock</label>
            <input
              required
              type="number"
              min={0}
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })}
              className="focus-ring w-full rounded border border-goldline bg-char2 px-3 py-2.5 text-sm text-bone"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-stone">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
              className="focus-ring w-full rounded border border-goldline bg-char2 px-3 py-2.5 text-sm text-bone"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs text-stone">Description (EN)</label>
            <textarea
              required
              rows={3}
              value={form.description_en}
              onChange={(e) => setForm({ ...form, description_en: e.target.value })}
              className="focus-ring w-full rounded border border-goldline bg-char2 px-3 py-2.5 text-sm text-bone"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs text-stone">Description (AR)</label>
            <textarea
              required
              dir="rtl"
              rows={3}
              value={form.description_ar}
              onChange={(e) => setForm({ ...form, description_ar: e.target.value })}
              className="focus-ring w-full rounded border border-goldline bg-char2 px-3 py-2.5 text-sm text-bone"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs text-stone">Image</label>
            <div className="flex items-center gap-4">
              {form.image && (
                <img src={form.image} alt="" className="h-16 w-16 rounded object-cover" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="focus-ring text-xs text-stone file:mr-3 file:rounded-full file:border file:border-goldline file:bg-char2 file:px-3 file:py-1.5 file:text-xs file:text-bone"
              />
            </div>
            <input
              placeholder="Or paste an image URL"
              value={form.image.startsWith("data:") ? "" : form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="focus-ring mt-2 w-full rounded border border-goldline bg-char2 px-3 py-2.5 text-sm text-bone"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="focus-ring rounded-full border border-goldline px-5 py-2.5 text-sm text-stone hover:text-bone"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="focus-ring rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-ink hover:bg-gold2"
          >
            Save product
          </button>
        </div>
      </form>
    </div>
  );
}
