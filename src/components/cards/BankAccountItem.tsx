import { BankAccount } from "@/types";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BankAccountItemProps {
  account: BankAccount;
}

const ACCOUNT_TYPE_LABELS: Record<BankAccount["type"], string> = {
  CHECKING: "Checking",
  SAVINGS: "Savings",
  BROKERAGE: "Brokerage",
  HYBRID: "Checking + savings",
};

function formatUsd(amount: number): string {
  return `$${amount.toLocaleString()}`;
}

const BankAccountItem = ({ account }: BankAccountItemProps) => {
  const detailsHref = `/bank-accounts/${account.id}`;
  const monthlyFee = account.monthlyFee ?? 0;

  const specs: { label: string; value: string }[] = [
    {
      label: "Monthly fee",
      value:
        monthlyFee > 0
          ? `${formatUsd(monthlyFee)}${account.isMonthlyFeeWaivable ? ", waivable" : ""}`
          : "$0",
    },
    {
      label: "Direct deposit",
      value: account.directDepositRequired
        ? account.directDepositAmount
          ? formatUsd(account.directDepositAmount)
          : "Required"
        : "Not required",
    },
  ];
  if (account.minimumBalance !== undefined) {
    specs.push({
      label: "Minimum balance",
      value: formatUsd(account.minimumBalance),
    });
  }
  if (account.expirationDate) {
    specs.push({
      label: "Offer ends",
      value: new Date(account.expirationDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    });
  }

  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between gap-3 text-[13px] text-muted-foreground">
        <span className="truncate">{account.institution}</span>
        <span className="shrink-0">{ACCOUNT_TYPE_LABELS[account.type]}</span>
      </div>
      <h3 className="mt-1 text-lg leading-snug font-semibold text-foreground">
        <Link
          href={detailsHref}
          className="underline-offset-4 decoration-1 hover:underline"
        >
          {account.name}
        </Link>
      </h3>

      <div className="mt-6">
        <p className="text-[13px] text-muted-foreground">Cash bonus</p>
        <p className="mt-1 text-[28px] leading-tight font-semibold tracking-tight text-foreground tabular-nums">
          {formatUsd(account.offerAmount)}
        </p>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {account.requirements}
        </p>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-4 text-sm">
        {specs.map((spec) => (
          <div key={spec.label}>
            <dt className="text-[13px] text-muted-foreground">{spec.label}</dt>
            <dd className="mt-0.5 font-medium text-foreground tabular-nums">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
        <Link
          href={detailsHref}
          className={buttonVariants({ variant: "outline" })}
        >
          Details
        </Link>
        <a
          href={account.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants(), "gap-1.5")}
        >
          Open account
          <ArrowUpRight weight="bold" />
        </a>
      </div>
    </article>
  );
};

export default BankAccountItem;
