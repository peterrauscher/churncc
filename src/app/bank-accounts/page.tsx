"use client";

import { useState, useEffect } from "react";
import BankAccountGrid from "@/components/cards/BankAccountGrid";
import BankAccountFilters from "@/components/filters/BankAccountFilters";
import { BankAccount } from "@/types"; // Assuming BankAccount type is defined in @/types
import { getMockBankAccounts } from "@/services/api";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingCards } from "@/components/shared/LoadingCards";

// Define a more specific type for filter options based on usage
interface BankAccountFilterState {
  institutions?: string[];
  accountTypes?: string[]; // Assuming account types are strings e.g., ['checking', 'savings']
  minBonus?: number;
  noMonthlyFee?: boolean;
  directDepositRequired?: boolean;
}

// Define a type for sort options
interface BankAccountSortState {
  field: keyof Pick<BankAccount, "offerAmount" | "monthlyFee"> | string; // Allow known sortable fields or any string
  direction: "asc" | "desc";
}

export default function BankAccountsPage() {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<BankAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [institutions, setInstitutions] = useState<string[]>([]);

  useEffect(() => {
    const loadBankAccounts = async () => {
      setIsLoading(true);
      try {
        const accountsData = getMockBankAccounts();
        setBankAccounts(accountsData);
        setFilteredAccounts(accountsData);

        const uniqueInstitutions = Array.from(
          new Set(
            accountsData.map((account: BankAccount) => account.institution),
          ),
        ) as string[];
        setInstitutions(uniqueInstitutions);
      } catch (error) {
        console.error("Error loading bank accounts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBankAccounts();
  }, []);

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
        // Optionally log if an unexpected sort field is encountered
        // console.warn(`Unsupported sort field: ${sort.field}`);
        break;
    }

    setFilteredAccounts(tempSorted);
  };

  return (
    <PageContainer className="py-8">
      <PageHeader
        title="Bank Account Bonuses"
        description="Find checking and savings promotions with clear requirements, fees, and timelines."
      />

      <div className="mb-6 rounded-2xl border border-border/70 bg-card/80 p-4 shadow-sm">
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
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredAccounts.length} of {bankAccounts.length} bank
              accounts
            </p>
          </div>

          <BankAccountGrid
            accounts={filteredAccounts}
            emptyMessage="No bank accounts match your filters. Try adjusting your criteria."
          />
        </>
      )}
    </PageContainer>
  );
}
