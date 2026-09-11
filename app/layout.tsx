import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const northvaleSerif = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-northvale-serif",
  display: "swap",
});

const northvaleSans = localFont({
  src: "./fonts/manrope-latin-variable.woff2",
  weight: "400 600",
  variable: "--font-northvale-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Northvale — A private lakeside retreat",
  description: "A quiet cabin beside a mountain lake. Held by forest, warmed by fire. Discover Northvale, a little place to slow down.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Northvale — A little closer to nowhere",
    description: "A quiet cabin beside a mountain lake. Room to breathe. Time to just be.",
    type: "website",
    images: [{ url: "/images/northvale-hero.webp", alt: "Northvale cabin beside a mountain lake at early evening" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${northvaleSerif.variable} ${northvaleSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
