import { CreditCard } from "@/types";
import Image from "next/image";
import Link from "next/link";
import {
  CreditCard as CreditCardIcon,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";
import { CurrencyValue } from "@/components/finance/CurrencyValue";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  isCashCurrency,
  programLabel,
  resolveOfferCurrency,
  rewardValueInUsd,
} from "@/lib/rewards";

interface CreditCardItemProps {
  card: CreditCard;
}

function baseEarnLabel(card: CreditCard): string {
  const rate = card.universalCashbackPercent;
  if (!rate) return "—";
  return isCashCurrency(card.currency)
    ? `${rate}% cash back`
    : `${rate}x points`;
}

const CreditCardItem = ({ card }: CreditCardItemProps) => {
  const bestOffer = card.offers.length > 0 ? card.offers[0] : null;
  const offerAmount = bestOffer?.amount[0]?.amount || 0;
  const offerCurrency = resolveOfferCurrency(card, bestOffer?.amount[0]);
  const estimatedUsd = isCashCurrency(offerCurrency)
    ? null
    : Math.round(rewardValueInUsd(offerAmount, offerCurrency));
  const detailsHref = `/credit-cards/${card.cardId}`;
  const applyHref = bestOffer?.url || card.url;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
      <Link
        href={detailsHref}
        tabIndex={-1}
        aria-hidden
        className="flex h-44 items-center justify-center border-b border-border bg-muted px-10 py-7"
      >
        {card.imageUrl ? (
          <div className="relative h-full w-full">
            <Image
              src={card.imageUrl}
              alt=""
              fill
              unoptimized
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain drop-shadow-sm"
            />
          </div>
        ) : (
          <CreditCardIcon
            weight="light"
            className="h-16 w-16 text-muted-foreground/50"
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3 text-[13px] text-muted-foreground">
          <span className="truncate">{programLabel(card.issuer)}</span>
          {card.isAnnualFeeWaived && (
            <span className="shrink-0 font-medium text-positive">
              First-year fee waived
            </span>
          )}
        </div>
        <h3 className="mt-1 text-lg leading-snug font-semibold text-foreground">
          <Link
            href={detailsHref}
            className="underline-offset-4 decoration-1 hover:underline"
          >
            {card.name}
          </Link>
        </h3>

        {bestOffer ? (
          <div className="mt-6">
            <p className="text-[13px] text-muted-foreground">Welcome bonus</p>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
              <CurrencyValue
                amount={offerAmount}
                currency={offerCurrency}
                className="text-[28px] leading-tight font-semibold tracking-tight text-foreground"
              />
              {estimatedUsd ? (
                <span className="text-sm text-muted-foreground tabular-nums">
                  ≈ ${estimatedUsd.toLocaleString()} value
                </span>
              ) : null}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              After ${bestOffer.spend.toLocaleString()} spend in{" "}
              {bestOffer.days} days
            </p>
          </div>
        ) : null}

        <dl className="mt-6 grid grid-cols-2 gap-x-6 border-t border-border pt-4 text-sm">
          <div>
            <dt className="text-[13px] text-muted-foreground">Annual fee</dt>
            <dd className="mt-0.5 font-medium text-foreground tabular-nums">
              {card.annualFee > 0 ? `$${card.annualFee}` : "$0"}
            </dd>
          </div>
          <div>
            <dt className="text-[13px] text-muted-foreground">Base earn</dt>
            <dd className="mt-0.5 font-medium text-foreground">
              {baseEarnLabel(card)}
            </dd>
          </div>
        </dl>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
          <Link
            href={detailsHref}
            className={buttonVariants({ variant: "outline" })}
          >
            Details
          </Link>
          {applyHref ? (
            <a
              href={applyHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants(), "gap-1.5")}
            >
              Apply now
              <ArrowUpRight weight="bold" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default CreditCardItem;
