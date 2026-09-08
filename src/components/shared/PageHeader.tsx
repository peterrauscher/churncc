import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <header className={cn("mb-8 max-w-3xl md:mb-12", className)}>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
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
