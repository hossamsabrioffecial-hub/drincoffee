import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DRINCOFFEE — Coffee, Kept Rare",
  description:
    "Small-batch, luxury roasted coffee delivered across the UAE. Bags, tins, and capsules.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={`${cormorant.variable} ${manrope.variable} ${notoKufiArabic.variable}`}>
      <body className="font-sans antialiased bg-ink text-bone min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
