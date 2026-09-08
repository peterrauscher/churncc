"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCard, Bank, ArrowRight, Sparkle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const SPEND_PRESETS = [1000, 2000, 3500, 5000, 7500];

export function BonusCalculator({ className }: { className?: string }) {
  const [monthlySpend, setMonthlySpend] = useState<number>(2000);

  // Estimation logic based on standard card & bank bonuses:
  // - Spending $2k/mo qualifies for 1-2 top welcome offers ($850+)
  // - Spending $3k+/mo easily meets minimum spend requirements for 2-3 top welcome offers ($1,350 - $1,800)
  // - Qualifying direct deposit enables 2-3 checking/savings account bonuses ($600 - $900)
  const cardBonusEstimate = Math.round(
    monthlySpend >= 6000
      ? 2400
      : monthlySpend >= 4000
        ? 1800
        : monthlySpend >= 2500
          ? 1350
          : monthlySpend >= 1500
            ? 850
            : 450,
  );

  // Always assumes qualifying direct deposit is set up
  const bankBonusEstimate = monthlySpend >= 3000 ? 900 : 600;

  const totalEstimate = cardBonusEstimate + bankBonusEstimate;

  const cardPercent = Math.round((cardBonusEstimate / totalEstimate) * 100);
  const bankPercent = 100 - cardPercent;

  // Percentage for the slider track fill (bounds 1000 to 8000)
  const sliderPercentage = Math.min(
    100,
    Math.max(0, ((monthlySpend - 1000) / (8000 - 1000)) * 100),
  );

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
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            How much could you earn?
          </h3>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Set your estimated monthly spending and calculate your first-year
            cash and points windfall across credit card welcome offers and bank
            deposit bonuses.
          </p>

          {/* Interactive Spend Card */}
          <div className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <label
                  htmlFor="monthly-spend-slider"
                  className="text-sm font-semibold text-slate-900 dark:text-white"
                >
                  Monthly Credit Card Spend
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Groceries, dining, bills, and everyday expenses
                </p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-2xl font-bold text-[#0160c4] sm:text-3xl dark:text-[#38b6ff]">
                  ${monthlySpend.toLocaleString()}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  / month
                </span>
              </div>
            </div>

            {/* Slider with filled track */}
            <div className="mt-5">
              <input
                id="monthly-spend-slider"
                type="range"
                min="1000"
                max="8000"
                step="250"
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="h-2.5 w-full cursor-pointer appearance-none rounded-lg accent-[#0160c4] dark:accent-[#38b6ff]"
                style={{
                  background: `linear-gradient(to right, #0160c4 0%, #0160c4 ${sliderPercentage}%, #e2e8f0 ${sliderPercentage}%, #e2e8f0 100%)`,
                }}
              />
              <div className="mt-2 flex justify-between font-mono text-xs text-slate-400 dark:text-slate-500">
                <span>$1,000</span>
                <span>$4,000</span>
                <span>$8,000+</span>
              </div>
            </div>

            {/* Preset chips */}
            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-200/60 pt-4 dark:border-slate-700/60">
              <span className="mr-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                Presets:
              </span>
              {SPEND_PRESETS.map((preset) => {
                const isActive = monthlySpend === preset;
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setMonthlySpend(preset)}
                    className={cn(
                      "rounded-lg px-2.5 py-1 text-xs font-semibold transition-all",
                      isActive
                        ? "bg-[#0160c4] text-white shadow-xs dark:bg-[#38b6ff] dark:text-slate-950"
                        : "border border-slate-200/90 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
                    )}
                  >
                    ${preset.toLocaleString()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Qualification unlocks */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-white p-3.5 shadow-xs dark:border-slate-800 dark:bg-slate-900/60">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0160c4] dark:bg-blue-950 dark:text-[#38b6ff]">
                <CreditCard weight="bold" className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {monthlySpend >= 4000
                    ? "3–4 Top Welcome Offers"
                    : monthlySpend >= 2500
                      ? "2–3 Top Welcome Offers"
                      : "1–2 Top Welcome Offers"}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Meets issuer spend thresholds
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-white p-3.5 shadow-xs dark:border-slate-800 dark:bg-slate-900/60">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#00a859] dark:bg-emerald-950 dark:text-emerald-400">
                <Bank weight="bold" className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {monthlySpend >= 3000
                    ? "3 Bank Account Promos"
                    : "2 Bank Account Promos"}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Qualifying direct deposit assumed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Estimated Payout Card */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50/70 to-white p-6 shadow-xs sm:p-7 dark:border-emerald-900/40 dark:from-emerald-950/30 dark:to-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider text-emerald-800 uppercase dark:text-emerald-400">
                Projected 1-Year Upside
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                <Sparkle weight="fill" className="h-3 w-3" />
                <span>Estimated</span>
              </span>
            </div>

            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-4xl font-extrabold tracking-tight text-[#00a859] sm:text-5xl dark:text-emerald-400">
                  ${totalEstimate.toLocaleString()}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  / first year
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Avg. ~${Math.round(totalEstimate / 12).toLocaleString()}/mo in
                verified bonuses
              </p>
            </div>

            {/* Visual Two-Tone Proportion Bar */}
            <div className="mt-5">
              <div className="flex h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full bg-[#0160c4] transition-all duration-300 dark:bg-[#38b6ff]"
                  style={{ width: `${cardPercent}%` }}
                  title={`Credit Card Bonuses: ${cardPercent}%`}
                />
                <div
                  className="h-full bg-[#00a859] transition-all duration-300 dark:bg-emerald-400"
                  style={{ width: `${bankPercent}%` }}
                  title={`Bank Deposit Bonuses: ${bankPercent}%`}
                />
              </div>
            </div>

            {/* Breakdown Items */}
            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white/90 p-3 shadow-2xs dark:border-slate-800 dark:bg-slate-800/60">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#0160c4] dark:bg-[#38b6ff]" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Credit Card Bonuses
                  </span>
                </div>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  ${cardBonusEstimate.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white/90 p-3 shadow-2xs dark:border-slate-800 dark:bg-slate-800/60">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#00a859] dark:bg-emerald-400" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Bank Deposit Bonuses
                  </span>
                </div>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  ${bankBonusEstimate.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-6">
              <Link
                href="/credit-cards"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0160c4] py-3 text-center text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#0052cc] active:scale-[0.98]"
              >
                <span>Find Matching Offers</span>
                <ArrowRight weight="bold" className="h-4 w-4" />
              </Link>
            </div>

            <p className="mt-3 text-center text-[11px] text-slate-400 dark:text-slate-500">
              Estimates based on active verified signup promotions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BonusCalculator;
