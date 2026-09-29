import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./app-providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://churn.cc"),
  title: {
    default: "Churnable — Compare Credit Card & Bank Account Bonuses",
    template: "%s | Churnable",
  },
  description:
    "Compare 1,000+ credit card welcome bonuses and bank account promotions. 100% free, unbiased, and merit-ranked with conservative points-to-dollar valuations.",
  keywords: [
    "credit card bonuses",
    "credit card welcome offers",
    "bank account bonuses",
    "bank promotions",
    "checking account bonus",
    "high yield savings bonus",
    "credit card churning",
    "Chase 5/24 rule",
    "points valuation",
    "credit card rewards",
    "bank deposit bonus",
    "financial rewards",
  ],
  authors: [
    {
      name: "Churnable Editorial Team",
      url: "https://churn.cc/how-we-are-paid",
    },
  ],
  creator: "Churnable",
  publisher: "Churnable",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  alternates: {
    canonical: "https://churn.cc",
    types: {
      "text/markdown": "/llms.txt",
    },
  },
  openGraph: {
    title: "Churnable — Compare Credit Card & Bank Account Bonuses",
    description:
      "Compare 1,000+ credit card welcome offers and bank account promos. Data-driven, unbiased, and merit-ranked financial rewards intelligence.",
    url: "https://churn.cc",
    siteName: "Churnable",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Churnable — Compare Credit Card & Bank Account Bonuses",
    description:
      "Compare 1,000+ credit card welcome offers and bank account promos. Data-driven, unbiased, and merit-ranked financial rewards intelligence.",
    creator: "@churnable",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", rel: "shortcut icon", type: "image/svg+xml" },
    ],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  category: "finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="help"
          href="/llms.txt"
          type="text/markdown"
          title="LLM Context Summary"
        />
        <JsonLd />
      </head>
      <body
        className={cn(
          ibmPlexSans.variable,
          ibmPlexMono.variable,
          inter.variable,
          "flex min-h-[100dvh] flex-col bg-background font-sans text-foreground antialiased",
        )}
      >
        <a
          href="#content"
          className="bg-primary text-primary-foreground sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[var(--z-overlay)] focus:rounded-md focus:px-4 focus:py-2 focus:shadow-md"
        >
          Skip to content
        </a>
        <Navbar />
        <AppProviders>
          <main id="content" className="flex-1">
            {children}
          </main>
        </AppProviders>
        <Footer />
      </body>
    </html>
  );
}
