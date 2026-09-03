import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  className?: string;
}

export function PageHeader({
  title,
  description,
  eyebrow,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("mb-12 max-w-3xl md:mb-16", className)}>
      {eyebrow ? (
        <p className="mb-4 inline-flex rounded-full px-3 py-1 text-[10px] font-medium tracking-[0.2em] uppercase ring-1 ring-foreground/10">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-foreground md:text-6xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 max-w-[42rem] text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
