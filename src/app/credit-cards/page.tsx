"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CreditCardGrid from "@/components/cards/CreditCardGrid";
import CreditCardFilters from "@/components/filters/CreditCardFilters";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingCards } from "@/components/shared/LoadingCards";
import { CreditCard, FilterOptions, SortOptions } from "@/types";
import { fetchCreditCards } from "@/services/api";
import { ShieldCheck } from "@phosphor-icons/react";

function CreditCardsPageContent() {
  const searchParams = useSearchParams();
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<CreditCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [issuers, setIssuers] = useState<string[]>([]);
  const [networks, setNetworks] = useState<string[]>([]);

  const urlIssuer = searchParams.get("issuer");
  const urlQuery = searchParams.get("q");
  const urlFee = searchParams.get("fee");
  const urlType = searchParams.get("type");

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
        ) as string[];
        setIssuers(uniqueIssuers);

        const uniqueNetworks = Array.from(
          new Set(activeCards.map((card: CreditCard) => card.network)),
        ) as string[];
        setNetworks(uniqueNetworks);

        // Filter by URL parameters if present
        if (urlIssuer) {
          initialDisplayCards = initialDisplayCards.filter(
            (card: CreditCard) => card.issuer === urlIssuer,
          );
        }

        if (urlFee === "0") {
          initialDisplayCards = initialDisplayCards.filter(
            (card: CreditCard) => card.annualFee === 0,
          );
        }

        if (urlType === "travel") {
          initialDisplayCards = initialDisplayCards.filter(
            (card: CreditCard) =>
              card.name.toLowerCase().includes("travel") ||
              card.name.toLowerCase().includes("sapphire") ||
              card.name.toLowerCase().includes("venture") ||
              card.name.toLowerCase().includes("platinum") ||
              card.details?.toLowerCase().includes("miles") ||
              card.details?.toLowerCase().includes("points"),
          );
        } else if (urlType === "cashback") {
          initialDisplayCards = initialDisplayCards.filter(
            (card: CreditCard) =>
              card.universalCashbackPercent > 1.5 ||
              card.name.toLowerCase().includes("cash") ||
              card.name.toLowerCase().includes("freedom") ||
              card.name.toLowerCase().includes("quicksilver"),
          );
        }

        if (urlQuery) {
          const q = urlQuery.toLowerCase();
          initialDisplayCards = initialDisplayCards.filter(
            (card: CreditCard) =>
              card.name.toLowerCase().includes(q) ||
              card.issuer.toLowerCase().includes(q) ||
              card.details?.toLowerCase().includes(q),
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
  }, [urlIssuer, urlQuery, urlFee, urlType]);

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
    <PageContainer className="py-8 md:py-12">
      <PageHeader
        eyebrow="Credit Cards"
        title="Compare Credit Card Bonus Offers"
        description="Side-by-side welcome bonuses, spend requirements, and fee comparisons ranked by real net payout."
        badge={
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            <ShieldCheck weight="bold" className="h-3.5 w-3.5" />
            <span>Editorial Independent</span>
          </span>
        }
      />

      {/* Filter Surface */}
      <div className="mb-10 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 md:p-6">
        <CreditCardFilters
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          issuers={issuers}
          networks={networks}
        />
      </div>

      {isLoading ? (
        <LoadingCards
          count={8}
          columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        />
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              Showing{" "}
              <span className="font-bold text-slate-900 dark:text-white">
                {filteredCards.length}
              </span>{" "}
              of {creditCards.length} cards
              {urlQuery && ` matching "${urlQuery}"`}
            </p>
          </div>

          <CreditCardGrid
            cards={filteredCards}
            emptyMessage="No credit cards match your current criteria. Try resetting filters."
          />
        </>
      )}
    </PageContainer>
  );
}

export default function CreditCardsPage() {
  return (
    <Suspense
      fallback={
        <PageContainer className="py-8 md:py-12">
          <LoadingCards
            count={8}
            columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          />
        </PageContainer>
      }
    >
      <CreditCardsPageContent />
    </Suspense>
  );
}
