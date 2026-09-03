import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  eyebrow?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  title,
  description,
  eyebrow,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-4 inline-flex rounded-full px-3 py-1 text-[10px] font-medium tracking-[0.2em] uppercase ring-1 ring-foreground/10">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-serif text-3xl leading-[1.05] tracking-tight text-foreground md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-[42rem] text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
