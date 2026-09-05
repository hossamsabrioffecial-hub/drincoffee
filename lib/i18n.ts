"use client";

import { useLang } from "./store/lang";

const dict = {
  en: {
    nav_shop: "Shop",
    nav_story: "Our Story",
    nav_contact: "Contact",
    cart: "Cart",
    empty_cart: "Your cart is empty.",
    continue_shopping: "Continue shopping",
    subtotal: "Subtotal",
    delivery: "Delivery",
    total: "Total",
    checkout: "Checkout",
    add_to_cart: "Add to cart",
    out_of_stock: "Out of stock",
    only_left: "Only {n} left",
    shop_all: "Shop all",
    category: "Category",
    all: "All",
    full_name: "Full name",
    phone: "Phone number",
    address: "Address",
    city: "City",
    notes: "Notes (optional)",
    payment_method: "Payment method",
    cod: "Cash on Delivery",
    pay_online: "Pay Online",
    place_order: "Place order",
    order_placed: "Order placed",
    order_placed_body: "We've received your order. We'll reach out on WhatsApp shortly.",
    back_home: "Back to home",
    footer_rights: "All rights reserved.",
    weight: "Weight",
    price: "Price",
    qty: "Qty",
    remove: "Remove",
  },
  ar: {
    nav_shop: "المتجر",
    nav_story: "قصتنا",
    nav_contact: "تواصل",
    cart: "السلة",
    empty_cart: "سلتك فارغة.",
    continue_shopping: "متابعة التسوق",
    subtotal: "المجموع الفرعي",
    delivery: "التوصيل",
    total: "الإجمالي",
    checkout: "إتمام الطلب",
    add_to_cart: "أضف إلى السلة",
    out_of_stock: "غير متوفر",
    only_left: "متبقي {n} فقط",
    shop_all: "تسوق الكل",
    category: "الفئة",
    all: "الكل",
    full_name: "الاسم الكامل",
    phone: "رقم الهاتف",
    address: "العنوان",
    city: "المدينة",
    notes: "ملاحظات (اختياري)",
    payment_method: "طريقة الدفع",
    cod: "الدفع عند الاستلام",
    pay_online: "الدفع الإلكتروني",
    place_order: "تأكيد الطلب",
    order_placed: "تم إرسال الطلب",
    order_placed_body: "لقد استلمنا طلبك. سنتواصل معك عبر واتساب قريبًا.",
    back_home: "العودة للرئيسية",
    footer_rights: "جميع الحقوق محفوظة.",
    weight: "الوزن",
    price: "السعر",
    qty: "الكمية",
    remove: "إزالة",
  },
} as const;

export type DictKey = keyof typeof dict.en;

export function useT() {
  const lang = useLang((s) => s.lang);
  return (key: DictKey, vars?: Record<string, string | number>) => {
    let str: string = dict[lang][key] ?? dict.en[key];
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        str = str.replace(`{${k}}`, String(v));
      });
    }
    return str;
  };
}
