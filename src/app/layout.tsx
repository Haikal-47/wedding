import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Wedding of Romeo & Juliet",
  description:
    "Kami mengundang Anda untuk hadir dan memberikan doa restu pada hari pernikahan kami.",
  keywords: ["wedding", "undangan", "pernikahan", "digital invitation"],
  openGraph: {
    title: "The Wedding of Romeo & Juliet",
    description:
      "Kami mengundang Anda untuk hadir dan memberikan doa restu pada hari pernikahan kami.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="font-body antialiased bg-cream text-charcoal">
        {children}
      </body>
    </html>
  );
}
