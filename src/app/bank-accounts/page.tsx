"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BankAccountGrid from "@/components/cards/BankAccountGrid";
import BankAccountFilters from "@/components/filters/BankAccountFilters";
import { BankAccount } from "@/types";
import { getMockBankAccounts } from "@/services/api";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingCards } from "@/components/shared/LoadingCards";
import { ShieldCheck } from "@phosphor-icons/react";

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
  };

  return (
    <PageContainer className="py-8 md:py-12">
      <PageHeader
        eyebrow="Banking"
        title="Compare Bank Account Bonuses"
        description="Find checking and savings promotions that pay you cash for moving your everyday deposits."
        badge={
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            <ShieldCheck weight="bold" className="h-3.5 w-3.5" />
            <span>FDIC / NCUA Insured Products</span>
          </span>
        }
      />

      {/* Filter Surface */}
      <div className="mb-10 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 md:p-6">
        <BankAccountFilters
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          institutions={institutions}
        />
      </div>

      {isLoading ? (
        <LoadingCards
          count={6}
          columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        />
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              Showing{" "}
              <span className="font-bold text-slate-900 dark:text-white">
                {filteredAccounts.length}
              </span>{" "}
              of {bankAccounts.length} accounts
            </p>
          </div>

          <BankAccountGrid
            accounts={filteredAccounts}
            emptyMessage="No bank accounts match your current criteria. Try resetting filters."
          />
        </>
      )}
    </PageContainer>
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
