"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, Sparkle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export function BonusCalculator({ className }: { className?: string }) {
  const [monthlySpend, setMonthlySpend] = useState<number>(3000);
  const [hasDirectDeposit, setHasDirectDeposit] = useState<boolean>(true);

  // Estimation logic based on standard card & bank bonuses:
  // - Spending $3k/mo easily meets minimum spend requirements for 2-3 top welcome offers ($1,200 - $1,800)
  // - Direct deposit enables 2-3 checking/savings account bonuses ($600 - $900)
  const cardBonusEstimate = Math.round(
    monthlySpend >= 4000
      ? 1800
      : monthlySpend >= 2500
        ? 1350
        : monthlySpend >= 1500
          ? 850
          : 450,
  );

  const bankBonusEstimate = hasDirectDeposit
    ? monthlySpend >= 3000
      ? 900
      : 600
    : 250;

  const totalEstimate = cardBonusEstimate + bankBonusEstimate;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.06)] md:p-8 dark:bg-slate-900",
        className,
      )}
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        {/* Left Column: Calculator Controls */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#0160c4] dark:bg-blue-950 dark:text-[#38b6ff]">
              <Calculator weight="bold" className="h-4 w-4" />
            </span>
            <span className="text-xs font-bold tracking-wider text-[#0160c4] uppercase dark:text-[#38b6ff]">
              Interactive Bonus Estimator
            </span>
          </div>

          <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            How much can you earn in year one?
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Adjust your estimated monthly spending and banking habits to
            calculate your potential cash and points windfall.
          </p>

          <div className="mt-6 space-y-6">
            {/* Slider: Monthly Spending */}
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Monthly Credit Card Spending
                </span>
                <span className="font-extrabold text-[#0160c4] dark:text-[#38b6ff]">
                  ${monthlySpend.toLocaleString()} / month
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="8000"
                step="500"
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-100 accent-[#0160c4] dark:bg-slate-700"
              />
              <div className="mt-1 flex justify-between text-[11px] text-slate-400">
                <span>$1,000</span>
                <span>$4,000</span>
                <span>$8,000+</span>
              </div>
            </div>

            {/* Direct Deposit Toggle */}
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/60">
              <div className="pr-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Can set up qualifying direct deposit
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Unlocks premium checking and savings account promotions
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={hasDirectDeposit}
                onClick={() => setHasDirectDeposit(!hasDirectDeposit)}
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                  hasDirectDeposit
                    ? "bg-[#0160c4]"
                    : "bg-slate-300 dark:bg-slate-700",
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                    hasDirectDeposit ? "translate-x-5" : "translate-x-0",
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Estimated Payout Card - Solid emerald, no gradient, no border */}
        <div className="lg:col-span-5">
          <div className="rounded-xl bg-emerald-50/80 p-6 shadow-xs dark:bg-emerald-950/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider text-emerald-800 uppercase dark:text-emerald-400">
                Projected 1-Year Upside
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                <Sparkle weight="fill" className="h-3 w-3" />
                <span>Estimated</span>
              </span>
            </div>

            <div className="mt-3">
              <span className="text-4xl font-extrabold tracking-tight text-[#00a859] sm:text-5xl dark:text-emerald-400">
                ${totalEstimate.toLocaleString()}
              </span>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                In welcome bonuses and deposit rewards
              </p>
            </div>

            <div className="mt-6 space-y-2.5 pt-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">
                  Credit Card Bonuses:
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  ${cardBonusEstimate.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">
                  Bank Account Bonuses:
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  ${bankBonusEstimate.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/credit-cards"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0160c4] py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0052cc] active:scale-[0.98]"
              >
                <span>Find Matching Offers</span>
                <ArrowRight weight="bold" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BonusCalculator;
