"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BankAccountGrid from "@/components/cards/BankAccountGrid";
import BankAccountFilters from "@/components/filters/BankAccountFilters";
import { BankAccount } from "@/types";
import { getMockBankAccounts } from "@/services/api";
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

interface BankAccountFilterState {
  institutions?: string[];
  accountTypes?: string[];
  minBonus?: number;
  noMonthlyFee?: boolean;
  directDepositRequired?: boolean;
}

interface BankAccountSortState {
  field: keyof Pick<BankAccount, "offerAmount" | "monthlyFee"> | string;
  direction: "asc" | "desc";
}

function BankAccountsPageContent() {
  const searchParams = useSearchParams();
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<BankAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [institutions, setInstitutions] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const urlType = searchParams.get("type");
  const urlFee = searchParams.get("fee");
  const urlQuery = searchParams.get("q");

  useEffect(() => {
    const loadBankAccounts = async () => {
      setIsLoading(true);
      try {
        const accountsData = getMockBankAccounts();
        setBankAccounts(accountsData);
        let initialDisplay = [...accountsData];
        setCurrentPage(1);

        const uniqueInstitutions = Array.from(
          new Set(
            accountsData.map((account: BankAccount) => account.institution),
          ),
        ) as string[];
        setInstitutions(uniqueInstitutions);

        if (urlType) {
          const upperType = urlType.toUpperCase();
          initialDisplay = initialDisplay.filter(
            (a: BankAccount) => a.type.toUpperCase() === upperType,
          );
        }

        if (urlFee === "0") {
          initialDisplay = initialDisplay.filter(
            (a: BankAccount) => !a.monthlyFee || a.monthlyFee === 0,
          );
        }

        if (urlQuery) {
          const q = urlQuery.toLowerCase();
          initialDisplay = initialDisplay.filter(
            (a: BankAccount) =>
              a.name.toLowerCase().includes(q) ||
              a.institution.toLowerCase().includes(q) ||
              a.requirements.toLowerCase().includes(q),
          );
        }

        setFilteredAccounts(initialDisplay);
      } catch (error) {
        console.error("Error loading bank accounts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBankAccounts();
  }, [urlType, urlFee, urlQuery]);

  const handleFilterChange = (filters: BankAccountFilterState) => {
    let tempFiltered = [...bankAccounts];

    if (filters.institutions && filters.institutions.length > 0) {
      tempFiltered = tempFiltered.filter((account: BankAccount) =>
        filters.institutions!.includes(account.institution),
      );
    }

    if (filters.accountTypes && filters.accountTypes.length > 0) {
      tempFiltered = tempFiltered.filter((account: BankAccount) =>
        filters.accountTypes!.includes(account.type),
      );
    }

    if (filters.minBonus !== undefined) {
      tempFiltered = tempFiltered.filter(
        (account: BankAccount) => account.offerAmount >= filters.minBonus!,
      );
    }

    if (filters.noMonthlyFee) {
      tempFiltered = tempFiltered.filter(
        (account: BankAccount) =>
          account.monthlyFee === 0 || account.monthlyFee === undefined,
      );
    }

    if (filters.directDepositRequired !== undefined) {
      tempFiltered = tempFiltered.filter(
        (account: BankAccount) =>
          account.directDepositRequired === filters.directDepositRequired,
      );
    }

    setFilteredAccounts(tempFiltered);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: BankAccountSortState) => {
    const tempSorted = [...filteredAccounts];

    switch (sort.field) {
      case "offerAmount":
        tempSorted.sort((a: BankAccount, b: BankAccount) => {
          return sort.direction === "asc"
            ? a.offerAmount - b.offerAmount
            : b.offerAmount - a.offerAmount;
        });
        break;

      case "monthlyFee":
        tempSorted.sort((a: BankAccount, b: BankAccount) => {
          const aFee = a.monthlyFee || 0;
          const bFee = b.monthlyFee || 0;
          return sort.direction === "asc" ? aFee - bFee : bFee - aFee;
        });
        break;

      default:
        break;
    }

    setFilteredAccounts(tempSorted);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredAccounts.length / pageSize) || 1;
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedAccounts = filteredAccounts.slice(
    startIndex,
    startIndex + pageSize,
  );

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
          title="Compare Bank Account Bonuses"
          description="Find checking and savings promotions that pay you cash for moving your everyday deposits."
        />

        <BankAccountFilters
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          institutions={institutions}
        />

        {isLoading ? (
          <LoadingCards
            count={6}
            columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          />
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                Showing{" "}
                <span className="font-bold text-slate-900 dark:text-white">
                  {filteredAccounts.length === 0
                    ? 0
                    : (safeCurrentPage - 1) * pageSize + 1}
                  –
                  {Math.min(
                    safeCurrentPage * pageSize,
                    filteredAccounts.length,
                  )}
                </span>{" "}
                of{" "}
                <span className="font-bold text-slate-900 dark:text-white">
                  {filteredAccounts.length}
                </span>{" "}
                accounts
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
                    aria-label="Select accounts per page"
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

            <BankAccountGrid
              accounts={paginatedAccounts}
              emptyMessage="No bank accounts match your current criteria. Try resetting filters."
            />

            {/* Bottom Pagination Controls */}
            {filteredAccounts.length > 0 && (
              <PaginationControls
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={filteredAccounts.length}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                itemLabel="accounts"
                className="mt-8 border-t border-slate-200/80 pt-4 dark:border-slate-800"
              />
            )}
          </>
        )}
      </PageContainer>
    </div>
  );
}

export default function BankAccountsPage() {
  return (
    <Suspense
      fallback={
        <PageContainer className="py-8 md:py-12">
          <LoadingCards
            count={6}
            columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          />
        </PageContainer>
      }
    >
      <BankAccountsPageContent />
    </Suspense>
  );
}
