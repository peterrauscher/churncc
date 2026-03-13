import type { Metadata } from "next";
import { Playfair_Display, Poppins, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./app-providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: ["500", "600", "700"],
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
          poppins.variable,
          playfair.variable,
          ibmPlexMono.variable,
          "font-sans",
          "flex min-h-screen flex-col antialiased",
        )}
      >
        <Navbar />
        <AppProviders>{children}</AppProviders>
        <Footer />
      </body>
    </html>
  );
}
