import { BankAccount } from "@/types";
import Link from "next/link";
import {
  CalendarBlank,
  CurrencyDollar,
  CheckCircle,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";

interface BankAccountItemProps {
  account: BankAccount;
}

const BankAccountItem = ({ account }: BankAccountItemProps) => {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(15,23,42,0.12)] dark:bg-slate-900">
      {/* Card Header - Solid off-white, no border */}
      <div className="bg-[#f8fafc] p-5 sm:p-6 dark:bg-slate-950/40">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
            {account.institution}
          </span>
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-[#0160c4] dark:bg-blue-950/60 dark:text-[#38b6ff]">
            {account.type.toUpperCase()}
          </span>
        </div>
        <h3 className="mt-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-[#0160c4] sm:text-2xl dark:text-white dark:group-hover:text-[#38b6ff]">
          <Link href={`/bank-accounts/${account.id}`}>{account.name}</Link>
        </h3>

        {/* Bonus Highlight Box - Solid emerald, no border */}
        <div className="mt-4 rounded-xl bg-emerald-50/80 p-4 dark:bg-emerald-950/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-emerald-800 uppercase dark:text-emerald-400">
              Cash Bonus
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
              <ShieldCheck weight="bold" className="h-3 w-3" />
              <span>FDIC Insured</span>
            </span>
          </div>
          <p className="mt-1 text-3xl font-extrabold text-[#00a859] dark:text-emerald-400">
            ${account.offerAmount.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Card Body - Requirements and Specs */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-start gap-2">
            <CheckCircle
              weight="fill"
              className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
            />
            <p className="leading-snug">{account.requirements}</p>
          </div>

          {account.directDepositRequired && (
            <div className="flex items-center gap-2">
              <CurrencyDollar
                weight="bold"
                className="h-4 w-4 shrink-0 text-[#0160c4] dark:text-[#38b6ff]"
              />
              <span>
                Direct deposit:{" "}
                {account.directDepositAmount
                  ? `$${account.directDepositAmount.toLocaleString()}`
                  : "Required"}
              </span>
            </div>
          )}

          {account.minimumBalance !== undefined && (
            <div className="flex items-center gap-2">
              <CurrencyDollar
                weight="bold"
                className="h-4 w-4 shrink-0 text-[#0160c4] dark:text-[#38b6ff]"
              />
              <span>
                Min balance: ${account.minimumBalance.toLocaleString()}
              </span>
            </div>
          )}

          {account.expirationDate && (
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <CalendarBlank weight="bold" className="h-4 w-4 shrink-0" />
              <span>
                Expires:{" "}
                {new Date(account.expirationDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
        </div>

        {/* Monthly Fee Indicator - Solid neutral background, no border */}
        <div className="mt-4 rounded-lg bg-slate-50 p-3 text-xs dark:bg-slate-800/60">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">
              Monthly Fee
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              {account.monthlyFee ? `$${account.monthlyFee}` : "$0 / No Fee"}
            </span>
          </div>
          {!!account.monthlyFee &&
            account.monthlyFee > 0 &&
            account.isMonthlyFeeWaivable && (
              <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                Waivable with qualifying deposit or balance
              </p>
            )}
        </div>

        {/* Action Row */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <Link
            href={`/bank-accounts/${account.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-[#0160c4] dark:text-slate-300 dark:hover:text-[#38b6ff]"
          >
            <span>Offer Details</span>
            <ArrowRight weight="bold" className="h-3.5 w-3.5" />
          </Link>
          <a
            href={account.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg bg-[#0160c4] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#0052cc] active:scale-[0.98]"
          >
            <span>Claim Bonus</span>
            <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BankAccountItem;
