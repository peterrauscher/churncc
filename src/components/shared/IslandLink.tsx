import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

interface IslandLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

const variants = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  ghost: "bg-foreground/[0.04] text-foreground ring-1 ring-foreground/10",
};

export function IslandLink({
  href,
  children,
  external = false,
  variant = "primary",
  className,
}: IslandLinkProps) {
  const classNames = cn(
    "group inline-flex items-center gap-3 rounded-full py-2 pr-2 pl-6 text-sm font-medium tracking-tight",
    "transition-[transform,background-color,color] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
    "active:scale-[0.98]",
    variants[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      <span
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full",
          "transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
          "group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105",
          variant === "ghost" ? "bg-foreground/5" : "bg-white/10",
        )}
      >
        <ArrowUpRight weight="light" className="h-4 w-4" />
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames}>
      {content}
    </Link>
  );
}
