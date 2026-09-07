import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BankLogo {
  name: string;
  src: string;
  width: number;
  height: number;
}

const bankLogos: BankLogo[] = [
  { name: "Chase", src: "/bank-logos/chase.svg", width: 140, height: 32 },
  {
    name: "American Express",
    src: "/bank-logos/american-express.svg",
    width: 70,
    height: 32,
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
  },
  { name: "Discover", src: "/bank-logos/discover.svg", width: 120, height: 32 },
  { name: "Barclays", src: "/bank-logos/barclays.svg", width: 130, height: 32 },
  { name: "SoFi", src: "/bank-logos/sofi.svg", width: 85, height: 32 },
];

export function BankLogoCarousel({ className }: { className?: string }) {
  // Duplicated list creates the continuous seamless loop
  const duplicatedLogos = [...bankLogos, ...bankLogos];

  return (
    <div
      className={cn(
        "mt-8 border-t border-slate-200/80 pt-6 dark:border-slate-800",
        className,
      )}
    >
      <p className="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
        Find the best bonuses from the top financial institutions
      </p>

      {/* Infinite Marquee viewport with gradient edge fade masks */}
      <div className="relative mt-5 w-full overflow-hidden py-1">
        {/* Left fade gradient */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-slate-950 sm:w-16" />
        {/* Right fade gradient */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-slate-950 sm:w-16" />

        {/* Scrolling track */}
        <div className="animate-marquee flex items-center gap-10 sm:gap-14">
          {duplicatedLogos.map((bank, index) => (
            <div
              key={`${bank.name}-${index}`}
              className="flex h-10 shrink-0 items-center justify-center px-1 transition-all duration-200"
              title={bank.name}
            >
              {/* Greyscale by default; returns to true color on hover */}
              <Image
                src={bank.src}
                alt={`${bank.name} logo`}
                width={bank.width}
                height={bank.height}
                unoptimized
                className="h-7 sm:h-8 w-auto max-w-[140px] object-contain opacity-55 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0 dark:opacity-70 dark:brightness-125 dark:grayscale dark:hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BankLogoCarousel;
