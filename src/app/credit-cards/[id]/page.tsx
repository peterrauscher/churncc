"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
  ArrowLeft,
  CreditCard as CreditCardIcon,
  DollarSign,
  Calendar,
  Check,
  Info,
  Layout,
} from "lucide-react";

interface CreditCardDetailPageProps {
  params: { id: string };
}

export default function CreditCardDetailPage({
  params,
}: CreditCardDetailPageProps) {
  const { id } = params;
  const [card, setCard] = useState<CreditCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const formatCurrency = (currency: string) => {
    if (currency === "USD") return "$";
    return currency;
  };

  const formatRewardValue = (amount: number, currency: string) => {
    if (currency === "USD") {
      return `$${amount.toLocaleString()}`;
    } else if (
      currency.includes("POINTS") ||
      currency.includes("MILES") ||
      ["DELTA", "AMERICAN", "UNITED", "SOUTHWEST"].includes(currency)
    ) {
      return `${amount.toLocaleString()} ${currency
        .replace("_", " ")
        .toLowerCase()}`;
    }
    return `${amount.toLocaleString()} ${currency
      .replace("_", " ")
      .toLowerCase()}`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-8 md:px-6">
        <div className="border-fintech-purple h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  if (!card) {
    return (
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-6">
          <Link
            href="/credit-cards"
            className="text-fintech-purple flex items-center hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Credit Cards
          </Link>
        </div>
        <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-lg border p-8 text-center">
          <CreditCardIcon className="text-muted-foreground mb-4 h-16 w-16" />
          <h2 className="mb-2 text-2xl font-bold">Card Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The credit card you're looking for (ID: {id || "N/A"}) doesn't
            exist, has been discontinued, or there was an issue loading it.
          </p>
          <Button asChild>
            <Link href="/credit-cards">Browse All Credit Cards</Link>
          </Button>
        </div>
      </div>
    );
  }

  const bestOffer = card.offers.length > 0 ? card.offers[0] : null;

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-6">
        <Link
          href="/credit-cards"
          className="text-fintech-purple flex items-center hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Credit Cards
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-between">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Badge variant="outline" className="text-sm font-normal">
                {card.network.replace("_", " ")}
              </Badge>
              <Badge variant="outline" className="text-sm font-normal">
                {card.issuer.replace("_", " ")}
              </Badge>
              {card.isBusiness && (
                <Badge className="bg-fintech-blue text-white">
                  Business Card
                </Badge>
              )}
            </div>

            <h1 className="mb-4 text-3xl font-bold md:text-4xl">
              {card.issuer.replace("_", " ")} {card.name}
            </h1>

            {card.details && (
              <p className="text-muted-foreground mb-6 text-lg">
                {card.details}
              </p>
            )}

            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-muted-foreground text-sm">Annual Fee</p>
                <p className="text-xl font-medium">
                  {card.annualFee > 0 ? `$${card.annualFee}` : "No Annual Fee"}
                </p>
                {card.isAnnualFeeWaived && (
                  <p className="text-fintech-purple text-sm">
                    Waived First Year
                  </p>
                )}
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-muted-foreground text-sm">Base Cashback</p>
                <p className="text-xl font-medium">
                  {card.universalCashbackPercent}%
                </p>
                <p className="text-muted-foreground text-sm">
                  On all purchases
                </p>
              </div>
            </div>
          </div>

          {bestOffer && (
            <Card className="border-fintech-purple border-2">
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-bold">Current Offer</h3>

                <div className="mb-6 flex items-center">
                  <div className="bg-fintech-purple/10 mr-4 rounded-full p-3">
                    <DollarSign className="text-fintech-purple h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Welcome Bonus
                    </p>
                    <p className="text-fintech-purple text-2xl font-bold">
                      {formatRewardValue(
                        bestOffer.amount[0]?.amount || 0,
                        bestOffer.amount[0]?.currency || "USD",
                      )}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <DollarSign className="text-fintech-purple mt-0.5 h-4 w-4" />
                    <span>
                      Spend ${bestOffer.spend.toLocaleString()} in{" "}
                      {bestOffer.days} days
                    </span>
                  </div>

                  {bestOffer.expiration && (
                    <div className="flex items-start gap-2">
                      <Calendar className="text-fintech-purple mt-0.5 h-4 w-4" />
                      <span>
                        Expires:{" "}
                        {new Date(bestOffer.expiration).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {bestOffer.details && (
                    <div className="flex items-start gap-2">
                      <Info className="text-fintech-purple mt-0.5 h-4 w-4" />
                      <span>{bestOffer.details}</span>
                    </div>
                  )}
                </div>

                <Button
                  asChild
                  className="bg-fintech-purple hover:bg-fintech-secondary mt-6 w-full"
                >
                  <a
                    href={bestOffer.url || card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply Now
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex flex-col items-center justify-start rounded-lg border bg-white p-6 md:p-8">
          {card.imageUrl ? (
            <img
              src={card.imageUrl}
              alt={`${card.name} Card`}
              className="mb-6 h-auto max-h-[250px] w-auto"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          ) : (
            <div className="mb-6 flex h-[250px] w-full items-center justify-center rounded bg-gray-100">
              <CreditCardIcon className="text-muted-foreground h-24 w-24" />
            </div>
          )}

          {card.countsTowards524 !== undefined && (
            <div className="mb-4 w-full rounded-lg bg-gray-50 p-4 text-center">
              <p className="font-medium">
                {card.countsTowards524
                  ? "Counts towards Chase 5/24 rule"
                  : "Does NOT count towards Chase 5/24 rule"}
              </p>
            </div>
          )}

          {card.credits.length > 0 && (
            <div className="mt-4 w-full">
              <h3 className="mb-4 text-lg font-bold">
                Card Credits & Benefits
              </h3>
              <div className="space-y-3">
                {card.credits.map((credit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 rounded-lg border p-3"
                  >
                    <Check className="text-fintech-purple mt-0.5 h-4 w-4" />
                    <div>
                      <p className="font-medium">{credit.description}</p>
                      {credit.value && (
                        <p className="text-muted-foreground text-sm">
                          Value: ${credit.value.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {card.rewardMultipliers.length > 0 && (
            <div className="mt-8 w-full">
              <h3 className="mb-4 text-lg font-bold">Reward Multipliers</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Multiplier</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {card.rewardMultipliers.map((multiplier, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {multiplier.category}
                      </TableCell>
                      <TableCell>{multiplier.multiplier}x</TableCell>
                      <TableCell>{multiplier.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {card.insurances.length > 0 && (
            <div className="mt-8 w-full">
              <h3 className="mb-4 text-lg font-bold">
                Travel & Purchase Protections
              </h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {card.insurances.map((insurance, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 rounded-lg border p-3"
                  >
                    <Check className="text-fintech-purple mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>{insurance}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {(card.pros.length > 0 || card.cons.length > 0) && (
        <>
          <Separator className="my-8" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {card.pros.length > 0 && (
              <div>
                <h3 className="mb-4 text-xl font-bold">Pros</h3>
                <ul className="space-y-2">
                  {card.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {card.cons.length > 0 && (
              <div>
                <h3 className="mb-4 text-xl font-bold">Cons</h3>
                <ul className="space-y-2">
                  {card.cons.map((con, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Info className="mt-1 h-4 w-4 flex-shrink-0 text-red-500" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
