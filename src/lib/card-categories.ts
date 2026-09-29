import { CreditCard, FilterOptions } from "@/types";
import { cardOfferValueInUsd } from "@/lib/rewards";

export const CARD_CATEGORY_PRESETS = ["rewards", "travel", "cashback"] as const;

export type CardCategoryPreset = (typeof CARD_CATEGORY_PRESETS)[number];

export function cardMatchesCategory(
  card: CreditCard,
  category: string,
): boolean {
  const blob =
    `${card.name} ${card.details ?? ""} ${(card.rewardMultipliers ?? []).map((item) => item.category).join(" ")}`.toLowerCase();

  if (category === "travel") {
    return /travel|miles|airline|hotel|flight|sapphire|venture|platinum|ink|aeroplan|skymiles|hilton|marriott|hyatt/.test(
      blob,
    );
  }

  if (category === "cashback") {
    return (
      card.universalCashbackPercent > 1.5 ||
      /cash|freedom|quicksilver|blue cash|cash back/.test(blob)
    );
  }
  if (category === "rewards") {
    return (
      (card.rewardMultipliers ?? []).length > 0 || /points|rewards/.test(blob)
    );
  }

  return true;
}

export function cardMatchesCategories(
  card: CreditCard,
  categories?: string[],
): boolean {
  if (!categories?.length) return true;
  return categories.some((category) => cardMatchesCategory(card, category));
}

export function applyCreditCardFilters(
  cards: CreditCard[],
  filters: FilterOptions,
): CreditCard[] {
  return cards.filter((card) => {
    if (filters.issuer?.length && !filters.issuer.includes(card.issuer)) {
      return false;
    }
    if (
      filters.annualFeeMax !== undefined &&
      card.annualFee > filters.annualFeeMax
    ) {
      return false;
    }
    if (filters.offerAmountMin !== undefined) {
      if (
        card.offers.length === 0 ||
        cardOfferValueInUsd(card) < filters.offerAmountMin
      ) {
        return false;
      }
    }
    if (
      filters.isBusiness !== undefined &&
      card.isBusiness !== filters.isBusiness
    ) {
      return false;
    }
    if (
      filters.isAnnualFeeWaived !== undefined &&
      card.isAnnualFeeWaived !== filters.isAnnualFeeWaived
    ) {
      return false;
    }
    return cardMatchesCategories(card, filters.categories);
  });
}
