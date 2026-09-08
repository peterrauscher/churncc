import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  title,
  description,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl dark:text-white">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export default SectionHeading;
