import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BankLogo {
  name: string;
  src: string;
  width: number;
  height: number;
  /** Square badge logos need more height for their knocked-out lettering to read. */
  badge?: boolean;
}

const bankLogos: BankLogo[] = [
  { name: "Chase", src: "/bank-logos/chase.svg", width: 140, height: 32 },
  {
    name: "American Express",
    src: "/bank-logos/american-express.svg",
    width: 70,
    height: 32,
    badge: true,
  },
  {
    name: "Capital One",
    src: "/bank-logos/capital-one.svg",
    width: 120,
    height: 32,
  },
  { name: "Citi", src: "/bank-logos/citi.svg", width: 70, height: 32 },
  {
    name: "Bank of America",
    src: "/bank-logos/bank-of-america.svg",
    width: 150,
    height: 32,
  },
  {
    name: "Wells Fargo",
    src: "/bank-logos/wells-fargo.svg",
    width: 60,
    height: 32,
    badge: true,
  },
  { name: "Discover", src: "/bank-logos/discover.svg", width: 120, height: 32 },
  { name: "Barclays", src: "/bank-logos/barclays.svg", width: 140, height: 32 },
  { name: "SoFi", src: "/bank-logos/sofi.svg", width: 85, height: 32 },
];

export function BankLogoCarousel({ className }: { className?: string }) {
  // Duplicated list creates the continuous seamless loop
  const duplicatedLogos = [...bankLogos, ...bankLogos];

  return (
    <div
      className={cn(
        "flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12",
        className,
      )}
    >
      <p className="shrink-0 text-sm text-muted-foreground">
        Tracking offers from the largest US issuers
      </p>

      {/* Edge-masked marquee; the mask is an alpha fade, not a visible gradient */}
      <div
        className="min-w-0 flex-1 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="animate-marquee flex items-center">
          {duplicatedLogos.map((bank, index) => (
            <span key={`${bank.name}-${index}`} className="shrink-0 pr-14">
              <Image
                src={bank.src}
                alt={index < bankLogos.length ? `${bank.name} logo` : ""}
                width={bank.width}
                height={bank.height}
                unoptimized
                className={cn(
                  "w-auto max-w-[120px] object-contain opacity-50 grayscale",
                  bank.badge ? "h-9 opacity-40" : "h-6",
                )}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BankLogoCarousel;
