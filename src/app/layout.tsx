import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/shared/config/site.config";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}/images/og-image.png`,
  logo: `${siteConfig.url}/images/logo-256.png`,
  applicationCategory: "AIApplication",
  operatingSystem: "Windows, macOS, Linux, Web",
  offers: {
    "@type": "Offer",
    price: "0.00",
    priceCurrency: "USD",
    url: siteConfig.url,
    availability: "https://schema.org/InStock",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "4245877" }],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/logo-256.png",
  },
  openGraph: {
    type: "website",
    title: siteConfig.name,
    description:
      "Экспериментальная ИИ-система, вдохновлённая архитектурой человеческого мозга: память, внимание, восприятие, планирование и обучение на опыте.",
    url: siteConfig.url,
    siteName: "Julia AI",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Julia AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description:
      "Экспериментальная ИИ-система с памятью, вниманием, планированием, мультимодальностью и x86-ориентированной архитектурой.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}