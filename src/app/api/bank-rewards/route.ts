import { NextResponse } from 'next/server';
import type { BankAccount } from '@/types';

// This is the mock data, same as in the original services/api.ts
// In a real scenario, this GET handler would perform scraping or call an external API.
const MOCK_BANK_ACCOUNTS: BankAccount[] = [
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

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return NextResponse.json(MOCK_BANK_ACCOUNTS);
} 