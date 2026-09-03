"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CreditCardItem from "@/components/cards/CreditCardItem";
import BankAccountGrid from "@/components/cards/BankAccountGrid";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { LoadingCards } from "@/components/shared/LoadingCards";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { IslandLink } from "@/components/shared/IslandLink";
import { Reveal } from "@/components/shared/Reveal";
import { Bezel } from "@/components/shared/Bezel";
import { CalendarBlank, ChartLineUp, Info } from "@phosphor-icons/react";
import { CreditCard, BankAccount } from "@/types";
import { fetchCreditCards, getMockBankAccounts } from "@/services/api";
import { formatRewardValue } from "@/components/finance/CurrencyValue";
import { SearchBar } from "@/components/shared/SearchBar";

export default function HomePage() {
  const [allCards, setAllCards] = useState<CreditCard[]>([]);
  const [featuredCards, setFeaturedCards] = useState<CreditCard[]>([]);
  const [featuredAccounts, setFeaturedAccounts] = useState<BankAccount[]>([]);
  const [allAccounts, setAllAccounts] = useState<BankAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedItems = async () => {
      setIsLoading(true);
      try {
        const cards = await fetchCreditCards();
        const activeCards = cards.filter(
          (card) => !card.discontinued && card.offers.length > 0,
        );
        setAllCards(activeCards);

        const topCards = [...activeCards]
          .sort((a, b) => {
            const aOffer = a.offers[0]?.amount[0]?.amount || 0;
            const bOffer = b.offers[0]?.amount[0]?.amount || 0;
            return bOffer - aOffer;
          })
          .slice(0, 4);
        setFeaturedCards(topCards);

        const accounts = getMockBankAccounts();
        setAllAccounts(accounts);
        const topAccounts = [...accounts]
          .sort((a, b) => b.offerAmount - a.offerAmount)
          .slice(0, 3);
        setFeaturedAccounts(topAccounts);
      } catch (error) {
        console.error("Error loading featured items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedItems();
  }, []);

  const totalCardBonuses = allCards.reduce((sum, card) => {
    const best = card.offers.reduce((max, o) => {
      const amt = o.amount.reduce((s, a) => s + a.amount, 0);
      return amt > max ? amt : max;
    }, 0);
    return sum + best;
  }, 0);

  const totalBankBonuses = allAccounts.reduce(
    (sum, a) => sum + a.offerAmount,
    0,
  );

  const leadCard = featuredCards[0];
  const stackedCards = featuredCards.slice(1, 4);

  return (
    <>
      <section className="relative min-h-[100dvh] overflow-hidden px-4 py-8 md:px-8 md:py-16">
        <PageContainer className="px-0">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <p className="mb-6 inline-flex rounded-full px-3 py-1 text-[10px] font-medium tracking-[0.2em] uppercase ring-1 ring-foreground/10">
                Personal finance, inverted
              </p>
              <h1 className="font-serif max-w-4xl text-5xl leading-[0.95] tracking-tight md:text-7xl">
                Beat the banks at their own game.
              </h1>
              <p className="mt-6 max-w-[42rem] text-base leading-relaxed text-muted-foreground md:text-lg">
                Banks spend billions to acquire customers. Churnable shows you
                which credit card and bank bonuses put that money in your
                pocket.
              </p>
              <SearchBar />
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <IslandLink href="/credit-cards">
                  Compare card offers
                </IslandLink>
                <IslandLink href="/bank-accounts" variant="ghost">
                  Bank bonuses
                </IslandLink>
              </div>
            </div>

            <div className="md:col-span-5">
              <Bezel className="md:mt-8">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2rem-0.375rem)]">
                  <Image
                    src="/pexels-karola-g-6328949.jpg"
                    alt="Quiet workspace with notebooks and a coffee cup"
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </Bezel>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="px-4 py-24 md:px-8 md:py-32">
        <PageContainer className="px-0">
          <Reveal>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
              <Link href="/credit-cards" className="group md:col-span-7">
                <Bezel className="h-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1">
                  <div className="flex h-full min-h-[22rem] flex-col justify-between p-8 md:p-10">
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                        01 — Cards
                      </p>
                      <h2 className="font-serif mt-4 text-4xl tracking-tight md:text-5xl">
                        Credit card bonuses
                      </h2>
                      <p className="mt-4 max-w-md text-muted-foreground">
                        Welcome offers ranked by real payout, spend, and annual
                        fee — not issuer marketing.
                      </p>
                    </div>
                    <p className="font-serif text-5xl tabular-nums text-gold md:text-6xl">
                      {allCards.length || "—"}
                      <span className="ml-3 text-lg text-muted-foreground">
                        live offers
                      </span>
                    </p>
                  </div>
                </Bezel>
              </Link>

              <div className="grid grid-cols-1 gap-6 md:col-span-5">
                <Link href="/bank-accounts" className="group">
                  <Bezel className="h-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1">
                    <div className="p-7">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                        02 — Banks
                      </p>
                      <h3 className="font-serif mt-3 text-3xl tracking-tight">
                        Checking & savings
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Claim acquisition cash for accounts you already need.
                      </p>
                      <p className="font-serif mt-6 text-4xl tabular-nums text-gold">
                        {allAccounts.length || "—"}
                      </p>
                    </div>
                  </Bezel>
                </Link>
                <Link href="/credit-cards" className="group">
                  <Bezel className="h-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1">
                    <div className="p-7">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                        03 — Brokerage
                      </p>
                      <h3 className="font-serif mt-3 text-3xl tracking-tight">
                        Investment promos
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Transfer and funding bonuses sitting next to the cards.
                      </p>
                    </div>
                  </Bezel>
                </Link>
              </div>
            </div>
          </Reveal>
        </PageContainer>
      </section>

      {!isLoading && allCards.length > 0 && (
        <section className="px-4 py-8 md:px-8">
          <PageContainer className="px-0">
            <Reveal>
              <Bezel>
                <div className="grid grid-cols-1 gap-8 px-6 py-10 md:grid-cols-12 md:px-10 md:py-12">
                  <div className="md:col-span-5">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      On the table
                    </p>
                    <p className="font-serif mt-3 text-5xl tracking-tight text-gold md:text-6xl">
                      {formatRewardValue(
                        totalCardBonuses + totalBankBonuses,
                        "USD",
                      )}
                    </p>
                    <p className="mt-3 max-w-sm text-muted-foreground">
                      Combined bonus value across tracked cards and bank
                      accounts.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 md:col-span-7">
                    <div>
                      <p className="font-serif text-3xl tabular-nums">
                        {allCards.length}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Credit cards tracked
                      </p>
                    </div>
                    <div>
                      <p className="font-serif text-3xl tabular-nums">
                        {allAccounts.length}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Bank bonuses available
                      </p>
                    </div>
                  </div>
                </div>
              </Bezel>
            </Reveal>
          </PageContainer>
        </section>
      )}

      <section className="px-4 py-24 md:px-8 md:py-32">
        <PageContainer className="px-0">
          <SectionHeading
            eyebrow="Featured"
            title="Highest-upside card offers"
            description="Issuer incentives, ranked by welcome bonus — not by who paid for placement."
            action={
              <IslandLink href="/credit-cards" variant="ghost">
                View all cards
              </IslandLink>
            }
          />

          {isLoading ? (
            <LoadingCards count={4} columns="grid-cols-1 md:grid-cols-12" />
          ) : leadCard ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
              <Reveal className="md:col-span-7 md:row-span-2">
                <CreditCardItem card={leadCard} featured />
              </Reveal>
              <div className="grid grid-cols-1 gap-6 md:col-span-5">
                {stackedCards.map((card, index) => (
                  <Reveal key={card.cardId} delay={120 + index * 80}>
                    <CreditCardItem card={card} />
                  </Reveal>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">
              No featured credit cards available at the moment.
            </p>
          )}
        </PageContainer>
      </section>

      <section className="px-4 py-24 md:px-8 md:py-32">
        <PageContainer className="px-0">
          <SectionHeading
            eyebrow="Deposits"
            title="Top bank account bonuses"
            description="Checking and savings promos that pay you to park money you already move."
            action={
              <IslandLink href="/bank-accounts" variant="ghost">
                View all banks
              </IslandLink>
            }
          />

          {isLoading ? (
            <LoadingCards
              count={3}
              columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            />
          ) : (
            <Reveal>
              <BankAccountGrid
                accounts={featuredAccounts}
                emptyMessage="No featured bank accounts available at the moment."
              />
            </Reveal>
          )}
        </PageContainer>
      </section>

      <section className="px-4 py-24 md:px-8 md:py-32">
        <PageContainer className="px-0">
          <SectionHeading
            eyebrow="Field notes"
            title="Guides & strategies"
            description="How the offers actually work, and where people leave money on the table."
            action={
              <IslandLink href="/resources" variant="ghost">
                All guides
              </IslandLink>
            }
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <Reveal className="md:col-span-6">
              <Link href="/resources" className="block h-full">
                <ResourceCard
                  icon={Info}
                  title="Credit card bonus basics"
                  description="How welcome bonuses work, what to look for, and the mistakes that void an offer."
                />
              </Link>
            </Reveal>
            <Reveal className="md:col-span-6" delay={100}>
              <div className="grid grid-cols-1 gap-6">
                <Link href="/resources" className="block">
                  <ResourceCard
                    icon={ChartLineUp}
                    title="Maximizing point values"
                    description="Getting more than a penny on the dollar from miles and points."
                  />
                </Link>
                <Link href="/resources" className="block">
                  <ResourceCard
                    icon={CalendarBlank}
                    title="Timing your applications"
                    description="When to apply, how many cards to open, and managing velocity."
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </PageContainer>
      </section>

      <section className="px-4 py-24 md:px-8 md:pb-32">
        <PageContainer className="px-0">
          <Reveal>
            <Bezel>
              <div className="px-6 py-16 text-center md:px-16 md:py-24">
                <p className="mb-5 inline-flex rounded-full px-3 py-1 text-[10px] font-medium tracking-[0.2em] uppercase ring-1 ring-foreground/10">
                  Next step
                </p>
                <h2 className="font-serif mx-auto max-w-3xl text-4xl tracking-tight md:text-6xl">
                  Start taking money back from the banks
                </h2>
                <p className="mx-auto mt-5 max-w-[42rem] text-lg text-muted-foreground">
                  Browse verified offers, execute with the requirements in front
                  of you, and turn ordinary banking into a repeatable payout.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <IslandLink href="/credit-cards">
                    Win with credit cards
                  </IslandLink>
                  <IslandLink href="/bank-accounts" variant="ghost">
                    Win with bank bonuses
                  </IslandLink>
                </div>
              </div>
            </Bezel>
          </Reveal>
        </PageContainer>
      </section>
    </>
  );
}
