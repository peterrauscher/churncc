"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { Slider } from "@/components/ui/slider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MIN_SPEND = 1000;
const MAX_SPEND = 8000;
const SPEND_PRESETS = [1000, 2000, 3500, 5000, 7500];

// Typical outcomes for a year of churning at a given monthly spend:
// - $2k/mo clears the minimum spend on 1-2 top welcome offers ($850+)
// - $3k+/mo clears 2-3 offers ($1,350-$1,800)
// - Qualifying direct deposit unlocks 2-3 checking/savings bonuses ($600-$900)
function estimate(monthlySpend: number) {
  const cardBonus =
    monthlySpend >= 6000
      ? 2400
      : monthlySpend >= 4000
        ? 1800
        : monthlySpend >= 2500
          ? 1350
          : monthlySpend >= 1500
            ? 850
            : 450;
  const cardOffers =
    monthlySpend >= 4000
      ? "3–4 welcome offers"
      : monthlySpend >= 2500
        ? "2–3 welcome offers"
        : "1–2 welcome offers";
  const bankBonus = monthlySpend >= 3000 ? 900 : 600;
  const bankOffers =
    monthlySpend >= 3000 ? "3 account promos" : "2 account promos";
  return { cardBonus, cardOffers, bankBonus, bankOffers };
}

export function BonusCalculator({ className }: { className?: string }) {
  const [monthlySpend, setMonthlySpend] = useState<number>(2000);
  const { cardBonus, cardOffers, bankBonus, bankOffers } =
    estimate(monthlySpend);
  const total = cardBonus + bankBonus;
  const cardShare = (cardBonus / total) * 100;

  const rows = [
    {
      label: "Credit card bonuses",
      detail: cardOffers,
      amount: cardBonus,
      swatch: "bg-primary",
    },
    {
      label: "Bank account bonuses",
      detail: bankOffers,
      amount: bankBonus,
      swatch: "bg-positive",
    },
  ];

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16",
        className,
      )}
    >
      <div className="lg:col-span-6">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          How much could you earn?
        </h2>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
          Estimate a year of welcome offers and deposit bonuses based on what
          you already spend each month.
        </p>

        <div className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <p
              id="monthly-spend-label"
              className="text-sm font-medium text-foreground"
            >
              Monthly card spend
            </p>
            <p className="text-2xl font-semibold tracking-tight text-foreground tabular-nums">
              ${monthlySpend.toLocaleString()}
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                /mo
              </span>
            </p>
          </div>
          <Slider
            className="mt-5"
            min={MIN_SPEND}
            max={MAX_SPEND}
            step={250}
            value={[monthlySpend]}
            onValueChange={([value]) => setMonthlySpend(value)}
            aria-label="Monthly card spend"
          />
          <div className="mt-3 flex justify-between text-xs text-muted-foreground tabular-nums">
            <span>$1,000</span>
            <span>$8,000+</span>
          </div>
        </div>

        <div
          role="group"
          aria-labelledby="monthly-spend-label"
          className="mt-8 inline-flex flex-wrap gap-1 rounded-lg border border-border bg-background p-1"
        >
          {SPEND_PRESETS.map((preset) => {
            const isActive = monthlySpend === preset;
            return (
              <button
                key={preset}
                type="button"
                aria-pressed={isActive}
                onClick={() => setMonthlySpend(preset)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium tabular-nums transition-colors duration-150",
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                ${preset.toLocaleString()}
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-6">
        <div className="rounded-xl border border-border bg-background p-8 md:p-10">
          <p className="text-sm text-muted-foreground">
            Estimated first-year bonuses
          </p>
          <p
            className="mt-2 text-5xl font-semibold tracking-tight text-foreground tabular-nums"
            aria-live="polite"
          >
            ${total.toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-muted-foreground tabular-nums">
            About ${Math.round(total / 12).toLocaleString()} a month
          </p>

          <div
            className="mt-8 flex h-2 w-full gap-0.5 overflow-hidden rounded-full"
            aria-hidden
          >
            <div
              className="h-full rounded-l-full bg-primary transition-[width] duration-300"
              style={{ width: `${cardShare}%` }}
            />
            <div className="h-full flex-1 rounded-r-full bg-positive" />
          </div>

          <dl className="mt-6 divide-y divide-border">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4 py-4 first:pt-0"
              >
                <dt className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                      row.swatch,
                    )}
                  />
                  <span>
                    <span className="block text-sm font-medium text-foreground">
                      {row.label}
                    </span>
                    <span className="block text-sm text-muted-foreground">
                      {row.detail}
                    </span>
                  </span>
                </dt>
                <dd className="text-base font-semibold text-foreground tabular-nums">
                  ${row.amount.toLocaleString()}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href="/credit-cards"
            className={cn(buttonVariants({ size: "lg" }), "mt-4 w-full")}
          >
            Find matching offers
            <ArrowRight weight="bold" />
          </Link>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Based on typical welcome offers and assumes a qualifying direct
            deposit. Actual bonuses vary by issuer and eligibility.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BonusCalculator;
