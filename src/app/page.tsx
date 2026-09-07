"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CreditCardItem from "@/components/cards/CreditCardItem";
import BankAccountGrid from "@/components/cards/BankAccountGrid";
import { LoadingCards } from "@/components/shared/LoadingCards";
import { SearchBar } from "@/components/shared/SearchBar";
import { BonusCalculator } from "@/components/finance/BonusCalculator";
import { BankLogoCarousel } from "@/components/layout/BankLogoCarousel";
import { HeroInfographic } from "@/components/layout/HeroInfographic";
import { BankBonusEmailCourse } from "@/components/layout/BankBonusEmailCourse";
import {
  Bank as BankIcon,
  ShieldCheck,
  ArrowRight,
  TrendUp,
  AirplaneTilt,
  Coins,
} from "@phosphor-icons/react";
import { CreditCard, BankAccount } from "@/types";
import { fetchCreditCards, getMockBankAccounts } from "@/services/api";

export default function HomePage() {
  const [featuredCards, setFeaturedCards] = useState<CreditCard[]>([]);
  const [featuredAccounts, setFeaturedAccounts] = useState<BankAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedItems = async () => {
      setIsLoading(true);
      try {
        const cards = await fetchCreditCards();
        const activeCards = cards.filter(
          (card) => !card.discontinued && card.offers.length > 0,
        );

        const topCards = [...activeCards]
          .sort((a, b) => {
            const aOffer = a.offers[0]?.amount[0]?.amount || 0;
            const bOffer = b.offers[0]?.amount[0]?.amount || 0;
            return bOffer - aOffer;
          })
          .slice(0, 4);
        setFeaturedCards(topCards);

        const accounts = getMockBankAccounts();
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

  const leadCard = featuredCards[0];
  const stackedCards = featuredCards.slice(1, 4);

  return (
    <div className="flex flex-col">
      {/* SECTION 1: HERO - Crisp white, no gradient, no border */}
      <section className="relative overflow-hidden bg-white px-4 pt-12 pb-16 sm:px-6 md:pt-16 md:pb-20 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Column: Headline, Value Prop, Search, CTAs, Bank Logos */}
            <div className="lg:col-span-7">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
                Compare the best card and bank bonuses.
              </h1>

              <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg dark:text-slate-300">
                Banks budget billions to acquire customers. We track verified
                welcome bonuses and deposit promos so you keep more money.
              </p>

              {/* Dynamic Search Bar - Borderless with soft shadow */}
              <SearchBar />

              {/* Quick Actions */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/credit-cards"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0160c4] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0052cc] active:scale-[0.98]"
                >
                  <span>Compare Cards</span>
                  <ArrowRight weight="bold" className="h-4 w-4" />
                </Link>
                <Link
                  href="/bank-accounts"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-800 shadow-xs transition-all hover:bg-slate-200 active:scale-[0.98] dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  <span>Explore Bank Promos</span>
                  <ArrowRight weight="bold" className="h-4 w-4" />
                </Link>
              </div>

              {/* Infinite Scroll Bank Logo Carousel - Greyscale, titled */}
              <BankLogoCarousel />
            </div>

            {/* Right Column: Curated Fintech Hero Infographic */}
            <div className="flex items-center justify-center lg:col-span-5">
              <HeroInfographic />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CATEGORY QUICK NAV BENTO - Curated off-white background #f4f6f8 */}
      <section className="bg-[#f4f6f8] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 dark:bg-slate-900/50">
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
            {/* Card 1: Travel Cards - Pure white, borderless, soft shadow */}
            <Link
              href="/credit-cards?type=travel"
              className="group relative flex flex-col justify-between rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.12)] dark:bg-slate-900"
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
              <div className="mt-6 flex items-center justify-between pt-4 text-xs font-semibold text-[#0160c4] dark:text-[#38b6ff]">
                <span>Browse Travel Cards</span>
                <ArrowRight
                  weight="bold"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>

            {/* Card 2: Cash Back - Pure white, borderless, soft shadow */}
            <Link
              href="/credit-cards?type=cashback"
              className="group relative flex flex-col justify-between rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.12)] dark:bg-slate-900"
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
              <div className="mt-6 flex items-center justify-between pt-4 text-xs font-semibold text-[#0160c4] dark:text-[#38b6ff]">
                <span>Browse Cash Back</span>
                <ArrowRight
                  weight="bold"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>

            {/* Card 3: Checking Accounts - Pure white, borderless, soft shadow */}
            <Link
              href="/bank-accounts?type=checking"
              className="group relative flex flex-col justify-between rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.12)] dark:bg-slate-900"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0ea5e9] dark:bg-blue-950 dark:text-[#38b6ff]">
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
              <div className="mt-6 flex items-center justify-between pt-4 text-xs font-semibold text-[#0160c4] dark:text-[#38b6ff]">
                <span>Browse Checking</span>
                <ArrowRight
                  weight="bold"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>

            {/* Card 4: Savings Accounts - Pure white, borderless, soft shadow */}
            <Link
              href="/bank-accounts?type=savings"
              className="group relative flex flex-col justify-between rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.12)] dark:bg-slate-900"
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
              <div className="mt-6 flex items-center justify-between pt-4 text-xs font-semibold text-[#0160c4] dark:text-[#38b6ff]">
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

      {/* SECTION 3: FEATURED CREDIT CARD OFFERS - Solid white background */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 dark:bg-slate-950">
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

      {/* SECTION 4: INTERACTIVE BONUS CALCULATOR - Curated off-white background #f4f6f8 */}
      <section className="bg-[#f4f6f8] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl">
          <BonusCalculator />
        </div>
      </section>

      {/* SECTION 5: TOP BANK ACCOUNT BONUSES - Solid white background */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 dark:bg-slate-950">
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

      {/* SECTION 6: EDITORIAL CALLOUT & GUIDES TEASER - Solid dark slate container, no gradient */}
      <section className="bg-[#f4f6f8] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl bg-[#0f172a] p-8 text-white shadow-[0_10px_35px_rgba(15,23,42,0.14)] sm:p-14 dark:bg-slate-900">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3.5 py-1 text-xs font-semibold text-[#38b6ff]">
                <ShieldCheck weight="bold" className="h-4 w-4 text-[#00bf63]" />
                <span>The Churnable Difference</span>
              </span>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Never leave acquisition cash on the table.
              </h2>

              <p className="mt-3 text-base text-slate-300 sm:text-lg">
                From managing the Chase 5/24 rule to timing deposit
                requirements, our guides help you maximize profits while
                protecting your credit score.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0160c4] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0052cc] active:scale-[0.98]"
                >
                  <span>Read Guides & Tips</span>
                  <ArrowRight weight="bold" className="h-4 w-4" />
                </Link>
                <Link
                  href="/credit-cards"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-6 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-slate-700 active:scale-[0.98]"
                >
                  <span>Compare Card Bonuses</span>
                  <ArrowRight weight="bold" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FREE BANK BONUS EMAIL COURSE - Curated off-white section */}
      <section className="bg-[#f4f6f8] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl">
          <BankBonusEmailCourse />
        </div>
      </section>
    </div>
  );
}
