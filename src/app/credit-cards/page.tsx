"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import CreditCardGrid from "@/components/cards/CreditCardGrid";
import CreditCardFilters from "@/components/filters/CreditCardFilters";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { PaginationControls } from "@/components/shared/PaginationControls";
import { LoadingCards } from "@/components/shared/LoadingCards";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, FilterOptions, SortOptions } from "@/types";
import { fetchCreditCards } from "@/services/api";
import {
  applyCreditCardFilters,
  CARD_CATEGORY_PRESETS,
} from "@/lib/card-categories";

function CreditCardsPageContent() {
  const searchParams = useSearchParams();
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<CreditCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [issuers, setIssuers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const urlIssuer = searchParams.get("issuer");
  const urlQuery = searchParams.get("q");
  const urlFee = searchParams.get("fee");
  const urlType = searchParams.get("type");
  const urlFilters: FilterOptions = useMemo(
    () => ({
      issuer: urlIssuer ? [urlIssuer] : undefined,
      annualFeeMax: urlFee === "0" ? 0 : undefined,
      categories:
        urlType &&
        (CARD_CATEGORY_PRESETS as readonly string[]).includes(urlType)
          ? [urlType]
          : undefined,
    }),
    [urlIssuer, urlFee, urlType],
  );

  useEffect(() => {
    const loadCreditCards = async () => {
      setIsLoading(true);
      try {
        const cardsData = await fetchCreditCards();

        const activeCards = cardsData.filter(
          (card: CreditCard) => !card.discontinued,
        );
        setCreditCards(activeCards);

        const uniqueIssuers = Array.from(
          new Set(activeCards.map((card: CreditCard) => card.issuer)),
        ) as string[];
        setIssuers(uniqueIssuers);

        let initialDisplayCards = applyCreditCardFilters(
          activeCards,
          urlFilters,
        );

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
        setCurrentPage(1);
      } catch (error) {
        console.error("Error loading credit cards:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCreditCards();
  }, [urlIssuer, urlQuery, urlFee, urlType, urlFilters]);

  const handleFilterChange = (filters: FilterOptions) => {
    setFilteredCards(applyCreditCardFilters(creditCards, filters));
    setCurrentPage(1);
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
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredCards.length / pageSize) || 1;
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedCards = filteredCards.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f4f6f8] py-8 md:py-12 dark:bg-slate-950">
      <PageContainer>
        <PageHeader
          title="Compare Credit Card Bonus Offers"
          description="Side-by-side welcome bonuses, spend requirements, and fee comparisons ranked by real net payout."
        />

        <CreditCardFilters
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          issuers={issuers}
          initialFilters={urlFilters}
        />

        {isLoading ? (
          <LoadingCards
            count={8}
            columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          />
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                Showing{" "}
                <span className="font-bold text-slate-900 dark:text-white">
                  {filteredCards.length === 0
                    ? 0
                    : (safeCurrentPage - 1) * pageSize + 1}
                  –{Math.min(safeCurrentPage * pageSize, filteredCards.length)}
                </span>{" "}
                of{" "}
                <span className="font-bold text-slate-900 dark:text-white">
                  {filteredCards.length}
                </span>{" "}
                cards
                {urlQuery && ` matching "${urlQuery}"`}
              </p>

              {/* Per page selector */}
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-500 dark:text-slate-400">
                  Per page:
                </span>
                <Select
                  value={String(pageSize)}
                  onValueChange={(val) => handlePageSizeChange(Number(val))}
                >
                  <SelectTrigger
                    aria-label="Select cards per page"
                    className="h-8 w-[76px] rounded-lg border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-700 shadow-2xs focus:ring-1 focus:ring-[#0160c4] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <SelectValue placeholder={String(pageSize)} />
                  </SelectTrigger>
                  <SelectContent className="min-w-[76px] rounded-xl border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                    {[25, 50, 100].map((size) => (
                      <SelectItem
                        key={size}
                        value={String(size)}
                        className="text-xs font-semibold"
                      >
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <CreditCardGrid
              cards={paginatedCards}
              emptyMessage="No credit cards match your current criteria. Try resetting filters."
            />

            {/* Bottom Pagination Controls */}
            {filteredCards.length > 0 && (
              <PaginationControls
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={filteredCards.length}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                itemLabel="cards"
                className="mt-8 border-t border-slate-200/80 pt-4 dark:border-slate-800"
              />
            )}
          </>
        )}
      </PageContainer>
    </div>
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
