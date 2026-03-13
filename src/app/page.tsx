"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CreditCardGrid from "@/components/cards/CreditCardGrid";
import BankAccountGrid from "@/components/cards/BankAccountGrid";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { LoadingCards } from "@/components/shared/LoadingCards";
import {
  CreditCard as CreditCardIcon,
  BanknoteIcon,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { CreditCard, BankAccount } from "@/types";
import { fetchCreditCards, getMockBankAccounts } from "@/services/api";

export default function HomePage() {
  const [featuredCards, setFeaturedCards] = useState<CreditCard[]>([]);
  const [featuredAccounts, setFeaturedAccounts] = useState<BankAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedItems = async () => {
      setIsLoading(true);
      try {
        const cards = await fetchCreditCards();
        const topCards = [...cards]
          .filter((card) => !card.discontinued && card.offers.length > 0)
          .sort((a, b) => {
            const aOffer = a.offers[0]?.amount[0]?.amount || 0;
            const bOffer = b.offers[0]?.amount[0]?.amount || 0;
            return bOffer - aOffer;
          })
          .slice(0, 4);
        setFeaturedCards(topCards);

        const accounts = getMockBankAccounts();
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

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/70 bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_38%),radial-gradient(circle_at_15%_80%,rgba(255,255,255,0.16),transparent_35%)]" />
        <PageContainer className="relative py-20 md:py-28">
          <Badge className="mb-8 border border-white/30 bg-white/15 text-primary-foreground backdrop-blur-sm">
            <TrendingUp className="mr-2 h-4 w-4" />
            Average advanced user earns $2,500+ in annual bonuses
          </Badge>

          <h1 className="max-w-4xl font-serif text-5xl leading-tight tracking-tight md:text-7xl">
            Build Wealth From Bonuses, Not Guesswork.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/85 md:text-xl">
            Compare credit card and bank account promotions with a clean,
            research-first workflow used by serious churners.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90"
            >
              <Link href="/credit-cards">
                <CreditCardIcon className="mr-2 h-5 w-5" />
                Compare Card Offers
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/10 text-primary-foreground hover:bg-white/20"
            >
              <Link href="/bank-accounts">
                <BanknoteIcon className="mr-2 h-5 w-5" />
                Explore Bank Bonuses
              </Link>
            </Button>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Trustworthy comparisons",
                copy: "Issuer, spend requirement, and fee data in one view.",
                icon: ShieldCheck,
              },
              {
                title: "Fast bonus discovery",
                copy: "Sort by value, fees, and direct deposit requirements.",
                icon: TrendingUp,
              },
              {
                title: "Action-ready details",
                copy: "See what to do next with clear requirement breakdowns.",
                icon: ArrowRight,
              },
            ].map(({ title, copy, icon: Icon }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/25 bg-white/10 p-5 backdrop-blur-sm"
              >
                <Icon className="mb-3 h-5 w-5" />
                <h2 className="font-serif text-2xl">{title}</h2>
                <p className="mt-2 text-sm text-primary-foreground/85">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-14 md:py-18">
        <PageContainer>
          <SectionHeading
            title="Featured Credit Card Offers"
            description="Curated bonus opportunities with strong value and straightforward requirements."
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

      <section className="border-y border-border/60 bg-card/60 py-14 md:py-18">
        <PageContainer>
          <SectionHeading
            title="Top Bank Account Bonuses"
            description="Best current checking and savings account promotions for cash-focused churners."
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

      <section className="py-14 md:py-18">
        <PageContainer>
          <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-card via-card to-accent/45 p-8 text-center shadow-sm md:p-12">
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">
              Start Building Your Bonus Stack
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
              Browse verified opportunities, compare terms side by side, and
              make decisions with confidence.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/credit-cards">Find Credit Card Offers</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/bank-accounts">Find Bank Bonuses</Link>
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
