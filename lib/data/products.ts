import { Product } from "../types";

export const seedProducts: Product[] = [
  {
    id: "p1",
    name_en: "Midnight Reserve",
    name_ar: "الاحتياطي الليلي",
    description_en:
      "A dark, syrupy roast built for slow mornings. Notes of date molasses, cacao, and black cardamom.",
    description_ar:
      "تحميص داكن وكثيف مصمم للصباحات الهادئة. نفحات من دبس التمر والكاكاو والهيل الأسود.",
    price_aed: 145,
    weight: "250g",
    stock: 24,
    category: "Bag",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&auto=format&fit=crop",
    order: 0,
    created_at: new Date().toISOString(),
  },
  {
    id: "p2",
    name_en: "Gold Dust Blend",
    name_ar: "مزيج غبار الذهب",
    description_en:
      "Our signature house blend. Bright, floral, and balanced — a tin worth keeping on the counter.",
    description_ar:
      "مزيجنا المميز. نكهة مشرقة وزهرية ومتوازنة — علبة تستحق مكانًا في مطبخك.",
    price_aed: 189,
    weight: "200g",
    stock: 12,
    category: "Tin",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop",
    order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "p3",
    name_en: "Amber Capsules",
    name_ar: "كبسولات العنبر",
    description_en:
      "Single-origin capsules, compatible with most home machines. Ten per box, sealed for freshness.",
    description_ar:
      "كبسولات أحادية المنشأ، متوافقة مع معظم الآلات المنزلية. عشر كبسولات في العلبة، مختومة للحفاظ على النضارة.",
    price_aed: 99,
    weight: "10 capsules",
    stock: 4,
    category: "Capsule",
    image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?q=80&w=1200&auto=format&fit=crop",
    order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "p4",
    name_en: "Desert Rose Roast",
    name_ar: "تحميص وردة الصحراء",
    description_en:
      "Light roast with rosewater and pistachio undertones. A rare small-batch release.",
    description_ar:
      "تحميص فاتح بنكهات ماء الورد والفستق. إصدار محدود ونادر.",
    price_aed: 165,
    weight: "250g",
    stock: 8,
    category: "Bag",
    image: "https://images.unsplash.com/photo-1524350876685-274059332603?q=80&w=1200&auto=format&fit=crop",
    order: 3,
    created_at: new Date().toISOString(),
  },
];
