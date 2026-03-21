"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreditCardGrid from "@/components/cards/CreditCardGrid";
import BankAccountGrid from "@/components/cards/BankAccountGrid";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { LoadingCards } from "@/components/shared/LoadingCards";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { ArrowRight, TrendingUp, Info, Calendar, BookOpen } from "lucide-react";
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

  const topTableAccounts = [...allAccounts]
    .sort((a, b) => b.offerAmount - a.offerAmount)
    .slice(0, 5);

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

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/70 text-primary-foreground">
        <img
          src="/pexels-karola-g-6328949.jpg"
          alt=""
          className="absolute top-0 right-0 h-full w-[60%] object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--primary)_0%,var(--primary)_25%,transparent_80%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_38%)]" />
        <PageContainer className="relative pt-16 pb-20 md:pt-24 md:pb-28">
          <h1 className="max-w-4xl font-serif font-bold text-4xl leading-tight tracking-tight md:text-5xl">
            Beat the banks at their
            <br />
            own game with{" "}
            <span className="relative inline-flex items-center rounded-md bg-white px-2.5 py-0.5 text-secondary shadow-sm ring-1 ring-secondary/30">
              Churnable
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-base text-primary-foreground/85 md:text-lg">
            Banks spend billions to acquire customers. We help you claim that
            money back through credit card and bank account bonuses.
          </p>

          <SearchBar />
        </PageContainer>
      </section>

      <div className="relative z-10 mx-auto -mt-8 mb-12 w-[70%] rounded-2xl bg-white p-4 shadow-xl md:mb-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            href="/credit-cards"
            className="group rounded-xl p-5 text-center transition-colors hover:bg-muted/50"
          >
            <img src="/cards.svg" alt="" className="mx-auto mb-3 h-10 w-10" />
            <h3 className="font-semibold text-foreground">Credit Cards</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse {allCards.length}+ card bonuses
            </p>
          </Link>
          <Link
            href="/bank-accounts"
            className="group rounded-xl p-5 text-center transition-colors hover:bg-muted/50"
          >
            <img src="/banks.svg" alt="" className="mx-auto mb-3 h-10 w-10" />
            <h3 className="font-semibold text-foreground">Bank Accounts</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Claim checking &amp; savings bonuses
            </p>
          </Link>
          <Link
            href="/credit-cards"
            className="group rounded-xl p-5 text-center transition-colors hover:bg-muted/50"
          >
            <img
              src="/brokerages.svg"
              alt=""
              className="mx-auto mb-3 h-10 w-10"
            />
            <h3 className="font-semibold text-foreground">Brokerage</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Investment account promotions
            </p>
          </Link>
        </div>
      </div>

      {!isLoading && allCards.length > 0 && (
        <div className="bg-muted/50 py-12 md:py-16">
          <PageContainer>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
                  {allCards.length}
                </p>
                <p className="text-muted-foreground text-xs md:text-sm">
                  Credit cards tracked
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl font-semibold text-secondary md:text-3xl">
                  {formatRewardValue(
                    totalCardBonuses + totalBankBonuses,
                    "USD",
                  )}
                </p>
                <p className="text-muted-foreground text-xs md:text-sm">
                  Total bonus value available
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
                  {allAccounts.length}
                </p>
                <p className="text-muted-foreground text-xs md:text-sm">
                  Bank bonuses available
                </p>
              </div>
            </div>
          </PageContainer>
        </div>
      )}

      {!isLoading && topTableAccounts.length > 0 && (
        <section className="py-12 md:py-16">
          <PageContainer>
            <SectionHeading
              title="Top Bank Account Bonuses"
              description="Best available checking and savings promos right now."
              action={
                <Button asChild variant="outline" size="sm">
                  <Link href="/bank-accounts">
                    View all <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              }
            />
            <div className="rounded-xl border border-border/70 bg-card/95 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account</TableHead>
                    <TableHead>Bonus</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Requirement
                    </TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topTableAccounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell>
                        <div className="font-medium">{account.name}</div>
                        <span className="text-muted-foreground text-xs">
                          {account.institution}
                        </span>
                      </TableCell>
                      <TableCell className="font-semibold text-secondary">
                        {formatRewardValue(account.offerAmount, "USD")}
                      </TableCell>
                      <TableCell className="hidden max-w-[200px] truncate text-muted-foreground sm:table-cell">
                        {account.requirements}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild size="sm" variant="ghost">
                          <Link href={`/bank-accounts/${account.id}`}>
                            View
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PageContainer>
        </section>
      )}

      <section className="py-12 md:py-16">
        <PageContainer>
          <SectionHeading
            title="Featured Credit Card Offers"
            description="High-upside card offers designed to put issuer incentives in your pocket."
            action={
              <Button asChild variant="outline">
                <Link href="/credit-cards">
                  View all <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            }
          />

          {isLoading ? (
            <LoadingCards
              count={4}
              columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            />
          ) : (
            <CreditCardGrid
              cards={featuredCards}
              emptyMessage="No featured credit cards available at the moment."
            />
          )}
        </PageContainer>
      </section>

      <section className="border-y border-border/60 bg-card/60 py-12 md:py-16">
        <PageContainer>
          <SectionHeading
            title="Top Bank Account Bonuses"
            description="Best available checking and savings promos to keep you in control, not the banks."
            action={
              <Button asChild variant="outline">
                <Link href="/bank-accounts">
                  View all <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            }
          />

          {isLoading ? (
            <LoadingCards
              count={3}
              columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            />
          ) : (
            <BankAccountGrid
              accounts={featuredAccounts}
              emptyMessage="No featured bank accounts available at the moment."
            />
          )}
        </PageContainer>
      </section>

      <section className="py-12 md:py-16">
        <PageContainer>
          <SectionHeading
            title="Guides & Strategies"
            description="Learn the basics and sharpen your approach."
            action={
              <Button asChild variant="outline">
                <Link href="/resources">
                  View all <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            }
          />
          <div className="grid gap-6 md:grid-cols-3">
            <Link href="/resources" className="block">
              <ResourceCard
                icon={Info}
                title="Credit Card Bonus Basics"
                description="How welcome bonuses work, what to look for, and common mistakes to avoid."
              />
            </Link>
            <Link href="/resources" className="block">
              <ResourceCard
                icon={TrendingUp}
                title="Maximizing Point Values"
                description="Strategies for getting the most value from your earned points and miles."
              />
            </Link>
            <Link href="/resources" className="block">
              <ResourceCard
                icon={Calendar}
                title="Timing Your Applications"
                description="When to apply, how many cards to open, and managing your velocity."
              />
            </Link>
          </div>
        </PageContainer>
      </section>

      <section className="py-12 md:py-16">
        <PageContainer>
          <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-card via-card to-accent/45 p-8 text-center shadow-sm md:p-12">
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">
              Start Taking Money Back From The Banks
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
              Browse verified offers, execute with confidence, and turn your
              normal financial activity into a repeatable win.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/credit-cards">Win With Credit Cards</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/bank-accounts">Win With Bank Bonuses</Link>
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
