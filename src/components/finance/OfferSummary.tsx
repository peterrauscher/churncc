import { CalendarBlank, CurrencyDollar } from "@phosphor-icons/react";

interface OfferSummaryProps {
  spend: number;
  days: number;
  expiration?: string;
}

export function OfferSummary({ spend, days, expiration }: OfferSummaryProps) {
  return (
    <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
      <div className="flex items-center gap-1.5">
        <CurrencyDollar
          weight="bold"
          className="h-4 w-4 shrink-0 text-[#0160c4] dark:text-[#38b6ff]"
        />
        <span>
          Spend{" "}
          <strong className="font-semibold text-slate-900 dark:text-white">
            ${spend.toLocaleString()}
          </strong>{" "}
          in {days} days
        </span>
      </div>
      {expiration ? (
        <div className="flex items-center gap-1.5">
          <CalendarBlank
            weight="bold"
            className="h-4 w-4 shrink-0 text-slate-400"
          />
          <span>
            Expires{" "}
            {new Date(expiration).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      ) : null}
    </div>
  );
}

export default OfferSummary;
