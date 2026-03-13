import { Calendar, DollarSign } from "lucide-react";

interface OfferSummaryProps {
  spend: number;
  days: number;
  expiration?: string;
}

export function OfferSummary({ spend, days, expiration }: OfferSummaryProps) {
  return (
    <div className="space-y-2 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <DollarSign className="h-4 w-4 text-primary" />
        <span>
          Spend{" "}
          <strong className="text-foreground">${spend.toLocaleString()}</strong>{" "}
          in {days} days
        </span>
      </div>
      {expiration ? (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <span>Expires {new Date(expiration).toLocaleDateString()}</span>
        </div>
      ) : null}
    </div>
  );
}
