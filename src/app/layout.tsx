import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontSans, fontSerif } from "./fonts";
import { themeInitScript } from "@/features/theme-switcher/model/theme-script";
import { publicAssetPath, siteConfig } from "@/shared/config/site.config";
import { SiteHeader } from "@/widgets/site-header/SiteHeader";

const logoPath = publicAssetPath("/Logo.jpg");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}/images/og-image.png`,
  logo: `${siteConfig.url}/Logo.jpg`,
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
  keywords: [...siteConfig.keywords],
  authors: [{ name: "4245877" }],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: logoPath,
    shortcut: logoPath,
    apple: logoPath,
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3eee6" },
    { media: "(prefers-color-scheme: dark)", color: "#1f1a18" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${fontSerif.variable} ${fontSans.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Перейти к содержанию
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
