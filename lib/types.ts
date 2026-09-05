export type Category = "Bag" | "Tin" | "Capsule";

export interface Product {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  price_aed: number;
  weight: string; // e.g. "250g"
  stock: number;
  category: Category;
  image: string; // data URL or remote URL
  order: number; // for drag-to-reorder
  created_at: string;
}

export type OrderStatus = "New" | "Preparing" | "Delivered" | "Cancelled";
export type PaymentMethod = "COD" | "Online";
export type PaymentStatus = "Unpaid" | "Paid" | "Failed";
export type PaymentProvider = "telr" | "stripe" | "paytabs";

export interface OrderItem {
  product_id: string;
  name_en: string;
  name_ar: string;
  price_aed: number;
  qty: number;
  weight: string;
}

export interface Order {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  city: string;
  items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: OrderStatus;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  payment_provider?: PaymentProvider;
  payment_link?: string;
  notes?: string;
  created_at: string;
}

export interface SiteContent {
  hero_title_en: string;
  hero_title_ar: string;
  hero_subtitle_en: string;
  hero_subtitle_ar: string;
  story_title_en: string;
  story_title_ar: string;
  story_body_en: string;
  story_body_ar: string;
  instagram_url: string;
  whatsapp_number: string;
  delivery_price: number;
}
