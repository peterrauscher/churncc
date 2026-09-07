import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  className?: string;
  badge?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  eyebrow,
  badge,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("mb-8 max-w-3xl md:mb-12", className)}>
      <div className="flex flex-wrap items-center gap-3">
        {eyebrow ? (
          <p className="text-xs font-bold tracking-wider text-[#0160c4] uppercase dark:text-[#38b6ff]">
            {eyebrow}
          </p>
        ) : null}
        {badge}
      </div>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 max-w-[44rem] text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
          {description}
        </p>
      ) : null}
    </header>
  );
}

export default PageHeader;
