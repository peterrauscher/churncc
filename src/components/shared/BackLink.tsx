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
      className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-[#0160c4] dark:text-slate-400 dark:hover:text-[#38b6ff]"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-xs transition-transform duration-150 group-hover:-translate-x-0.5 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        <ArrowLeft weight="bold" className="h-4 w-4" />
      </span>
      <span>{label}</span>
    </Link>
  );
}

export default BackLink;
