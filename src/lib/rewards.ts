import { CreditCard, OfferAmount } from "@/types";

/**
 * Welcome offers arrive in two currencies: cash (USD) and loyalty points.
 * The API is inconsistent about where the currency is declared - only 11 of
 * 175 cards put it on `offer.amount[].currency`. The authoritative value is
 * `card.currency`, which is always present.
 */

/**
 * Conservative cents-per-point redemption values. Used to rank cash and points
 * offers against each other; a 200,000 point bonus is worth far less than a
 * $1,000 statement credit, so ranking on the raw number is misleading.
 */
const CENTS_PER_POINT: Record<string, number> = {
  AMERICAN: 1.0,
  AMERICAN_EXPRESS: 1.5,
  AEROPLAN: 0.8,
  ALASKA: 1.0,
  AVIANCA: 0.5,
  AVIOS: 0.8,
  BANK_OF_AMERICA: 1.0,
  BARCLAYS: 1.0,
  BEST_WESTERN: 0.5,
  BREEZE: 1.0,
  CAPITAL_ONE: 1.0,
  CARNIVAL: 1.0,
  CATHAY_PACIFIC: 0.8,
  CHASE: 1.0,
  CHOICE: 0.5,
  CITI: 1.0,
  DELTA: 1.0,
  EMIRATES: 0.6,
  FLYING_BLUE: 0.6,
  FRONTIER: 0.6,
  HAWAIIAN: 1.0,
  HILTON: 0.5,
  HYATT: 0.5,
  IHG: 0.4,
  JETBLUE: 1.4,
  KOREAN: 0.7,
  LATAM: 1.0,
  LUFTHANSA: 0.8,
  MARRIOTT: 0.7,
  PENFED: 1.0,
  SOUTHWEST: 1.0,
  SPIRIT: 0.25,
  UNITED: 1.0,
  US_BANK: 1.0,
  VIRGIN: 0.6,
  WELLS_FARGO: 1.0,
  WYNDHAM: 0.6,
};

const DEFAULT_CENTS_PER_POINT = 0.7;

/** Cash currency, as opposed to a loyalty points program. */
export function isCashCurrency(currency: string): boolean {
  return currency === "USD";
}

const LOWERCASE_WORDS: Record<string, true> = {
  of: true,
  and: true,
  the: true,
};

/** Human-readable loyalty program name, e.g. `AMERICAN_EXPRESS` -> "American Express". */
export function programLabel(currency: string): string {
  const words = currency.replaceAll("_", " ").toLowerCase().split(" ");
  return words
    .map((word, index) =>
      index > 0 && LOWERCASE_WORDS[word]
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

/** The offer's currency, preferring the explicit amount currency. */
export function resolveOfferCurrency(
  card: Pick<CreditCard, "currency">,
  amount: OfferAmount | undefined,
): string {
  return amount?.currency || card.currency || "USD";
}

/**
 * Best-effort USD value of a welcome bonus. Cash passes through; points are
 * converted at a conservative cents-per-point rate.
 */
export function rewardValueInUsd(amount: number, currency: string): number {
  if (isCashCurrency(currency)) {
    return amount;
  }
  return (
    (amount * (CENTS_PER_POINT[currency] ?? DEFAULT_CENTS_PER_POINT)) / 100
  );
}

/** USD value of a card's headline welcome offer. */
export function cardOfferValueInUsd(card: CreditCard): number {
  const offer = card.offers[0];
  if (!offer) return 0;
  return rewardValueInUsd(
    offer.amount[0]?.amount || 0,
    resolveOfferCurrency(card, offer.amount[0]),
  );
}

/**
 * Display string for a reward amount. Points are suffixed with `pts` rather
 * than rendered as dollars, which would be a 100x overstatement.
 */
export function formatRewardValue(amount: number, currency: string): string {
  if (isCashCurrency(currency)) {
    return `$${amount.toLocaleString()}`;
  }
  return `${amount.toLocaleString()} pts`;
}

/** Currency suffix used as a label next to a points figure. */
export function rewardUnitLabel(currency: string): string {
  return isCashCurrency(currency)
    ? "cash bonus"
    : `${programLabel(currency)} points`;
}
