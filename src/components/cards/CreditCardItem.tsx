import { CreditCard } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { CreditCard as CreditCardIcon } from "@phosphor-icons/react/dist/ssr";
import { CurrencyValue } from "@/components/finance/CurrencyValue";
import { OfferSummary } from "@/components/finance/OfferSummary";
import { IslandLink } from "@/components/shared/IslandLink";
import { Bezel } from "@/components/shared/Bezel";
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
    <Bezel className="h-full">
      <article
        className={cn(
          "flex h-full flex-col overflow-hidden",
          featured ? "md:min-h-[28rem]" : "",
        )}
      >
        <div
          className={cn(
            "relative bg-muted/40",
            featured ? "h-56 md:h-72" : "h-44",
          )}
        >
          {card.imageUrl ? (
            <Image
              src={card.imageUrl}
              alt={`${card.name} Card`}
              fill
              unoptimized
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain p-6"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <CreditCardIcon
                weight="light"
                className="h-16 w-16 text-foreground/25"
              />
            </div>
          )}
          {card.isAnnualFeeWaived && (
            <span className="absolute top-4 right-4 rounded-full bg-[#fbf6ec]/90 px-3 py-1 text-[10px] font-medium tracking-[0.16em] uppercase text-foreground">
              Fee waived yr 1
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-muted-foreground">
                {card.issuer.replaceAll("_", " ")}
              </p>
              <h3
                className={cn(
                  "font-serif mt-1 leading-tight text-foreground",
                  featured ? "text-3xl md:text-4xl" : "text-xl",
                )}
              >
                {card.name}
              </h3>
            </div>
            {card.network && card.network !== card.issuer ? (
              <span className="shrink-0 rounded-full px-2.5 py-1 text-[10px] tracking-[0.16em] uppercase text-muted-foreground ring-1 ring-foreground/10">
                {card.network.replaceAll("_", " ")}
              </span>
            ) : null}
          </div>

          {bestOffer && (
            <div className="mt-5 rounded-[1.25rem] bg-foreground/[0.03] p-4">
              <p className="mb-2 text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground">
                Welcome bonus
              </p>
              <CurrencyValue
                amount={offerAmount}
                currency={offerCurrency}
                className={cn(
                  "font-serif font-medium text-gold",
                  featured ? "text-4xl" : "text-2xl",
                )}
              />
              <div className="mt-3">
                <OfferSummary
                  spend={bestOffer.spend}
                  days={bestOffer.days}
                  expiration={bestOffer.expiration}
                />
              </div>
            </div>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-[1.1rem] bg-muted/60 p-3">
              <p className="text-[11px] tracking-wide text-muted-foreground">
                Annual fee
              </p>
              <p className="mt-1 font-medium text-foreground">
                {card.annualFee > 0 ? `$${card.annualFee}` : "None"}
              </p>
            </div>
            <div className="rounded-[1.1rem] bg-muted/60 p-3">
              <p className="text-[11px] tracking-wide text-muted-foreground">
                Base cashback
              </p>
              <p className="mt-1 font-medium text-foreground">
                {card.universalCashbackPercent}%
              </p>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between pt-6">
            <Link
              href={`/credit-cards/${card.cardId}`}
              className="text-sm tracking-tight text-muted-foreground transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground"
            >
              Details
            </Link>
            <IslandLink href={card.url} external>
              Claim
            </IslandLink>
          </div>
        </div>
      </article>
    </Bezel>
  );
};

export default CreditCardItem;
