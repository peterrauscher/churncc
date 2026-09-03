import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bezel } from "@/components/shared/Bezel";

interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string; weight?: "light" }>;
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
    <Bezel>
      <div className="px-6 py-16 text-center md:py-20">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-foreground/5">
          <Icon weight="light" className="h-6 w-6 text-foreground" />
        </div>
        <h3 className="font-serif text-3xl tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          {description}
        </p>
        {actionHref && actionLabel ? (
          <Button asChild className="mt-8">
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        ) : null}
      </div>
    </Bezel>
  );
}
