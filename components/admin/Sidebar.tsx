"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AdminAuthDB } from "@/lib/local-db";
import Logo from "@/components/Logo";

const links = [
  { href: "/admin", label: "Dashboard", icon: "grid" },
  { href: "/admin/products", label: "Products", icon: "box" },
  { href: "/admin/orders", label: "Orders", icon: "receipt" },
  { href: "/admin/content", label: "Content", icon: "edit" },
];

function Icon({ name }: { name: string }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5 };
  switch (name) {
    case "grid":
      return <svg {...common}><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></svg>;
    case "box":
      return <svg {...common}><path d="M21 8l-9-5-9 5 9 5 9-5z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></svg>;
    case "receipt":
      return <svg {...common}><path d="M6 2h12v20l-3-2-3 2-3-2-3 2V2z" /><path d="M9 8h6M9 12h6" /></svg>;
    case "edit":
      return <svg {...common}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" /></svg>;
    default:
      return null;
  }
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function logout() {
    AdminAuthDB.logout();
    router.push("/admin/login");
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-goldline/60 bg-char md:flex">
      <div className="border-b border-goldline/60 px-6 py-6">
        <Logo size="sm" />
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`focus-ring flex items-center gap-3 rounded px-3 py-2.5 text-sm transition-colors ${
                active ? "bg-gold/10 text-gold" : "text-stone hover:bg-char2 hover:text-bone"
              }`}
            >
              <Icon name={l.icon} />
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-goldline/60 p-3">
        <button
          onClick={logout}
          className="focus-ring flex w-full items-center gap-3 rounded px-3 py-2.5 text-sm text-stone hover:bg-char2 hover:text-bone"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
