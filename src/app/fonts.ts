import localFont from "next/font/local";

/*
 * Typography for the Shizue Satou design language.
 *
 * Spectral (headings): a light, quiet serif with a relaxed italic — mature
 * elegance on the surface, a little looseness in the accents.
 * Nunito Sans (text and UI): soft humanist forms with excellent readability.
 *
 * Both are self-hosted, subset to Latin + Cyrillic (see public/fonts/*-OFL.txt).
 */

export const fontSerif = localFont({
  src: [
    { path: "./fonts/spectral-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/spectral-300-italic.woff2", weight: "300", style: "italic" },
    { path: "./fonts/spectral-400.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

export const fontSans = localFont({
  src: "./fonts/nunito-sans-variable.woff2",
  weight: "300 800",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
  fallback: ["Segoe UI", "system-ui", "-apple-system", "sans-serif"],
  adjustFontFallback: "Arial",
});
