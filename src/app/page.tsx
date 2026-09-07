"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CreditCardItem from "@/components/cards/CreditCardItem";
import BankAccountGrid from "@/components/cards/BankAccountGrid";
import { LoadingCards } from "@/components/shared/LoadingCards";
import { SearchBar } from "@/components/shared/SearchBar";
import { BonusCalculator } from "@/components/finance/BonusCalculator";
import {
  CreditCard as CreditCardIcon,
  Bank as BankIcon,
  ShieldCheck,
  Sparkle,
  ArrowRight,
  TrendUp,
  AirplaneTilt,
  Coins,
  Buildings,
} from "@phosphor-icons/react";
import { CreditCard, BankAccount } from "@/types";
import { fetchCreditCards, getMockBankAccounts } from "@/services/api";
import { formatRewardValue } from "@/components/finance/CurrencyValue";

export default function HomePage() {
  const [allCards, setAllCards] = useState<CreditCard[]>([]);
  const [featuredCards, setFeaturedCards] = useState<CreditCard[]>([]);
  const [featuredAccounts, setFeaturedAccounts] = useState<BankAccount[]>([]);
  const [allAccounts, setAllAccounts] = useState<BankAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedItems = async () => {
      setIsLoading(true);
      try {
        const cards = await fetchCreditCards();
        const activeCards = cards.filter(
          (card) => !card.discontinued && card.offers.length > 0,
        );
        setAllCards(activeCards);

        const topCards = [...activeCards]
          .sort((a, b) => {
            const aOffer = a.offers[0]?.amount[0]?.amount || 0;
            const bOffer = b.offers[0]?.amount[0]?.amount || 0;
            return bOffer - aOffer;
          })
          .slice(0, 4);
        setFeaturedCards(topCards);

        const accounts = getMockBankAccounts();
        setAllAccounts(accounts);
        const topAccounts = [...accounts]
          .sort((a, b) => b.offerAmount - a.offerAmount)
          .slice(0, 3);
        setFeaturedAccounts(topAccounts);
      } catch (error) {
        console.error("Error loading featured items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedItems();
  }, []);

  const totalCardBonuses = allCards.reduce((sum, card) => {
    const best = card.offers.reduce((max, o) => {
      const amt = o.amount.reduce((s, a) => s + a.amount, 0);
      return amt > max ? amt : max;
    }, 0);
    return sum + best;
  }, 0);

  const totalBankBonuses = allAccounts.reduce(
    (sum, a) => sum + a.offerAmount,
    0,
  );

  const leadCard = featuredCards[0];
  const stackedCards = featuredCards.slice(1, 4);

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {/* SECTION 1: HERO (Bankrate / NerdWallet inspired) */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-blue-50/40 via-white to-white px-4 pt-10 pb-16 sm:px-6 md:pt-14 md:pb-20 lg:px-8 dark:border-slate-800 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Column: Headline, Value Prop, Search, CTAs */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-[#0160c4] dark:border-blue-900/60 dark:bg-blue-950/60 dark:text-[#38b6ff]">
                <Sparkle weight="fill" className="h-3.5 w-3.5 text-[#00bf63]" />
                <span>Verified Welcome Offers & Deposit Rewards</span>
              </div>

              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
                Compare the best card and bank bonuses.
              </h1>

              <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg dark:text-slate-300">
                Banks budget billions to acquire customers. We track verified
                welcome bonuses and deposit promos so you keep more money.
              </p>

              {/* Dynamic Search Bar */}
              <SearchBar />

              {/* Quick Actions */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/credit-cards"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0160c4] px-5 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-[#0052cc] active:scale-[0.98]"
                >
                  <span>Compare Cards</span>
                  <ArrowRight weight="bold" className="h-4 w-4" />
                </Link>
                <Link
                  href="/bank-accounts"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-xs transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <span>Explore Bank Promos</span>
                  <ArrowRight weight="bold" className="h-4 w-4" />
                </Link>
              </div>

              {/* Trust Metric Strip */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-200/80 pt-6 text-left dark:border-slate-800">
                <div>
                  <p className="text-xl font-extrabold text-[#00a859] sm:text-2xl dark:text-emerald-400">
                    {isLoading
                      ? "..."
                      : formatRewardValue(
                          totalCardBonuses + totalBankBonuses,
                          "USD",
                        )}
                  </p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Total tracked bonuses
                  </p>
                </div>
                <div>
                  <p className="text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-white">
                    {isLoading
                      ? "..."
                      : `${allCards.length + allAccounts.length}+`}
                  </p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Verified live offers
                  </p>
                </div>
                <div>
                  <p className="text-xl font-extrabold text-[#0160c4] sm:text-2xl dark:text-[#38b6ff]">
                    100%
                  </p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Editorial independent
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Live Comparison Showcase Box */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-[#00bf63]" />
                    <span className="text-xs font-bold tracking-wider text-slate-900 uppercase dark:text-white">
                      Market Highlights
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Top Picks This Month
                  </span>
                </div>

                {/* Offer 1: Top Credit Card */}
                {leadCard ? (
                  <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                          {leadCard.issuer.replace("_", " ")}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {leadCard.name}
                        </h4>
                      </div>
                      <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-[#0160c4] dark:bg-blue-950 dark:text-[#38b6ff]">
                        Top Card
                      </span>
                    </div>

                    <div className="mt-3 flex items-baseline justify-between">
                      <div>
                        <span className="text-xs text-slate-500">
                          Welcome Offer
                        </span>
                        <p className="text-2xl font-extrabold text-[#00a859] dark:text-emerald-400">
                          {leadCard.offers[0]?.amount[0]?.amount
                            ? `$${leadCard.offers[0].amount[0].amount}`
                            : "60,000 pts"}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-500">
                          Annual Fee
                        </span>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {leadCard.annualFee > 0
                            ? `$${leadCard.annualFee}`
                            : "$0"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-slate-200/60 pt-2.5 text-xs">
                      <span className="text-slate-500">
                        Spend: $
                        {leadCard.offers[0]?.spend.toLocaleString() || "4,000"}
                      </span>
                      <Link
                        href={`/credit-cards/${leadCard.cardId}`}
                        className="font-semibold text-[#0160c4] hover:underline dark:text-[#38b6ff]"
                      >
                        View card terms
                      </Link>
                    </div>
                  </div>
                ) : null}

                {/* Offer 2: Top Bank Account */}
                {featuredAccounts[0] ? (
                  <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                          {featuredAccounts[0].institution}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {featuredAccounts[0].name}
                        </h4>
                      </div>
                      <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        Top Bank
                      </span>
                    </div>

                    <div className="mt-3 flex items-baseline justify-between">
                      <div>
                        <span className="text-xs text-slate-500">
                          Deposit Bonus
                        </span>
                        <p className="text-2xl font-extrabold text-[#00a859] dark:text-emerald-400">
                          ${featuredAccounts[0].offerAmount.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-500">
                          Monthly Fee
                        </span>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {featuredAccounts[0].monthlyFee
                            ? `$${featuredAccounts[0].monthlyFee}`
                            : "$0"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-slate-200/60 pt-2.5 text-xs">
                      <span className="text-slate-500">
                        {featuredAccounts[0].type} account
                      </span>
                      <Link
                        href={`/bank-accounts/${featuredAccounts[0].id}`}
                        className="font-semibold text-[#0160c4] hover:underline dark:text-[#38b6ff]"
                      >
                        View bank terms
                      </Link>
                    </div>
                  </div>
                ) : null}

                {/* Summary Banner */}
                <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-white dark:bg-slate-800">
                  <div>
                    <p className="text-xs text-slate-300">
                      Combined Top Payout
                    </p>
                    <p className="text-lg font-bold text-[#00bf63]">
                      $1,050+ Cash Value
                    </p>
                  </div>
                  <Link
                    href="/credit-cards"
                    className="rounded-lg bg-[#0160c4] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0052cc]"
                  >
                    Compare All
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: UNDER-HERO INSTITUTIONS & TRUST STRIP */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 md:p-8 dark:border-slate-800 dark:bg-slate-900/50">
            <p className="text-center text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
              Tracking Welcome Promos From Top Financial Institutions
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-8 text-sm font-bold text-slate-700 sm:gap-12 md:gap-16 dark:text-slate-300">
              <span className="flex items-center gap-2">
                <Buildings weight="bold" className="h-5 w-5 text-[#0160c4]" />
                Chase
              </span>
              <span className="flex items-center gap-2">
                <CreditCardIcon
                  weight="bold"
                  className="h-5 w-5 text-[#38b6ff]"
                />
                American Express
              </span>
              <span className="flex items-center gap-2">
                <BankIcon weight="bold" className="h-5 w-5 text-[#00bf63]" />
                Capital One
              </span>
              <span className="flex items-center gap-2">
                <Buildings weight="bold" className="h-5 w-5 text-[#0160c4]" />
                Citi
              </span>
              <span className="flex items-center gap-2">
                <BankIcon weight="bold" className="h-5 w-5 text-[#00a859]" />
                Wells Fargo
              </span>
              <span className="flex items-center gap-2">
                <Coins weight="bold" className="h-5 w-5 text-[#38b6ff]" />
                Discover
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CATEGORY QUICK NAV BENTO (Bankrate/NerdWallet style) */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Explore bonus categories
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
              Find exactly what matches your financial goals, from travel miles
              to direct cash deposits.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Travel Cards */}
            <Link
              href="/credit-cards?type=travel"
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0160c4] dark:bg-blue-950 dark:text-[#38b6ff]">
                  <AirplaneTilt weight="bold" className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-[#0160c4] dark:text-white dark:group-hover:text-[#38b6ff]">
                  Travel Rewards
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Airline miles and transferrable points with big initial
                  bonuses.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-[#0160c4] dark:border-slate-800 dark:text-[#38b6ff]">
                <span>Browse Travel Cards</span>
                <ArrowRight
                  weight="bold"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>

            {/* Card 2: Cash Back */}
            <Link
              href="/credit-cards?type=cashback"
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-[#00a859] dark:bg-emerald-950 dark:text-emerald-400">
                  <Coins weight="bold" className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-[#0160c4] dark:text-white dark:group-hover:text-[#38b6ff]">
                  Cash Back Cards
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Straightforward dollar statement credits and zero complicated
                  math.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-[#0160c4] dark:border-slate-800 dark:text-[#38b6ff]">
                <span>Browse Cash Back</span>
                <ArrowRight
                  weight="bold"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>

            {/* Card 3: Checking Accounts */}
            <Link
              href="/bank-accounts?type=checking"
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-[#0ea5e9] dark:bg-cyan-950 dark:text-[#38b6ff]">
                  <BankIcon weight="bold" className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-[#0160c4] dark:text-white dark:group-hover:text-[#38b6ff]">
                  Checking Promos
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Earn $200 to $500 simply by routing your routine direct
                  deposits.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-[#0160c4] dark:border-slate-800 dark:text-[#38b6ff]">
                <span>Browse Checking</span>
                <ArrowRight
                  weight="bold"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>

            {/* Card 4: Savings Accounts */}
            <Link
              href="/bank-accounts?type=savings"
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0160c4] dark:bg-blue-950 dark:text-[#38b6ff]">
                  <TrendUp weight="bold" className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-[#0160c4] dark:text-white dark:group-hover:text-[#38b6ff]">
                  Savings & CD Bonuses
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Earn high yields plus cash bonuses for parking emergency
                  funds.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-[#0160c4] dark:border-slate-800 dark:text-[#38b6ff]">
                <span>Browse Savings</span>
                <ArrowRight
                  weight="bold"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED CREDIT CARD OFFERS */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl dark:text-white">
                Highest-upside credit card offers
              </h2>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
                Issuer incentives ranked by net welcome payout and fee
                structure.
              </p>
            </div>
            <Link
              href="/credit-cards"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#0160c4] hover:underline dark:text-[#38b6ff]"
            >
              <span>View all credit cards</span>
              <ArrowRight weight="bold" className="h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <LoadingCards count={4} columns="grid-cols-1 md:grid-cols-12" />
          ) : leadCard ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
              <div className="md:col-span-7">
                <CreditCardItem card={leadCard} featured />
              </div>
              <div className="flex flex-col gap-6 md:col-span-5">
                {stackedCards.map((card) => (
                  <CreditCardItem key={card.cardId} card={card} />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-slate-500">
              No featured credit cards available at the moment.
            </p>
          )}
        </div>
      </section>

      {/* SECTION 5: INTERACTIVE BONUS CALCULATOR */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <BonusCalculator />
        </div>
      </section>

      {/* SECTION 6: TOP BANK ACCOUNT BONUSES */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl dark:text-white">
                Top bank account deposit bonuses
              </h2>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
                Checking and savings promos that pay cash for funds you already
                move.
              </p>
            </div>
            <Link
              href="/bank-accounts"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#0160c4] hover:underline dark:text-[#38b6ff]"
            >
              <span>View all bank promos</span>
              <ArrowRight weight="bold" className="h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <LoadingCards
              count={3}
              columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            />
          ) : (
            <BankAccountGrid
              accounts={featuredAccounts}
              emptyMessage="No featured bank accounts available at the moment."
            />
          )}
        </div>
      </section>

      {/* SECTION 7: EDITORIAL CALLOUT & GUIDES TEASER */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-blue-50/70 via-white to-emerald-50/60 p-8 sm:p-12 dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-3.5 py-1 text-xs font-semibold text-[#0160c4] dark:border-slate-700 dark:bg-slate-800 dark:text-[#38b6ff]">
                <ShieldCheck weight="bold" className="h-4 w-4 text-[#00bf63]" />
                <span>The Churnable Difference</span>
              </span>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                Never leave acquisition cash on the table.
              </h2>

              <p className="mt-3 text-base text-slate-600 sm:text-lg dark:text-slate-300">
                From managing the Chase 5/24 rule to timing deposit
                requirements, our guides help you maximize profits while
                protecting your credit score.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0160c4] px-6 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-[#0052cc] active:scale-[0.98]"
                >
                  <span>Read Churning Guides</span>
                  <ArrowRight weight="bold" className="h-4 w-4" />
                </Link>
                <Link
                  href="/credit-cards"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-xs transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                >
                  <span>Compare Card Bonuses</span>
                  <ArrowRight weight="bold" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
