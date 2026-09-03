import { CalendarBlank, CurrencyDollar } from "@phosphor-icons/react";

interface OfferSummaryProps {
  spend: number;
  days: number;
  expiration?: string;
}

export function OfferSummary({ spend, days, expiration }: OfferSummaryProps) {
  return (
    <div className="space-y-2 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <CurrencyDollar weight="light" className="h-4 w-4 text-gold" />
        <span>
          Spend{" "}
          <strong className="font-medium text-foreground">
            ${spend.toLocaleString()}
          </strong>{" "}
          in {days} days
        </span>
      </div>
      {expiration ? (
        <div className="flex items-center gap-2">
          <CalendarBlank weight="light" className="h-4 w-4 text-gold" />
          <span>Expires {new Date(expiration).toLocaleDateString()}</span>
        </div>
      ) : null}
    </div>
  );
}
