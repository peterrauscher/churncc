import { Skeleton } from "@/components/ui/skeleton";

interface LoadingCardsProps {
  count?: number;
  columns?: string;
}

export function LoadingCards({
  count = 4,
  columns = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
}: LoadingCardsProps) {
  return (
    <div className={`grid gap-6 ${columns}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-2xl border bg-card p-4 shadow-sm">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="mt-4 h-6 w-2/3" />
          <Skeleton className="mt-3 h-4 w-5/6" />
          <Skeleton className="mt-2 h-4 w-4/6" />
          <div className="mt-6 flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-28 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
