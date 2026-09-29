import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <div className="rounded-xl border border-dashed border-border px-6 py-14 text-center md:py-20">
      <Icon
        weight="light"
        className="mx-auto h-10 w-10 text-muted-foreground"
      />
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-md text-sm text-muted-foreground">
        {description}
      </p>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className={cn(buttonVariants({ variant: "outline" }), "mt-6")}
        >
          {actionLabel}
          <ArrowRight weight="bold" />
        </Link>
      ) : null}
    </div>
  );
}

export default EmptyState;
