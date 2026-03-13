"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Changed from react-router-dom
import CreditCardGrid from "@/components/cards/CreditCardGrid";
import CreditCardFilters from "@/components/filters/CreditCardFilters";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingCards } from "@/components/shared/LoadingCards";
import { CreditCard, FilterOptions, SortOptions } from "@/types";
import { fetchCreditCards } from "@/services/api";

export default function CreditCardsPage() {
  // Renamed for clarity
  const searchParams = useSearchParams(); // From next/navigation
  // We are not using setSearchParams directly in this component,
  // but CreditCardFilters might need to be updated to use Next.js navigation for URL updates.
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<CreditCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [issuers, setIssuers] = useState<string[]>([]);
  const [networks, setNetworks] = useState<string[]>([]);

  const urlIssuer = searchParams.get("issuer");

  useEffect(() => {
    const loadCreditCards = async () => {
      setIsLoading(true);
      try {
        const cardsData = await fetchCreditCards();

        const activeCards = cardsData.filter(
          (card: CreditCard) => !card.discontinued,
        );
        setCreditCards(activeCards);
        let initialDisplayCards = [...activeCards];

        const uniqueIssuers = Array.from(
          new Set(activeCards.map((card: CreditCard) => card.issuer)),
        ) as string[]; // Explicit type assertion
        setIssuers(uniqueIssuers);

        const uniqueNetworks = Array.from(
          new Set(activeCards.map((card: CreditCard) => card.network)),
        ) as string[]; // Explicit type assertion
        setNetworks(uniqueNetworks);

        if (urlIssuer) {
          initialDisplayCards = activeCards.filter(
            (card: CreditCard) => card.issuer === urlIssuer,
          );
        }
        setFilteredCards(initialDisplayCards);
      } catch (error) {
        console.error("Error loading credit cards:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCreditCards();
  }, [urlIssuer]);

  const handleFilterChange = (filters: FilterOptions) => {
    let tempFiltered = [...creditCards];

    if (filters.issuer && filters.issuer.length > 0) {
      tempFiltered = tempFiltered.filter((card: CreditCard) =>
        filters.issuer!.includes(card.issuer),
      );
    }

    if (filters.network && filters.network.length > 0) {
      tempFiltered = tempFiltered.filter((card: CreditCard) =>
        filters.network!.includes(card.network),
      );
    }

    if (filters.annualFeeMax !== undefined) {
      tempFiltered = tempFiltered.filter(
        (card: CreditCard) => card.annualFee <= filters.annualFeeMax!,
      );
    }

    if (filters.offerAmountMin !== undefined) {
      tempFiltered = tempFiltered.filter((card: CreditCard) => {
        if (card.offers.length === 0) return false;
        const bestOffer = card.offers[0];
        const offerAmount = bestOffer.amount[0]?.amount || 0;
        return offerAmount >= filters.offerAmountMin!;
      });
    }

    if (filters.isBusiness !== undefined) {
      tempFiltered = tempFiltered.filter(
        (card: CreditCard) => card.isBusiness === filters.isBusiness,
      );
    }

    if (filters.isAnnualFeeWaived !== undefined) {
      tempFiltered = tempFiltered.filter(
        (card: CreditCard) =>
          card.isAnnualFeeWaived === filters.isAnnualFeeWaived,
      );
    }

    setFilteredCards(tempFiltered);
  };

  const handleSortChange = (sort: SortOptions) => {
    const tempSorted = [...filteredCards];

    switch (sort.field) {
      case "offerAmount":
        tempSorted.sort((a: CreditCard, b: CreditCard) => {
          const aOffer = a.offers[0]?.amount[0]?.amount || 0;
          const bOffer = b.offers[0]?.amount[0]?.amount || 0;
          return sort.direction === "asc" ? aOffer - bOffer : bOffer - aOffer;
        });
        break;

      case "annualFee":
        tempSorted.sort((a: CreditCard, b: CreditCard) => {
          return sort.direction === "asc"
            ? a.annualFee - b.annualFee
            : b.annualFee - a.annualFee;
        });
        break;

      case "universalCashbackPercent":
        tempSorted.sort((a: CreditCard, b: CreditCard) => {
          return sort.direction === "asc"
            ? a.universalCashbackPercent - b.universalCashbackPercent
            : b.universalCashbackPercent - a.universalCashbackPercent;
        });
        break;

      default:
        break;
    }

    setFilteredCards(tempSorted);
  };

  return (
    <PageContainer className="py-8">
      <PageHeader
        title="Credit Card Offers"
        description="Compare bonus offers side by side and capture the value banks use to buy new customers."
      />

      <div className="mb-6 rounded-2xl border border-border/70 bg-card/80 p-4 shadow-sm">
        <CreditCardFilters
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          issuers={issuers}
          networks={networks}
          // Pass initial searchParam for issuer if needed by CreditCardFilters
          initialIssuer={urlIssuer || undefined}
        />
      </div>

      {isLoading ? (
        <LoadingCards
          count={8}
          columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        />
      ) : (
        <>
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredCards.length} of {creditCards.length} credit
              cards
            </p>
          </div>

          <CreditCardGrid
            cards={filteredCards}
            emptyMessage="No credit cards match your filters. Try adjusting your criteria."
          />
        </>
      )}
    </PageContainer>
  );
}
