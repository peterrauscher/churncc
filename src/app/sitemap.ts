import { MetadataRoute } from "next";
import { fetchCreditCards, getMockBankAccounts } from "@/services/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://churn.cc";
  const now = new Date();

  // Core static marketing and tool pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/credit-cards`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bank-accounts`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-we-are-paid`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-use`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic credit card offer routes
  let cardRoutes: MetadataRoute.Sitemap = [];
  try {
    const cards = await fetchCreditCards();
    cardRoutes = cards
      .filter((card) => !card.discontinued && card.offers.length > 0)
      .map((card) => ({
        url: `${baseUrl}/credit-cards/${card.cardId}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      }));
  } catch (error) {
    console.error("Error generating sitemap card routes:", error);
  }

  // Dynamic bank account promo routes
  let accountRoutes: MetadataRoute.Sitemap = [];
  try {
    const accounts = getMockBankAccounts();
    accountRoutes = accounts.map((account) => ({
      url: `${baseUrl}/bank-accounts/${account.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error generating sitemap account routes:", error);
  }

  return [...staticRoutes, ...cardRoutes, ...accountRoutes];
}
