import { cn } from "@/lib/utils";
import { formatRewardValue } from "@/lib/rewards";

interface CurrencyValueProps {
  amount: number;
  currency: string;
  className?: string;
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
