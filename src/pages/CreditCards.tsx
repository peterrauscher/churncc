
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import CreditCardGrid from "@/components/cards/CreditCardGrid";
import CreditCardFilters from "@/components/filters/CreditCardFilters";
import { CreditCard, FilterOptions, SortOptions } from "@/types";
import { fetchCreditCards } from "@/services/api";

const CreditCards = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<CreditCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [issuers, setIssuers] = useState<string[]>([]);
  const [networks, setNetworks] = useState<string[]>([]);
  
  // Get URL params for initial filter state
  const urlIssuer = searchParams.get("issuer");

  useEffect(() => {
    const loadCreditCards = async () => {
      setIsLoading(true);
      try {
        const cards = await fetchCreditCards();
        
        // Filter out discontinued cards
        const activeCards = cards.filter(card => !card.discontinued);
        setCreditCards(activeCards);
        setFilteredCards(activeCards);
        
        // Extract unique issuers and networks for filters
        const uniqueIssuers = Array.from(
          new Set(activeCards.map(card => card.issuer))
        );
        setIssuers(uniqueIssuers);
        
        const uniqueNetworks = Array.from(
          new Set(activeCards.map(card => card.network))
        );
        setNetworks(uniqueNetworks);
        
        // Apply initial filter from URL if present
        if (urlIssuer) {
          const initialFiltered = activeCards.filter(
            card => card.issuer === urlIssuer
          );
          setFilteredCards(initialFiltered);
        }
      } catch (error) {
        console.error("Error loading credit cards:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCreditCards();
  }, [urlIssuer]);

  const handleFilterChange = (filters: FilterOptions) => {
    let filtered = [...creditCards];
    
    // Filter by issuer
    if (filters.issuer && filters.issuer.length > 0) {
      filtered = filtered.filter(card => 
        filters.issuer!.includes(card.issuer)
      );
    }
    
    // Filter by network
    if (filters.network && filters.network.length > 0) {
      filtered = filtered.filter(card => 
        filters.network!.includes(card.network)
      );
    }
    
    // Filter by annual fee
    if (filters.annualFeeMax !== undefined) {
      filtered = filtered.filter(card => 
        card.annualFee <= filters.annualFeeMax!
      );
    }
    
    // Filter by minimum offer amount
    if (filters.offerAmountMin !== undefined) {
      filtered = filtered.filter(card => {
        if (card.offers.length === 0) return false;
        const bestOffer = card.offers[0];
        const offerAmount = bestOffer.amount[0]?.amount || 0;
        return offerAmount >= filters.offerAmountMin!;
      });
    }
    
    // Filter by business cards
    if (filters.isBusiness !== undefined) {
      filtered = filtered.filter(card => 
        card.isBusiness === filters.isBusiness
      );
    }
    
    // Filter by annual fee waived
    if (filters.isAnnualFeeWaived !== undefined) {
      filtered = filtered.filter(card => 
        card.isAnnualFeeWaived === filters.isAnnualFeeWaived
      );
    }
    
    setFilteredCards(filtered);
  };

  const handleSortChange = (sort: SortOptions) => {
    const sorted = [...filteredCards];
    
    switch (sort.field) {
      case "offerAmount":
        sorted.sort((a, b) => {
          const aOffer = a.offers[0]?.amount[0]?.amount || 0;
          const bOffer = b.offers[0]?.amount[0]?.amount || 0;
          return sort.direction === "asc" ? aOffer - bOffer : bOffer - aOffer;
        });
        break;
        
      case "annualFee":
        sorted.sort((a, b) => {
          return sort.direction === "asc" 
            ? a.annualFee - b.annualFee 
            : b.annualFee - a.annualFee;
        });
        break;
        
      case "universalCashbackPercent":
        sorted.sort((a, b) => {
          return sort.direction === "asc" 
            ? a.universalCashbackPercent - b.universalCashbackPercent 
            : b.universalCashbackPercent - a.universalCashbackPercent;
        });
        break;
        
      default:
        break;
    }
    
    setFilteredCards(sorted);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl">Credit Card Offers</h1>
          <p className="mt-2 text-muted-foreground">
            Compare and find the best credit card bonuses available
          </p>
        </div>
        
        <div className="mb-6 rounded-lg border bg-background p-4 shadow-sm">
          <CreditCardFilters 
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            issuers={issuers}
            networks={networks}
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
                Showing {filteredCards.length} of {creditCards.length} credit cards
              </p>
            </div>
            
            <CreditCardGrid 
              cards={filteredCards} 
              emptyMessage="No credit cards match your filters. Try adjusting your criteria." 
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default CreditCards;
