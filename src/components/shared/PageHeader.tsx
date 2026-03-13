import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <header className={cn("mb-8", className)}>
      <h1 className="font-serif text-4xl tracking-tight text-foreground md:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 max-w-3xl text-base text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
