"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard } from "@/types";
import { fetchCreditCardById } from "@/services/api";
import {
  CreditCard as CreditCardIcon,
  CheckCircle,
  XCircle,
  ArrowLeft,
  ArrowUpRight,
  Sparkle,
} from "@phosphor-icons/react";
import { PageContainer } from "@/components/shared/PageContainer";
import { EmptyState } from "@/components/shared/EmptyState";
import { CurrencyValue } from "@/components/finance/CurrencyValue";
import { OfferSummary } from "@/components/finance/OfferSummary";
import { resolveOfferCurrency, rewardUnitLabel } from "@/lib/rewards";

export default function CreditCardDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [card, setCard] = useState<CreditCard | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(id));

  useEffect(() => {
    const loadCreditCard = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const cardData = await fetchCreditCardById(id);
          setCard(cardData);
        }
      } catch (error) {
        console.error(`Error loading credit card with ID ${id}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadCreditCard();
    }
  }, [id]);

  if (isLoading) {
    return (
      <PageContainer className="flex min-h-[70vh] items-center justify-center py-16">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0160c4] border-t-transparent" />
          <p className="text-sm font-semibold text-slate-500">
            Loading offer details...
          </p>
        </div>
      </PageContainer>
    );
  }

  if (!card) {
    return (
      <PageContainer className="py-8 md:py-16">
        <div className="mb-6">
          <Link
            href="/credit-cards"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0160c4] dark:text-slate-400 dark:hover:text-[#38b6ff]"
          >
            <ArrowLeft weight="bold" className="h-4 w-4" />
            <span>Back to Credit Cards</span>
          </Link>
        </div>
        <EmptyState
          icon={CreditCardIcon}
          title="Card Not Found"
          description={`The credit card with ID "${id || "N/A"}" does not exist or is no longer available.`}
          actionHref="/credit-cards"
          actionLabel="Browse All Credit Cards"
        />
      </PageContainer>
    );
  }

  const bestOffer = card.offers.length > 0 ? card.offers[0] : null;
  const offerCurrency = resolveOfferCurrency(card, bestOffer?.amount[0]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f4f6f8] py-8 md:py-12 dark:bg-slate-950">
      <PageContainer>
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/credit-cards"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0160c4] dark:text-slate-400 dark:hover:text-[#38b6ff]"
          >
            <ArrowLeft weight="bold" className="h-4 w-4" />
            <span>Back to All Credit Cards</span>
          </Link>
        </div>

        {/* Main Grid: Left = Info & Welcome Offer, Right = Card Art & Details */}
        <div className="mb-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Left Column: Hero Details & Welcome Bonus */}
          <div className="flex flex-col space-y-6 lg:col-span-7">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 uppercase dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300">
                  {card.issuer.replaceAll("_", " ")}
                </span>
                {card.network !== card.issuer && (
                  <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 uppercase dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300">
                    {card.network.replaceAll("_", " ")}
                  </span>
                )}
                {card.isBusiness && (
                  <span className="rounded-md bg-blue-100 px-2.5 py-1 text-xs font-bold text-[#0160c4] dark:bg-blue-950 dark:text-[#38b6ff]">
                    Business Card
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
                {card.name}
              </h1>

              {card.details && (
                <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  {card.details}
                </p>
              )}

              {/* Quick Fee & Rate Metrics */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white p-4 shadow-xs dark:bg-slate-900">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Annual Fee
                  </span>
                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                    {card.annualFee > 0
                      ? `$${card.annualFee}`
                      : "No Annual Fee"}
                  </p>
                  {card.isAnnualFeeWaived && (
                    <p className="mt-1 text-xs font-semibold text-[#00a859]">
                      Waived First Year
                    </p>
                  )}
                </div>

                <div className="rounded-xl bg-white p-4 shadow-xs dark:bg-slate-900">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Base Cashback
                  </span>
                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                    {card.universalCashbackPercent}%
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    On all eligible purchases
                  </p>
                </div>
              </div>
            </div>

            {/* Current Welcome Offer Box - Solid emerald, borderless */}
            {bestOffer && (
              <div className="rounded-2xl bg-emerald-50/80 p-7 shadow-sm dark:bg-emerald-950/40 md:p-8">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider text-emerald-800 uppercase dark:text-emerald-400">
                    Current Welcome Bonus
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <Sparkle weight="fill" className="h-3.5 w-3.5" />
                    <span>Verified Offer</span>
                  </span>
                </div>

                <div className="mt-3">
                  <CurrencyValue
                    amount={bestOffer.amount[0]?.amount || 0}
                    currency={offerCurrency}
                    className="text-4xl font-extrabold text-[#00a859] sm:text-5xl dark:text-emerald-400"
                  />
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    {rewardUnitLabel(offerCurrency)}
                  </p>
                </div>

                <div className="mt-5 text-sm text-slate-600 dark:text-slate-400">
                  <OfferSummary
                    spend={bestOffer.spend}
                    days={bestOffer.days}
                    expiration={bestOffer.expiration}
                  />
                </div>

                {bestOffer.details && (
                  <div className="mt-3 rounded-lg bg-white/80 p-3 text-xs text-slate-600 dark:bg-slate-800/80 dark:text-slate-300">
                    {bestOffer.details}
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={bestOffer.url || card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0160c4] px-6 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-[#0052cc] active:scale-[0.98]"
                  >
                    <span>Apply on Issuer Site</span>
                    <ArrowUpRight weight="bold" className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Card Graphic & Benefits Summary - Borderless */}
          <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.06)] dark:bg-slate-900 md:p-8 lg:col-span-5">
            {card.imageUrl ? (
              <div className="relative mb-6 flex h-52 w-full items-center justify-center rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
                <Image
                  src={card.imageUrl}
                  alt={`${card.name} Card`}
                  width={320}
                  height={200}
                  unoptimized
                  className="max-h-48 w-auto object-contain drop-shadow-md"
                />
              </div>
            ) : (
              <div className="mb-6 flex h-52 w-full items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-950">
                <CreditCardIcon
                  weight="duotone"
                  className="h-20 w-20 text-slate-300 dark:text-slate-700"
                />
              </div>
            )}

            {/* Chase 5/24 Rule Status */}
            {card.countsTowards524 !== undefined && (
              <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 text-center text-xs dark:border-slate-800 dark:bg-slate-800/50">
                <p className="font-semibold text-slate-900 dark:text-white">
                  {card.countsTowards524
                    ? "Counts toward the Chase 5/24 rule"
                    : "Does not count toward the Chase 5/24 rule"}
                </p>
              </div>
            )}

            {/* Credits and Benefits */}
            {!!card.credits?.length && (
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-bold text-slate-900 uppercase dark:text-white">
                  Statement Credits & Value
                </h3>
                <div className="space-y-2">
                  {card.credits.map((credit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/60 p-3 text-xs dark:border-slate-800 dark:bg-slate-800/40"
                    >
                      <CheckCircle
                        weight="fill"
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#00a859]"
                      />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {credit.description}
                        </p>
                        {credit.value && (
                          <p className="mt-0.5 font-bold text-[#00a859]">
                            Value: ${credit.value.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reward Multipliers Table */}
            {!!card.rewardMultipliers?.length && (
              <div>
                <h3 className="mb-3 text-sm font-bold text-slate-900 uppercase dark:text-white">
                  Reward Multipliers
                </h3>
                <div className="overflow-hidden rounded-xl border border-slate-200 text-xs dark:border-slate-800">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50 dark:bg-slate-800/60">
                        <TableHead className="font-bold">Category</TableHead>
                        <TableHead className="font-bold">Multiplier</TableHead>
                        <TableHead className="font-bold">Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {card.rewardMultipliers.map((multiplier, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-semibold text-slate-900 dark:text-white">
                            {multiplier.category}
                          </TableCell>
                          <TableCell className="font-bold text-[#00a859]">
                            {multiplier.multiplier}x
                          </TableCell>
                          <TableCell className="text-slate-500">
                            {multiplier.details}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pros & Cons Section */}
        {/* Pros & Cons Section - Borderless */}
        {((card.pros?.length ?? 0) > 0 || (card.cons?.length ?? 0) > 0) && (
          <div className="rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.06)] dark:bg-slate-900 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Editorial Review: Pros & Cons
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
              {(card.pros?.length ?? 0) > 0 && (
                <div>
                  <span className="text-xs font-bold tracking-wider text-[#00a859] uppercase">
                    Why We Love It (Pros)
                  </span>
                  <ul className="mt-3 space-y-2.5">
                    {card.pros.map((pro, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                      >
                        <CheckCircle
                          weight="fill"
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#00a859]"
                        />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {(card.cons?.length ?? 0) > 0 && (
                <div>
                  <span className="text-xs font-bold tracking-wider text-rose-600 uppercase dark:text-rose-400">
                    Things to Keep in Mind (Cons)
                  </span>
                  <ul className="mt-3 space-y-2.5">
                    {card.cons.map((con, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                      >
                        <XCircle
                          weight="fill"
                          className="mt-0.5 h-4 w-4 shrink-0 text-rose-500"
                        />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </PageContainer>
    </div>
  );
}
