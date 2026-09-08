import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
}

const dimensions = {
  sm: { iconSize: 32, textSize: "text-xl", gap: "gap-2.5" },
  md: { iconSize: 44, textSize: "text-2xl sm:text-[28px]", gap: "gap-3" },
  lg: { iconSize: 56, textSize: "text-3xl sm:text-4xl", gap: "gap-4" },
};

export function LogoIcon({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src="/logo-icon.svg"
      alt="Churnable logo icon"
      width={size}
      height={size}
      unoptimized
      priority
      className={cn("shrink-0 object-contain", className)}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
}

export function BrandLogo({
  className,
  showText = true,
  size = "md",
  href = "/",
}: BrandLogoProps) {
  const dim = dimensions[size];

  const content = (
    <div className={cn("inline-flex items-center", dim.gap, className)}>
      <Image
        src="/logo-icon.svg"
        alt="Churnable icon"
        width={dim.iconSize}
        height={dim.iconSize}
        unoptimized
        priority
        className="shrink-0 object-contain"
        style={{ width: `${dim.iconSize}px`, height: `${dim.iconSize}px` }}
      />
      {showText && (
        <span
          className={cn(
            "font-extrabold tracking-tight text-slate-900 dark:text-white select-none",
            dim.textSize,
          )}
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          Churnable
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group inline-flex items-center transition-opacity hover:opacity-90"
      >
        {content}
      </Link>
    );
  }

  return content;
}

export default BrandLogo;
