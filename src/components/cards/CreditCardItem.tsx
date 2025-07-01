import { CreditCard } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CreditCard as CreditCardIcon,
  ArrowRight,
  DollarSign,
  Calendar,
} from "lucide-react";

interface CreditCardItemProps {
  card: CreditCard;
}

const CreditCardItem = ({ card }: CreditCardItemProps) => {
  // Get the highest offer amount
  const bestOffer = card.offers.length > 0 ? card.offers[0] : null;
  const offerAmount = bestOffer?.amount[0]?.amount || 0;
  const offerCurrency = bestOffer?.amount[0]?.currency || "USD";

  // Format currency display
  const formatCurrency = (currency: string) => {
    if (currency === "USD") return "$";
    return currency;
  };

  // Format the reward value for display
  const formatRewardValue = (amount: number, currency: string) => {
    if (currency === "USD") {
      return `$${amount.toLocaleString()}`;
    } else if (
      currency.includes("POINTS") ||
      currency.includes("MILES") ||
      ["DELTA", "AMERICAN", "UNITED", "SOUTHWEST"].includes(currency)
    ) {
      return `${amount.toLocaleString()} ${currency.replace("_", " ").toLowerCase()}`;
    }
    return `${amount.toLocaleString()} ${currency.replace("_", " ").toLowerCase()}`;
  };

  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 bg-gray-100">
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
            <CreditCardIcon className="h-16 w-16 text-fintech-purple/50" />
          </div>
        )}
        {card.isAnnualFeeWaived && (
          <Badge className="absolute right-2 top-2 bg-fintech-orange text-white">
            No Annual Fee Year 1
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="line-clamp-2 text-lg font-semibold">
            {card.issuer.replace("_", " ")} {card.name}
          </h3>
          {card.network && (
            <Badge variant="outline" className="ml-2">
              {card.network.replace("_", " ")}
            </Badge>
          )}
        </div>

        {bestOffer && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-fintech-purple" />
              <span className="font-medium">
                Welcome Bonus:{" "}
                <span className="font-bold text-fintech-purple">
                  {formatRewardValue(offerAmount, offerCurrency)}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-fintech-purple" />
              <span className="text-sm">
                Spend ${bestOffer.spend.toLocaleString()} in {bestOffer.days}{" "}
                days
              </span>
            </div>

            {bestOffer.expiration && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-fintech-purple" />
                <span className="text-sm">
                  Expires: {new Date(bestOffer.expiration).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="mt-4">
          <div className="flex items-center justify-between text-sm">
            <span>Annual Fee</span>
            <span className="font-medium">
              {card.annualFee > 0 ? `$${card.annualFee}` : "No Annual Fee"}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between text-sm">
            <span>Base Cashback</span>
            <span className="font-medium">
              {card.universalCashbackPercent}%
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <Link
          href={`/credit-cards/${card.cardId}`}
          className="text-sm font-medium text-fintech-purple hover:underline"
        >
          View Details
        </Link>

        <Button
          asChild
          className="bg-fintech-purple hover:bg-fintech-secondary"
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
