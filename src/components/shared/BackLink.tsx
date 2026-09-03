import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

interface BackLinkProps {
  href: string;
  label: string;
}

export function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-sm tracking-tight text-muted-foreground transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/5 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-x-0.5">
        <ArrowLeft weight="light" className="h-4 w-4" />
      </span>
      {label}
    </Link>
  );
}
