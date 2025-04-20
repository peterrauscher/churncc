
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import BankAccountGrid from "@/components/cards/BankAccountGrid";
import BankAccountFilters from "@/components/filters/BankAccountFilters";
import { BankAccount } from "@/types";
import { getMockBankAccounts } from "@/services/api";

const BankAccounts = () => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<BankAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [institutions, setInstitutions] = useState<string[]>([]);
  
  useEffect(() => {
    const loadBankAccounts = async () => {
      setIsLoading(true);
      try {
        // In production, you would fetch from your API endpoint that scrapes bankrewards.io
        // For now, we'll use the mock data
        const accounts = getMockBankAccounts();
        setBankAccounts(accounts);
        setFilteredAccounts(accounts);
        
        // Extract unique institutions for filters
        const uniqueInstitutions = Array.from(
          new Set(accounts.map(account => account.institution))
        );
        setInstitutions(uniqueInstitutions);
      } catch (error) {
        console.error("Error loading bank accounts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBankAccounts();
  }, []);

  const handleFilterChange = (filters: any) => {
    let filtered = [...bankAccounts];
    
    // Filter by institutions
    if (filters.institutions && filters.institutions.length > 0) {
      filtered = filtered.filter(account => 
        filters.institutions.includes(account.institution)
      );
    }
    
    // Filter by account types
    if (filters.accountTypes && filters.accountTypes.length > 0) {
      filtered = filtered.filter(account => 
        filters.accountTypes.includes(account.type)
      );
    }
    
    // Filter by minimum bonus amount
    if (filters.minBonus !== undefined) {
      filtered = filtered.filter(account => 
        account.offerAmount >= filters.minBonus
      );
    }
    
    // Filter by no monthly fee
    if (filters.noMonthlyFee) {
      filtered = filtered.filter(account => 
        account.monthlyFee === 0 || account.monthlyFee === undefined
      );
    }
    
    // Filter by direct deposit required
    if (filters.directDepositRequired !== undefined) {
      filtered = filtered.filter(account => 
        account.directDepositRequired === filters.directDepositRequired
      );
    }
    
    setFilteredAccounts(filtered);
  };

  const handleSortChange = (sort: { field: string; direction: 'asc' | 'desc' }) => {
    const sorted = [...filteredAccounts];
    
    switch (sort.field) {
      case "offerAmount":
        sorted.sort((a, b) => {
          return sort.direction === "asc" 
            ? a.offerAmount - b.offerAmount 
            : b.offerAmount - a.offerAmount;
        });
        break;
        
      case "monthlyFee":
        sorted.sort((a, b) => {
          const aFee = a.monthlyFee || 0;
          const bFee = b.monthlyFee || 0;
          return sort.direction === "asc" 
            ? aFee - bFee 
            : bFee - aFee;
        });
        break;
        
      default:
        break;
    }
    
    setFilteredAccounts(sorted);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl">Bank Account Bonuses</h1>
          <p className="mt-2 text-muted-foreground">
            Find the best bank account promotions and sign-up bonuses
          </p>
        </div>
        
        <div className="mb-6 rounded-lg border bg-background p-4 shadow-sm">
          <BankAccountFilters 
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            institutions={institutions}
          />
        </div>
        
        {isLoading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-fintech-purple border-t-transparent" />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredAccounts.length} of {bankAccounts.length} bank accounts
              </p>
            </div>
            
            <BankAccountGrid 
              accounts={filteredAccounts} 
              emptyMessage="No bank accounts match your filters. Try adjusting your criteria." 
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default BankAccounts;
