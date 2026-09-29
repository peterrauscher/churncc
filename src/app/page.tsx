"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  AirplaneTilt,
  ArrowRight,
  Bank as BankIcon,
  CheckCircle,
  Coins,
  PiggyBank,
  Sparkle,
  Star,
} from "@phosphor-icons/react";
import CreditCardGrid from "@/components/cards/CreditCardGrid";
import BankAccountGrid from "@/components/cards/BankAccountGrid";
import { LoadingCards } from "@/components/shared/LoadingCards";
import { PageContainer } from "@/components/shared/PageContainer";
import { BonusCalculator } from "@/components/finance/BonusCalculator";
import { BankLogoCarousel } from "@/components/layout/BankLogoCarousel";
import { BankBonusEmailCourse } from "@/components/layout/BankBonusEmailCourse";
import { EditorialGuides } from "@/components/home/EditorialGuides";
import { EditorialStandards } from "@/components/home/EditorialStandards";
import { CreditCard, BankAccount } from "@/types";
import { fetchCreditCards, getMockBankAccounts } from "@/services/api";
import { cardOfferValueInUsd } from "@/lib/rewards";

const FEATURED_COLUMNS = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

const CATEGORY_HUBS = [
  {
    href: "/credit-cards?type=travel",
    icon: AirplaneTilt,
    title: "Travel Rewards",
    description:
      "Airline miles and transferable points with the largest welcome payouts.",
    topOffer: "Up to $1,500+ value",
    accent: "text-blue-600 bg-blue-50 dark:bg-blue-950/80 dark:text-blue-400",
  },
  {
    href: "/credit-cards?type=cashback",
    icon: Coins,
    title: "Cash Back Cards",
    description:
      "Straightforward dollar statement credits with $0 annual fees.",
    topOffer: "$200–$250 bonuses",
    accent:
      "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/80 dark:text-emerald-400",
  },
  {
    href: "/bank-accounts?type=checking",
    icon: BankIcon,
    title: "Checking Promos",
    description:
      "Cash payouts for routing a direct deposit you already receive.",
    topOffer: "$300–$700 cash",
    accent: "text-sky-600 bg-sky-50 dark:bg-sky-950/80 dark:text-sky-400",
  },
  {
    href: "/bank-accounts?type=savings",
    icon: PiggyBank,
    title: "High-Yield Savings",
    description: "Cash deposit matches on top of competitive 4%+ APY rates.",
    topOffer: "Up to $200+ bonus",
    accent:
      "text-amber-600 bg-amber-50 dark:bg-amber-950/80 dark:text-amber-400",
  },
];

export default function HomePage() {
  const [featuredCards, setFeaturedCards] = useState<CreditCard[]>([]);
  const [featuredAccounts, setFeaturedAccounts] = useState<BankAccount[]>([]);
  const [activeTab, setActiveTab] = useState<"cards" | "banks">("cards");
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
          .sort((a, b) => cardOfferValueInUsd(b) - cardOfferValueInUsd(a))
          .slice(0, 3);
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

  return (
    <div className="flex flex-col">
      {/* SECTION 1: HERO & EDITORIAL VALUE PROPOSITION */}
      <section className="border-b border-slate-200/80 bg-white pt-14 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24 dark:border-slate-800 dark:bg-slate-950">
        <PageContainer>
          <div className="mx-auto max-w-4xl text-center">
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-blue-50/70 px-4 py-1.5 text-xs font-bold text-[#0160c4] dark:border-blue-900/60 dark:bg-blue-950/60 dark:text-[#38b6ff]">
              <Sparkle weight="fill" className="h-3.5 w-3.5" />
              <span>Independent & Merit-Ranked · 1,000+ Offers Tracked</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-[4.25rem] lg:leading-[1.1] dark:text-white">
              Smart bonus decisions start with honest math.
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-300">
              Banks spend billions each year to acquire new customers. We track,
              verify, and rank the nation&apos;s highest credit card welcome
              offers and bank account promotions — 100% free with zero referral
              bias.
            </p>

            {/* Action buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/credit-cards"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0160c4] px-7 text-base font-semibold text-white shadow-sm transition-all hover:bg-[#0052cc] active:scale-[0.98] sm:w-auto"
              >
                <span>Compare Credit Cards</span>
                <ArrowRight weight="bold" className="h-4 w-4" />
              </Link>
              <Link
                href="/bank-accounts"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 text-base font-semibold text-slate-800 shadow-xs transition-all hover:bg-slate-50 active:scale-[0.98] sm:w-auto dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <span>Explore Bank Promos</span>
                <ArrowRight weight="bold" className="h-4 w-4" />
              </Link>
            </div>

            {/* Trust checkmarks */}
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li className="flex items-center gap-1.5">
                <CheckCircle
                  weight="fill"
                  className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                />
                <span>100% Free & No Account Needed</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle
                  weight="fill"
                  className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                />
                <span>Offers Verified Daily</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle
                  weight="fill"
                  className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                />
                <span>Zero Corporate Review Rights</span>
              </li>
            </ul>
          </div>

          {/* CATEGORY HUB (NerdWallet style quick access cards) */}
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORY_HUBS.map((hub) => {
              const Icon = hub.icon;
              return (
                <Link
                  key={hub.title}
                  href={hub.href}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${hub.accent}`}
                      >
                        <Icon weight="bold" className="h-5 w-5" />
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {hub.topOffer}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-900 transition-colors group-hover:text-[#0160c4] dark:text-white dark:group-hover:text-[#38b6ff]">
                      {hub.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      {hub.description}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-[#0160c4] dark:border-slate-800 dark:text-[#38b6ff]">
                    <span>Browse offers</span>
                    <ArrowRight
                      weight="bold"
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bank Partner Logos Carousel */}
          <BankLogoCarousel className="mt-14" />
        </PageContainer>
      </section>

      {/* SECTION 2: EDITORIAL PICKS / BEST OF THE MONTH */}
      <section className="bg-slate-50/70 py-16 sm:py-20 lg:py-24 dark:bg-slate-900/30">
        <PageContainer>
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-emerald-700 dark:text-emerald-400">
                <Star weight="fill" className="h-4 w-4 text-amber-500" />
                <span>Editor&apos;s Ranked Picks</span>
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                Highest-upside offers this month
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
                Ranked by real net payout, spend feasibility, and fee structure.
                Loyalty points are valued at conservative redemption rates.
              </p>
            </div>

            {/* Tabs for Cards vs Banks */}
            <div className="flex shrink-0 items-center rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
              <button
                type="button"
                onClick={() => setActiveTab("cards")}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "cards"
                    ? "bg-[#0160c4] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                Top Credit Cards
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("banks")}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "banks"
                    ? "bg-[#0160c4] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                Top Bank Promos
              </button>
            </div>
          </div>

          {/* Cards Tab */}
          {activeTab === "cards" && (
            <div>
              {isLoading ? (
                <LoadingCards count={3} columns={FEATURED_COLUMNS} />
              ) : (
                <CreditCardGrid
                  cards={featuredCards}
                  columns={FEATURED_COLUMNS}
                  emptyMessage="No featured cards available right now."
                />
              )}
              <div className="mt-8 text-center sm:text-right">
                <Link
                  href="/credit-cards"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#0160c4] hover:underline dark:text-[#38b6ff]"
                >
                  <span>View all 175+ credit cards ranked by net value</span>
                  <ArrowRight
                    weight="bold"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          )}

          {/* Banks Tab */}
          {activeTab === "banks" && (
            <div>
              {isLoading ? (
                <LoadingCards count={3} columns={FEATURED_COLUMNS} />
              ) : (
                <BankAccountGrid
                  accounts={featuredAccounts}
                  emptyMessage="No featured bank accounts available right now."
                />
              )}
              <div className="mt-8 text-center sm:text-right">
                <Link
                  href="/bank-accounts"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#0160c4] hover:underline dark:text-[#38b6ff]"
                >
                  <span>View all bank account bonuses & promos</span>
                  <ArrowRight
                    weight="bold"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          )}
        </PageContainer>
      </section>

      {/* SECTION 3: EDITORIAL GUIDES & RESEARCH (The core content-focused Nerdwallet/Bankrate feature) */}
      <section className="bg-white py-16 sm:py-20 lg:py-24 dark:bg-slate-950">
        <PageContainer>
          <EditorialGuides />
        </PageContainer>
      </section>

      {/* SECTION 4: INTERACTIVE BONUS UPSIDE CALCULATOR */}
      <section className="border-t border-slate-200/80 bg-slate-50/70 py-16 sm:py-20 lg:py-24 dark:border-slate-800 dark:bg-slate-900/30">
        <PageContainer>
          <BonusCalculator />
        </PageContainer>
      </section>

      {/* SECTION 5: EDITORIAL STANDARDS (Bankrate "Built for people, not banks") */}
      <section className="bg-white py-16 sm:py-20 lg:py-24 dark:bg-slate-950">
        <PageContainer>
          <EditorialStandards />
        </PageContainer>
      </section>

      {/* SECTION 6: FREE 5-DAY BANK BONUS EMAIL COURSE */}
      <section className="border-t border-slate-200/80 bg-slate-50/70 py-16 sm:py-20 lg:py-24 dark:border-slate-800 dark:bg-slate-900/30">
        <PageContainer>
          <BankBonusEmailCourse />
        </PageContainer>
      </section>
    </div>
  );
}
