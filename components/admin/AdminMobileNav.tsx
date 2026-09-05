"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Home" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/content", label: "Content" },
];

export default function AdminMobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex border-t border-goldline/60 bg-char md:hidden">
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`focus-ring flex-1 py-3 text-center text-[11px] tracking-wide ${
              active ? "text-gold" : "text-stone"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
