import type { Metadata } from "next";
import { DM_Sans, Noto_Sans_Devanagari, Syne } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/layout/app-providers";
import { ThemeScript } from "@/components/layout/theme-script";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
});

const hindi = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-hindi",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "PashuGyan | AI Livestock Breed Identification",
    template: "%s | PashuGyan",
  },
  description:
    "PashuGyan helps Indian farmers, veterinarians, and livestock researchers identify cattle and buffalo breeds in seconds with AI-guided insights.",
  applicationName: "PashuGyan",
  keywords: [
    "PashuGyan",
    "cattle breed identification",
    "buffalo breed detection",
    "Indian livestock breeds",
    "AI agriculture India",
  ],
  openGraph: {
    title: "PashuGyan",
    description:
      "Know your animal. Grow your farm. AI-powered breed identification for Indian livestock.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PashuGyan",
    description:
      "AI-powered cattle and buffalo breed identification built for Indian farmers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${body.variable} ${hindi.variable} bg-background font-sans text-foreground antialiased`}
      >
        <ThemeScript />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
