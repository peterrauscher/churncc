import { cn } from "@/lib/utils";

interface CurrencyValueProps {
  amount: number;
  currency: string;
  className?: string;
}

export function formatRewardValue(amount: number, currency: string): string {
  if (currency === "USD") {
    return `$${amount.toLocaleString()}`;
  }

  const normalized = currency.replace(/_/g, " ");
  return `${amount.toLocaleString()} ${normalized.toLowerCase()}`;
}

export function CurrencyValue({
  amount,
  currency,
  className,
}: CurrencyValueProps) {
  return (
    <span className={cn("tabular-nums", className)}>
      {formatRewardValue(amount, currency)}
    </span>
  );
}
