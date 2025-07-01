import { CreditCard, BankAccount } from "../types";

// API endpoint for credit card bonuses
const CREDIT_CARD_API_URL =
  "https://raw.githubusercontent.com/andenacitelli/credit-card-bonuses-api/main/exports/data.json";
const BANK_REWARDS_PROXY_URL = "/api/bank-rewards"; // Will implement proxy API route to handle scraping

// Fetch all credit card data
export const fetchCreditCards = async (): Promise<CreditCard[]> => {
  try {
    const response = await fetch(CREDIT_CARD_API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch credit cards: ${response.status}`);
    }
    const data = await response.json();

    // Add affiliate links (placeholder - you'll replace with your actual links)
    return data.map((card: CreditCard) => ({
      ...card,
      url: card.url, // Replace with your affiliate link in production
      imageUrl: card.imageUrl.startsWith("http")
        ? card.imageUrl
        : `https://offeroptimist.com${card.imageUrl}`,
    }));
  } catch (error) {
    console.error("Error fetching credit card data:", error);
    return [];
  }
};

// Fetch all bank account data
export const fetchBankAccounts = async (): Promise<BankAccount[]> => {
  try {
    // In production, this would call your API route that handles the scraping
    const response = await fetch(BANK_REWARDS_PROXY_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch bank accounts: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching bank account data:", error);
    return [];
  }
};

// Mock bank data for initial development (until the scraper is implemented)
export const getMockBankAccounts = (): BankAccount[] => {
  return [
    {
      id: "chase-total-checking",
      name: "Total Checking",
      institution: "Chase",
      type: "CHECKING",
      offerAmount: 300,
      requirements: "Direct deposit required within 90 days",
      directDepositRequired: true,
      directDepositAmount: 500,
      monthlyFee: 12,
      isMonthlyFeeWaivable: true,
      url: "https://www.chase.com/your-affiliate-link-here",
      expirationDate: "2024-12-31",
    },
    {
      id: "citi-priority-account",
      name: "Citi Priority Account",
      institution: "Citibank",
      type: "CHECKING",
      offerAmount: 700,
      requirements: "Deposit $50,000 within 30 days and maintain for 60 days",
      directDepositRequired: false,
      minimumBalance: 50000,
      monthlyFee: 30,
      isMonthlyFeeWaivable: true,
      url: "https://www.citibank.com/your-affiliate-link-here",
    },
    {
      id: "sofi-checking-savings",
      name: "SoFi Checking and Savings",
      institution: "SoFi",
      type: "HYBRID",
      offerAmount: 300,
      requirements: "Direct deposit of $5,000+ within 25 days",
      directDepositRequired: true,
      directDepositAmount: 5000,
      monthlyFee: 0,
      isMonthlyFeeWaivable: true,
      url: "https://www.sofi.com/your-affiliate-link-here",
    },
    {
      id: "capital-one-360",
      name: "360 Checking",
      institution: "Capital One",
      type: "CHECKING",
      offerAmount: 250,
      requirements: "Two direct deposits of $250+ within 75 days",
      directDepositRequired: true,
      directDepositAmount: 250,
      monthlyFee: 0,
      isMonthlyFeeWaivable: true,
      url: "https://www.capitalone.com/your-affiliate-link-here",
    },
    {
      id: "discover-savings",
      name: "Online Savings Account",
      institution: "Discover",
      type: "SAVINGS",
      offerAmount: 200,
      requirements: "Deposit $25,000 within 30 days",
      directDepositRequired: false,
      minimumBalance: 25000,
      monthlyFee: 0,
      isMonthlyFeeWaivable: true,
      url: "https://www.discover.com/your-affiliate-link-here",
    },
    {
      id: "wells-fargo-everyday",
      name: "Everyday Checking",
      institution: "Wells Fargo",
      type: "CHECKING",
      offerAmount: 300,
      requirements: "Direct deposit of $1,000+ within 90 days",
      directDepositRequired: true,
      directDepositAmount: 1000,
      monthlyFee: 10,
      isMonthlyFeeWaivable: true,
      url: "https://www.wellsfargo.com/your-affiliate-link-here",
    },
  ];
};

// Fetch a specific credit card by ID
export const fetchCreditCardById = async (
  cardId: string,
): Promise<CreditCard | null> => {
  try {
    const cards = await fetchCreditCards();
    return cards.find((card) => card.cardId === cardId) || null;
  } catch (error) {
    console.error(`Error fetching credit card with ID ${cardId}:`, error);
    return null;
  }
};

// Fetch a specific bank account by ID
export const fetchBankAccountById = async (
  accountId: string,
): Promise<BankAccount | null> => {
  try {
    // In production, this would be fetched from your API
    const accounts = getMockBankAccounts();
    return accounts.find((account) => account.id === accountId) || null;
  } catch (error) {
    console.error(`Error fetching bank account with ID ${accountId}:`, error);
    return null;
  }
};
