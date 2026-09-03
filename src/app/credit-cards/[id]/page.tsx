"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
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
  CreditCard as CreditCardIcon,
  CurrencyDollar,
  Check,
  Info,
} from "@phosphor-icons/react";
import { PageContainer } from "@/components/shared/PageContainer";
import { BackLink } from "@/components/shared/BackLink";
import { EmptyState } from "@/components/shared/EmptyState";
import { CurrencyValue } from "@/components/finance/CurrencyValue";
import { OfferSummary } from "@/components/finance/OfferSummary";
import { Bezel } from "@/components/shared/Bezel";
import { IslandLink } from "@/components/shared/IslandLink";

export default function CreditCardDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
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

  if (isLoading) {
    return (
      <PageContainer className="flex min-h-[70vh] items-center justify-center py-16">
        <p className="font-serif text-2xl tracking-tight text-muted-foreground">
          Loading offer…
        </p>
      </PageContainer>
    );
  }

  if (!card) {
    return (
      <PageContainer className="py-8 md:py-16">
        <div className="mb-6">
          <BackLink href="/credit-cards" label="Back to Credit Cards" />
        </div>
        <EmptyState
          icon={CreditCardIcon}
          title="Card Not Found"
          description={`The credit card you are looking for (ID: ${id || "N/A"}) does not exist or could not be loaded.`}
          actionHref="/credit-cards"
          actionLabel="Browse All Credit Cards"
        />
      </PageContainer>
    );
  }

  const bestOffer = card.offers.length > 0 ? card.offers[0] : null;

  return (
    <PageContainer className="py-8 md:py-16">
      <div className="mb-10">
        <BackLink href="/credit-cards" label="Back to credit cards" />
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
                <Badge className="bg-ring text-white">Business Card</Badge>
              )}
            </div>

            <h1 className="font-serif mb-4 text-4xl tracking-tight md:text-5xl">
              {card.issuer.replace("_", " ")} {card.name}
            </h1>

            {card.details && (
              <p className="text-muted-foreground mb-6 text-lg">
                {card.details}
              </p>
            )}

            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted/55 p-4">
                <p className="text-muted-foreground text-sm">Annual Fee</p>
                <p className="text-xl font-medium">
                  {card.annualFee > 0 ? `$${card.annualFee}` : "No Annual Fee"}
                </p>
                {card.isAnnualFeeWaived && (
                  <p className="text-primary text-sm">Waived First Year</p>
                )}
              </div>

              <div className="rounded-lg bg-muted/55 p-4">
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
            <Bezel>
              <div className="p-6 md:p-8">
                <p className="mb-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  Current offer
                </p>
                <h3 className="font-serif mb-6 text-3xl tracking-tight">
                  Welcome bonus
                </h3>

                <div className="mb-6 flex items-center">
                  <div className="mr-4 rounded-full bg-foreground/5 p-3">
                    <CurrencyDollar
                      weight="light"
                      className="h-8 w-8 text-gold"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payout</p>
                    <CurrencyValue
                      amount={bestOffer.amount[0]?.amount || 0}
                      currency={bestOffer.amount[0]?.currency || "USD"}
                      className="font-serif text-3xl text-gold"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <OfferSummary
                    spend={bestOffer.spend}
                    days={bestOffer.days}
                    expiration={bestOffer.expiration}
                  />

                  {bestOffer.details && (
                    <div className="flex items-start gap-2">
                      <div className="rounded-full bg-foreground/5 p-2">
                        <Info
                          weight="light"
                          className="mt-0.5 h-4 w-4 text-gold"
                        />
                      </div>
                      <span>{bestOffer.details}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <IslandLink href={bestOffer.url || card.url} external>
                    Apply now
                  </IslandLink>
                </div>
              </div>
            </Bezel>
          )}
        </div>

        <Bezel>
          {card.imageUrl ? (
            <Image
              src={card.imageUrl}
              alt={`${card.name} Card`}
              width={320}
              height={250}
              unoptimized
              className="mb-6 h-auto max-h-[250px] w-auto"
            />
          ) : (
            <div className="mb-6 flex h-[250px] w-full items-center justify-center rounded-[1.4rem] bg-muted/55">
              <CreditCardIcon
                weight="light"
                className="h-24 w-24 text-muted-foreground"
              />
            </div>
          )}

          {card.countsTowards524 !== undefined && (
            <div className="mb-4 w-full rounded-lg bg-muted/55 p-4 text-center">
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
                    className="flex items-start gap-2 rounded-[1.1rem] bg-muted/50 p-3"
                  >
                    <Check
                      weight="light"
                      className="mt-0.5 h-4 w-4 text-gold"
                    />
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
                    className="flex items-start gap-2 rounded-[1.1rem] bg-muted/50 p-3"
                  >
                    <Check
                      weight="light"
                      className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                    />
                    <span>{insurance}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Bezel>
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
                      <Check
                        weight="light"
                        className="mt-1 h-4 w-4 shrink-0 text-secondary"
                      />
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
                      <Info
                        weight="light"
                        className="mt-1 h-4 w-4 shrink-0 text-gold"
                      />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </PageContainer>
  );
}
