"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminAuthDB } from "@/lib/local-db";
import Sidebar from "@/components/admin/Sidebar";
import AdminMobileNav from "@/components/admin/AdminMobileNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setChecked(true);
      return;
    }
    if (!AdminAuthDB.isLoggedIn()) {
      router.replace("/admin/login");
    } else {
      setChecked(true);
    }
  }, [isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;
  if (!checked) return <div className="min-h-screen bg-ink" />;

  return (
    <div className="min-h-screen bg-ink text-bone">
      <Sidebar />
      <div className="md:pl-60">
        <main className="px-5 pb-24 pt-8 md:px-10 md:pb-10">{children}</main>
      </div>
      <AdminMobileNav />
    </div>
  );
}
