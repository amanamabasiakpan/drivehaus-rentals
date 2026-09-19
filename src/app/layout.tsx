import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "DriveHaus Rentals | Premium Car Hire in Lagos",
  description:
    "Premium car rentals in Lagos for business trips, airport transfers, weddings, and everyday mobility. Self-drive and chauffeur options.",
  openGraph: {
    title: "DriveHaus Rentals",
    description: "Your journey. Your car. Your way.",
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} dark h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
