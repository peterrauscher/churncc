import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

interface IslandLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary:
    "bg-[#0160c4] text-white hover:bg-[#0052cc] shadow-xs border border-transparent dark:bg-[#0160c4] dark:hover:bg-[#0052cc]",
  secondary:
    "bg-[#00a859] text-white hover:bg-[#00914d] shadow-xs border border-transparent dark:bg-[#00bf63] dark:hover:bg-[#00a859] dark:text-slate-950",
  ghost:
    "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-850",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs font-semibold rounded-lg gap-1.5",
  md: "px-4 py-2.5 text-sm font-semibold rounded-xl gap-2",
  lg: "px-5 py-3 text-base font-semibold rounded-xl gap-2.5",
};

export function IslandLink({
  href,
  children,
  external = false,
  variant = "primary",
  size = "md",
  className,
}: IslandLinkProps) {
  const classNames = cn(
    "group inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-150 active:scale-[0.98]",
    variants[variant],
    sizes[size],
    className,
  );

  const Icon = external ? ArrowUpRight : ArrowRight;

  const content = (
    <>
      <span className="whitespace-nowrap">{children}</span>
      <Icon
        weight="bold"
        className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
      />
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

export default IslandLink;
