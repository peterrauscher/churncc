import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./app-providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Churnable: Compare Credit Card & Bank Account Bonuses",
  description:
    "Find and compare the latest credit card welcome offers and bank account bonuses. Maximize your rewards with unbiased, data-driven financial tools.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", rel: "shortcut icon", type: "image/svg+xml" },
    ],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
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
        className={cn(
          plusJakarta.variable,
          ibmPlexMono.variable,
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
