import { CreditCard } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CreditCard as CreditCardIcon,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { CurrencyValue } from "@/components/finance/CurrencyValue";
import { OfferSummary } from "@/components/finance/OfferSummary";

interface CreditCardItemProps {
  card: CreditCard;
}

const CreditCardItem = ({ card }: CreditCardItemProps) => {
  const bestOffer = card.offers.length > 0 ? card.offers[0] : null;
  const offerAmount = bestOffer?.amount[0]?.amount || 0;
  const offerCurrency = bestOffer?.amount[0]?.currency || "USD";

  return (
    <Card className="h-full overflow-hidden border-border/70 bg-card/95 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative h-48 bg-muted/40">
        {card.imageUrl ? (
          <img
            src={card.imageUrl}
            alt={`${card.name} Card`}
            className="h-full w-full object-contain p-4"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <CreditCardIcon className="text-primary/40 h-16 w-16" />
          </div>
        )}
        {card.isAnnualFeeWaived && (
          <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground">
            No Annual Fee Year 1
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="line-clamp-2 font-serif text-xl leading-tight text-foreground">
            {card.issuer.replace("_", " ")} {card.name}
          </h3>
          {card.network && (
            <Badge
              variant="outline"
              className="ml-2 text-xs tracking-wide uppercase"
            >
              {card.network.replace("_", " ")}
            </Badge>
          )}
        </div>

        {bestOffer && (
          <div className="mt-4 rounded-xl border border-border/70 bg-accent/40 p-3">
            <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-wide uppercase">
              Welcome bonus
            </p>
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-secondary" />
              <CurrencyValue
                amount={offerAmount}
                currency={offerCurrency}
                className="text-xl font-semibold text-foreground"
              />
            </div>
            <OfferSummary
              spend={bestOffer.spend}
              days={bestOffer.days}
              expiration={bestOffer.expiration}
            />
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-muted/55 p-2">
            <p className="text-muted-foreground">Annual Fee</p>
            <p className="font-semibold text-foreground">
              {card.annualFee > 0 ? `$${card.annualFee}` : "No Annual Fee"}
            </p>
          </div>
          <div className="rounded-lg bg-muted/55 p-2">
            <p className="text-muted-foreground">Base Cashback</p>
            <p className="font-semibold text-foreground">
              {card.universalCashbackPercent}%
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <Link
          href={`/credit-cards/${card.cardId}`}
          className="text-primary text-sm font-medium hover:underline"
        >
          View Details
        </Link>

        <Button
          asChild
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <a href={card.url} target="_blank" rel="noopener noreferrer">
            Apply Now <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreditCardItem;
