import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

interface EmptyStateProps {
  icon: React.ComponentType<{
    className?: string;
    weight?: "bold" | "duotone" | "regular" | "light";
  }>;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionHref,
  actionLabel,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900 md:p-14">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#0160c4] dark:bg-blue-950 dark:text-[#38b6ff]">
        <Icon weight="bold" className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">
        {description}
      </p>
      {actionHref && actionLabel ? (
        <div className="mt-6">
          <Link
            href={actionHref}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0160c4] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-[#0052cc] active:scale-[0.98]"
          >
            <span>{actionLabel}</span>
            <ArrowRight weight="bold" className="h-4 w-4" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export default EmptyState;
