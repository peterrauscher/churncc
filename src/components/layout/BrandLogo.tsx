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
  sm: { height: 28, width: 93, iconSize: 28 },
  md: { height: 34, width: 113, iconSize: 34 },
  lg: { height: 42, width: 140, iconSize: 42 },
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
      alt="Churnable icon"
      width={size}
      height={size}
      unoptimized
      className={cn("shrink-0 object-contain", className)}
      priority
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
    <div className={cn("inline-flex items-center", className)}>
      {showText ? (
        <>
          {/* Official Light Mode Logo */}
          <Image
            src="/logo-light.svg"
            alt="Churnable"
            width={dim.width}
            height={dim.height}
            unoptimized
            priority
            className={cn(
              "w-auto object-contain dark:hidden",
              `h-[${dim.height}px]`,
            )}
            style={{ height: `${dim.height}px` }}
          />
          {/* Official Dark Mode Logo */}
          <Image
            src="/logo-dark.svg"
            alt="Churnable"
            width={dim.width}
            height={dim.height}
            unoptimized
            priority
            className={cn(
              "hidden w-auto object-contain dark:block",
              `h-[${dim.height}px]`,
            )}
            style={{ height: `${dim.height}px` }}
          />
        </>
      ) : (
        <LogoIcon size={dim.iconSize} />
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
