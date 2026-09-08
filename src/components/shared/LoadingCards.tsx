import { Skeleton } from "@/components/ui/skeleton";
import { Bezel } from "@/components/shared/Bezel";

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
        <Bezel key={index}>
          <div className="p-5">
            <Skeleton className="h-40 w-full rounded-[1.4rem] bg-muted" />
            <Skeleton className="mt-5 h-6 w-2/3 bg-muted" />
            <Skeleton className="mt-3 h-4 w-5/6 bg-muted" />
            <Skeleton className="mt-2 h-4 w-4/6 bg-muted" />
            <div className="mt-8 flex items-center justify-between">
              <Skeleton className="h-4 w-24 bg-muted" />
              <Skeleton className="h-10 w-28 rounded-full bg-muted" />
            </div>
          </div>
        </Bezel>
      ))}
    </div>
  );
}
