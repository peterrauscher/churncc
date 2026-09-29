import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LoadingCardsProps {
  count?: number;
  columns?: string;
}

export function LoadingCards({
  count = 4,
  columns = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
}: LoadingCardsProps) {
  return (
    <div className={cn("grid gap-6", columns)} aria-busy="true">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border border-border bg-card"
        >
          <Skeleton className="h-44 w-full rounded-none" />
          <div className="p-6">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="mt-2.5 h-5 w-2/3" />
            <Skeleton className="mt-7 h-3.5 w-20" />
            <Skeleton className="mt-2.5 h-7 w-32" />
            <Skeleton className="mt-2.5 h-3.5 w-3/4" />
            <div className="mt-7 grid grid-cols-2 gap-3 border-t border-border pt-6">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
