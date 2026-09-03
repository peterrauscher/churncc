import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./app-providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Churnable: Earn More With Banking & Credit Card Bonuses",
  description:
    "Find the latest and greatest bank account and credit card bonus offers to earn more money from your paycheck. Flip the script and profit like the banks do.",
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
    <html lang="en">
      <body
        className={cn(
          fraunces.variable,
          plusJakarta.variable,
          ibmPlexMono.variable,
          "flex min-h-[100dvh] flex-col font-sans antialiased",
        )}
      >
        <a
          href="#content"
          className="bg-primary text-primary-foreground sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[var(--z-overlay)] focus:rounded-full focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Navbar />
        <AppProviders>
          <main id="content" className="flex-1 pt-28">
            {children}
          </main>
        </AppProviders>
        <Footer />
      </body>
    </html>
  );
}
