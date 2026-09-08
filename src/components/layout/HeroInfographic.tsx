import React from "react";
import {
  CheckCircle,
  ShieldCheck,
  Sparkle,
  TrendUp,
} from "@phosphor-icons/react/dist/ssr";

export function HeroInfographic() {
  return (
    <div className="relative mx-auto flex w-full max-w-lg items-center justify-center p-2 sm:p-4">
      {/* Background Soft Glow Circle (Solid color, no gradient) */}
      <div className="absolute -inset-2 rounded-3xl bg-slate-100/70 dark:bg-slate-900/40" />

      {/* Main Infographic Composition Container */}
      <div className="relative w-full">
        {/* CARD 1: Background Offset Card (Sapphire Blue #0160c4) */}
        <div className="relative ml-auto h-48 w-72 sm:h-52 sm:w-80 rounded-2xl bg-[#0160c4] p-5 text-white shadow-[0_12px_30px_rgba(1,96,196,0.25)] transition-transform duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-widest uppercase opacity-85">
              Sapphire Tier
            </span>
            <span className="rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-bold">
              5x Points
            </span>
          </div>
          <div className="mt-8">
            <p className="text-[11px] font-medium tracking-wider uppercase opacity-75">
              Bonus Value
            </p>
            <p className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              60,000 pts
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between text-[11px] font-medium opacity-80">
            <span>•••• 8821</span>
            <span>$95 Annual Fee</span>
          </div>
        </div>

        {/* CARD 2: Primary Front Card (Midnight Slate #0f172a with Emerald Bonus Callout) */}
        <div className="relative -mt-32 mr-auto h-52 w-76 sm:h-56 sm:w-84 rounded-2xl bg-[#0f172a] p-5 text-white shadow-[0_20px_45px_rgba(15,23,42,0.22)] transition-transform duration-300 hover:-translate-y-1 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            {/* Gold EMV Chip Vector */}
            <div className="flex h-7 w-9 items-center justify-center rounded-md bg-[#d4af37]/90 shadow-xs">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="h-2 w-2 border-r border-b border-black/30" />
                <div className="h-2 w-2 border-b border-black/30" />
                <div className="h-2 w-2 border-r border-black/30" />
                <div className="h-2 w-2" />
              </div>
            </div>
            {/* Contactless Wave Vector */}
            <svg
              className="h-5 w-5 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M8.5 16.5a5 5 0 0 1 0-9" />
              <path d="M12 19a8.5 8.5 0 0 0 0-14" />
              <path d="M15.5 21.5a12 12 0 0 0 0-19" />
            </svg>
          </div>

          <div className="mt-5">
            <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Top Welcome Offer
            </p>
            <p className="mt-0.5 text-2xl font-extrabold text-[#00a859] sm:text-3xl">
              +$750 Cash Bonus
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3 text-[11px] text-slate-400">
            <span className="font-mono tracking-wider text-slate-300">
              •••• 4829
            </span>
            <span className="font-semibold text-white">0% Intro APR</span>
          </div>

          {/* Floating Verified Badge on Card */}
          <div className="absolute -top-3 -right-3 flex items-center gap-1.5 rounded-full bg-[#00a859] px-3 py-1 text-[11px] font-bold text-white shadow-md">
            <CheckCircle weight="fill" className="h-3.5 w-3.5" />
            <span>Verified Offer</span>
          </div>
        </div>

        {/* FLOATING CARD 3: Bank Deposit Reward Milestone (Pure White, Borderless, Elevated) */}
        <div className="relative -mt-10 ml-auto w-72 sm:w-80 rounded-2xl bg-white p-4 shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:-translate-y-1 dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-[#00a859] dark:bg-emerald-950/80">
                <TrendUp weight="bold" className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Checking Promo
                </p>
                <p className="text-[10px] text-slate-500">
                  Direct deposit match
                </p>
              </div>
            </div>
            <span className="text-lg font-extrabold text-[#00a859]">+$300</span>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 text-[11px] text-slate-600 dark:border-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1 text-slate-500">
              <ShieldCheck
                weight="bold"
                className="h-3.5 w-3.5 text-[#0160c4]"
              />
              <span>FDIC Insured</span>
            </span>
            <span className="font-bold text-[#0160c4] dark:text-[#38b6ff]">
              $0 Monthly Fee
            </span>
          </div>
        </div>

        {/* FLOATING PILL: Total First-Year Profit Badge */}
        <div className="absolute -bottom-5 left-4 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.14)] dark:bg-slate-900 sm:left-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#00a859] text-white">
            <Sparkle weight="fill" className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
              1-Year Upside
            </p>
            <p className="text-sm font-extrabold text-slate-900 dark:text-white">
              $1,050 Combined Profit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroInfographic;
