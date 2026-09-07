import { CreditCard } from "@/types";
import Image from "next/image";
import Link from "next/link";
import {
  CreditCard as CreditCardIcon,
  Sparkle,
  ArrowRight,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";
import { CurrencyValue } from "@/components/finance/CurrencyValue";
import { OfferSummary } from "@/components/finance/OfferSummary";
import { cn } from "@/lib/utils";

interface CreditCardItemProps {
  card: CreditCard;
  featured?: boolean;
}

const CreditCardItem = ({ card, featured = false }: CreditCardItemProps) => {
  const bestOffer = card.offers.length > 0 ? card.offers[0] : null;
  const offerAmount = bestOffer?.amount[0]?.amount || 0;
  const offerCurrency = bestOffer?.amount[0]?.currency || "USD";

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-200 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700",
        featured ? "md:col-span-7" : "",
      )}
    >
      {/* Top Media / Card Art Area */}
      <div
        className={cn(
          "relative flex items-center justify-center border-b border-slate-100 bg-gradient-to-b from-slate-50 to-slate-100/60 p-6 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950/60",
          featured ? "h-60 md:h-72" : "h-48",
        )}
      >
        {card.imageUrl ? (
          <div className="relative h-full w-full">
            <Image
              src={card.imageUrl}
              alt={`${card.name} Card`}
              fill
              unoptimized
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain drop-shadow-md transition-transform duration-200 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <CreditCardIcon
              weight="duotone"
              className="h-20 w-20 text-slate-300 dark:text-slate-700"
            />
          </div>
        )}

        {/* Status badges */}
        <div className="absolute top-3 right-3 flex flex-wrap gap-1.5">
          {featured && (
            <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-[#0160c4] dark:border-blue-800 dark:bg-blue-950/80 dark:text-[#38b6ff]">
              <Sparkle weight="fill" className="h-3 w-3" />
              <span>Top Pick</span>
            </span>
          )}
          {card.isAnnualFeeWaived && (
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
              Fee waived yr 1
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Issuer and Card Name */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
              {card.issuer.replaceAll("_", " ")}
            </p>
            <h3
              className={cn(
                "mt-1 font-bold text-slate-900 transition-colors group-hover:text-[#0160c4] dark:text-white dark:group-hover:text-[#38b6ff]",
                featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl",
              )}
            >
              <Link href={`/credit-cards/${card.cardId}`}>{card.name}</Link>
            </h3>
          </div>
          {card.network && card.network !== card.issuer ? (
            <span className="shrink-0 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold tracking-wider text-slate-600 uppercase dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300">
              {card.network.replaceAll("_", " ")}
            </span>
          ) : null}
        </div>

        {/* Welcome Bonus Callout Box - High visual prominence like Bankrate/NerdWallet */}
        {bestOffer ? (
          <div className="mt-4 rounded-xl border border-emerald-200/80 bg-emerald-50/60 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider text-emerald-800 uppercase dark:text-emerald-400">
                Welcome Bonus
              </span>
              <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                Verified Offer
              </span>
            </div>
            <div className="mt-1">
              <CurrencyValue
                amount={offerAmount}
                currency={offerCurrency}
                className={cn(
                  "font-extrabold text-[#00a859] dark:text-emerald-400",
                  featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl",
                )}
              />
            </div>
            <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
              <OfferSummary
                spend={bestOffer.spend}
                days={bestOffer.days}
                expiration={bestOffer.expiration}
              />
            </div>
          </div>
        ) : null}

        {/* Quick Specs Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2.5 text-xs">
          <div className="rounded-lg border border-slate-100 bg-slate-50/80 p-2.5 dark:border-slate-800 dark:bg-slate-800/60">
            <span className="text-slate-500 dark:text-slate-400">
              Annual Fee
            </span>
            <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">
              {card.annualFee > 0 ? `$${card.annualFee}` : "No Annual Fee"}
            </p>
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50/80 p-2.5 dark:border-slate-800 dark:bg-slate-800/60">
            <span className="text-slate-500 dark:text-slate-400">
              Cashback / Rate
            </span>
            <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">
              {card.universalCashbackPercent}% on all spend
            </p>
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <Link
            href={`/credit-cards/${card.cardId}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-[#0160c4] dark:text-slate-300 dark:hover:text-[#38b6ff]"
          >
            <span>See Card Details</span>
            <ArrowRight weight="bold" className="h-3.5 w-3.5" />
          </Link>
          <a
            href={bestOffer?.url || card.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg bg-[#0160c4] px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#0052cc] active:scale-[0.98]"
          >
            <span>Apply Now</span>
            <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CreditCardItem;
