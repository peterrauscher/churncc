import { BankAccount } from "@/types";
import Link from "next/link";
import {
  Bank as BankIcon,
  CalendarBlank,
  CurrencyDollar,
  Info,
} from "@phosphor-icons/react/dist/ssr";
import { IslandLink } from "@/components/shared/IslandLink";
import { Bezel } from "@/components/shared/Bezel";

interface BankAccountItemProps {
  account: BankAccount;
}

const BankAccountItem = ({ account }: BankAccountItemProps) => {
  return (
    <Bezel className="h-full">
      <article className="flex h-full flex-col overflow-hidden">
        <div className="p-6 pb-0">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground">
              {account.institution}
            </p>
            <span className="rounded-full px-2.5 py-1 text-[10px] tracking-[0.16em] uppercase text-muted-foreground ring-1 ring-foreground/10">
              {account.type}
            </span>
          </div>
          <h2 className="font-serif mt-3 text-2xl leading-tight tracking-tight">
            {account.name}
          </h2>
          <div className="mt-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground/5">
              <BankIcon weight="light" className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] tracking-wide text-muted-foreground">
                Bonus amount
              </p>
              <p className="font-serif text-3xl tracking-tight text-gold">
                ${account.offerAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Info
                weight="light"
                className="mt-0.5 h-4 w-4 shrink-0 text-gold"
              />
              <p className="text-sm leading-relaxed">{account.requirements}</p>
            </div>

            {account.directDepositRequired && (
              <div className="flex items-center gap-2">
                <CurrencyDollar weight="light" className="h-4 w-4 text-gold" />
                <span className="text-sm">
                  Direct deposit
                  {account.directDepositAmount
                    ? `: $${account.directDepositAmount.toLocaleString()}`
                    : " required"}
                </span>
              </div>
            )}

            {account.minimumBalance !== undefined && (
              <div className="flex items-center gap-2">
                <CurrencyDollar weight="light" className="h-4 w-4 text-gold" />
                <span className="text-sm">
                  Min balance: ${account.minimumBalance.toLocaleString()}
                </span>
              </div>
            )}

            {account.expirationDate && (
              <div className="flex items-center gap-2">
                <CalendarBlank weight="light" className="h-4 w-4 text-gold" />
                <span className="text-sm">
                  Expires:{" "}
                  {new Date(account.expirationDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          <div className="mt-5 rounded-[1.1rem] bg-muted/60 p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Monthly fee</span>
              <span className="font-medium">
                {account.monthlyFee ? `$${account.monthlyFee}` : "No fee"}
              </span>
            </div>
            {!!account.monthlyFee &&
              account.monthlyFee > 0 &&
              account.isMonthlyFeeWaivable && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Waivable with qualifying activity
                </p>
              )}
          </div>

          <div className="mt-auto flex items-center justify-between pt-6">
            <Link
              href={`/bank-accounts/${account.id}`}
              className="text-sm tracking-tight text-muted-foreground transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground"
            >
              Details
            </Link>
            <IslandLink href={account.url} external>
              Claim
            </IslandLink>
          </div>
        </div>
      </article>
    </Bezel>
  );
};

export default BankAccountItem;
