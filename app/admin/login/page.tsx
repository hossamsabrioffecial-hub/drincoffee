"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminAuthDB } from "@/lib/local-db";
import Logo from "@/components/Logo";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Simple demo auth — matches ADMIN_EMAIL / ADMIN_PASSWORD in .env.local.
    // Any email is accepted for now; only the password is checked, per spec.
    const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "drincoffee2024";
    if (password === expected) {
      AdminAuthDB.login();
      router.push("/admin");
    } else {
      setError("Incorrect password.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-sm border border-goldline/60 bg-char p-8"
      >
        <Logo size="md" className="items-center" />
        <p className="mt-3 text-center text-xs uppercase tracking-widest2 text-stone">Admin</p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs text-stone">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus-ring w-full rounded border border-goldline bg-char2 px-4 py-3 text-sm text-bone"
              placeholder="admin@drincoffee.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-stone">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus-ring w-full rounded border border-goldline bg-char2 px-4 py-3 text-sm text-bone"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error && <p className="mt-4 text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          className="focus-ring mt-8 w-full rounded-full bg-gold py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-gold2"
        >
          Sign in
        </button>

        <p className="mt-4 text-center text-[11px] text-stone">
          Demo password: drincoffee2024 (set ADMIN_PASSWORD in .env.local)
        </p>
      </form>
    </div>
  );
}
