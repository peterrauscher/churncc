
// Credit Card Types based on the API schema
export interface CreditCard {
  cardId: string;
  name: string;
  issuer: string;
  network: string;
  currency: string;
  countsTowards524?: boolean;
  details?: string;
  isBusiness: boolean;
  annualFee: number;
  isAnnualFeeWaived: boolean;
  universalCashbackPercent: number;
  url: string;
  imageUrl: string;
  credits: Credit[];
  offers: Offer[];
  historicalOffers: Offer[];
  discontinued: boolean;
}

export interface Credit {
  description: string;
  value: number;
  weight: number;
  currency: string;
}

export interface Offer {
  spend: number;
  amount: OfferAmount[];
  days: number;
  expiration?: string;
  isPublic?: boolean;
  credits: Credit[];
  details?: string;
  url?: string;
  referralUrl?: string;
}

export interface OfferAmount {
  amount: number;
  currency: string;
}

// Bank Account Types
export interface BankAccount {
  id: string;
  name: string;
  institution: string;
  type: 'CHECKING' | 'SAVINGS' | 'BROKERAGE' | 'HYBRID';
  offerAmount: number;
  requirements: string;
  directDepositRequired: boolean;
  directDepositAmount?: number;
  minimumBalance?: number;
  monthlyFee?: number;
  isMonthlyFeeWaivable: boolean;
  url: string;
  expirationDate?: string;
  description?: string;
}

// Filter Types
export interface FilterOptions {
  issuer?: string[];
  network?: string[];
  annualFeeMax?: number;
  offerAmountMin?: number;
  categories?: string[];
  isBusiness?: boolean;
  isAnnualFeeWaived?: boolean;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}
