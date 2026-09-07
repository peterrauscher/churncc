"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CreditCard,
  Bank,
  Info,
  ChartLineUp,
  CalendarBlank,
  BookOpen,
} from "@phosphor-icons/react";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { ResourceCard } from "@/components/resources/ResourceCard";

const Resources = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f4f6f8] py-8 md:py-12 dark:bg-slate-950">
      <PageContainer>
        <PageHeader
          eyebrow="Guides & Tips"
          title="Bonus Playbooks & Strategy Guides"
          description="Learn how to maximize credit card welcome offers and bank account promos while keeping your credit score strong."
          badge={
            <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-[#0160c4] dark:border-blue-800 dark:bg-blue-950/60 dark:text-[#38b6ff]">
              <BookOpen weight="bold" className="h-3.5 w-3.5" />
              <span>Updated for 2026</span>
            </span>
          }
        />

        <Tabs defaultValue="creditcards" className="mb-12">
          <TabsList className="grid h-12 w-full max-w-md grid-cols-2 rounded-xl bg-slate-200/70 p-1 dark:bg-slate-900">
            <TabsTrigger
              value="creditcards"
              className="flex items-center justify-center gap-2 rounded-lg text-xs font-bold transition-all data-[state=active]:bg-white data-[state=active]:text-[#0160c4] data-[state=active]:shadow-xs dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-white"
            >
              <CreditCard weight="bold" className="h-4 w-4" />
              <span>Credit Cards</span>
            </TabsTrigger>
            <TabsTrigger
              value="banks"
              className="flex items-center justify-center gap-2 rounded-lg text-xs font-bold transition-all data-[state=active]:bg-white data-[state=active]:text-[#0160c4] data-[state=active]:shadow-xs dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-white"
            >
              <Bank weight="bold" className="h-4 w-4" />
              <span>Bank Bonuses</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="creditcards" className="mt-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ResourceCard
                icon={Info}
                title="Understanding Welcome Bonuses"
                description="Learn how issuers structure incentives so you can extract maximum value with minimal friction."
              />
              <ResourceCard
                icon={ChartLineUp}
                title="Maximizing Point Valuations"
                description="Turn points into outsized wins with transfer partners and high-yield redemptions."
              />
              <ResourceCard
                icon={CalendarBlank}
                title="Timing Applications & Cycles"
                description="Apply at the right moments to stay under issuer limits and capture elevated historical offers."
              />
            </div>

            <div className="mt-12 rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.06)] dark:bg-slate-900 sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
                Credit Card Churning FAQs
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Essential rules, credit score considerations, and best practices
              </p>

              <Accordion
                type="single"
                collapsible
                className="mt-6 w-full divide-y divide-slate-100 dark:divide-slate-800"
              >
                <AccordionItem value="chase524" className="border-b-0 py-1">
                  <AccordionTrigger className="text-sm font-semibold text-slate-900 hover:no-underline hover:text-[#0160c4] dark:text-white dark:hover:text-[#38b6ff]">
                    What is the Chase 5/24 rule?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    <p className="mb-2.5">
                      The Chase 5/24 rule is an unwritten policy where Chase
                      will automatically reject your credit card application if
                      you have opened 5 or more personal credit cards across all
                      banks in the past 24 months.
                    </p>
                    <p className="mb-2.5">
                      This rule applies to most Chase credit cards. Business
                      credit cards from most issuers (except Capital One and
                      Discover) typically do not count toward your 5/24 status
                      because they do not appear on personal credit reports.
                    </p>
                    <p>
                      To check your 5/24 status, count how many personal credit
                      cards you have opened in the last 24 months across all
                      banks. If you are at 5 or more, wait until your oldest
                      cards age past the 24-month mark before applying for a new
                      Chase card.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="churning" className="border-b-0 py-1">
                  <AccordionTrigger className="text-sm font-semibold text-slate-900 hover:no-underline hover:text-[#0160c4] dark:text-white dark:hover:text-[#38b6ff]">
                    What is credit card churning and is it legal?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    <p className="mb-2.5">
                      Credit card churning is the practice of strategically
                      opening new credit cards to earn substantial welcome
                      bonuses, statement credits, and points. It is 100% legal.
                    </p>
                    <p>
                      Card issuers budget billions of dollars annually for
                      customer acquisition. Responsible churners simply take
                      advantage of these incentives by paying statement balances
                      in full every month to avoid interest charges.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="creditscore" className="border-b-0 py-1">
                  <AccordionTrigger className="text-sm font-semibold text-slate-900 hover:no-underline hover:text-[#0160c4] dark:text-white dark:hover:text-[#38b6ff]">
                    Does applying for multiple cards hurt my credit score?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    <p className="mb-2.5">
                      A new card application creates a hard inquiry, which
                      typically causes a temporary dip of 3 to 5 points.
                      However, as your new credit line opens, your total
                      available credit increases, which lowers your overall
                      credit utilization ratio.
                    </p>
                    <p>
                      Over time, responsible churners who pay on time and keep
                      utilization low often see their credit scores increase
                      into the 780 to 820+ range.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>

          <TabsContent value="banks" className="mt-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ResourceCard
                icon={Info}
                title="Bank Account Bonus Basics"
                description="Master direct deposit, minimum balance, and timeline rules so institutions pay you promptly."
              />
              <ResourceCard
                icon={Bank}
                title="Understanding Direct Deposits"
                description="Learn what qualifies as direct deposit and satisfy criteria without changing employer payroll."
              />
              <ResourceCard
                icon={CalendarBlank}
                title="Timing Multiple Bank Promos"
                description="Run multiple deposit cycles efficiently without missing deadlines or incurring monthly maintenance fees."
              />
            </div>

            <div className="mt-12 rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.06)] dark:bg-slate-900 sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
                Bank Account Bonus FAQs
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Tax rules, ChexSystems insights, and early closure avoidance
              </p>

              <Accordion
                type="single"
                collapsible
                className="mt-6 w-full divide-y divide-slate-100 dark:divide-slate-800"
              >
                <AccordionItem value="taxes" className="border-b-0 py-1">
                  <AccordionTrigger className="text-sm font-semibold text-slate-900 hover:no-underline hover:text-[#0160c4] dark:text-white dark:hover:text-[#38b6ff]">
                    Are bank account bonuses taxable?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    <p className="mb-2.5">
                      Yes. Unlike credit card rewards (which the IRS considers
                      non-taxable purchase rebates), bank account bonuses are
                      treated as interest income. Banks issue a Form 1099-INT
                      for bonuses of $10 or more.
                    </p>
                    <p>
                      You should report this interest on your federal and state
                      tax returns. Factor your marginal tax rate into your
                      expected net profit calculations.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="chexsystems" className="border-b-0 py-1">
                  <AccordionTrigger className="text-sm font-semibold text-slate-900 hover:no-underline hover:text-[#0160c4] dark:text-white dark:hover:text-[#38b6ff]">
                    What is ChexSystems and how does it affect bank bonuses?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    <p className="mb-2.5">
                      ChexSystems is a consumer reporting agency that banks use
                      to verify checking and savings account history. It tracks
                      how many accounts you have recently opened or closed.
                    </p>
                    <p>
                      Some banks are inquiry-sensitive and may reject
                      applications if you have opened many accounts recently,
                      while other banks do not check ChexSystems at all. Spacing
                      out applications by 30 to 60 days helps minimize friction.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="earlyclosure" className="border-b-0 py-1">
                  <AccordionTrigger className="text-sm font-semibold text-slate-900 hover:no-underline hover:text-[#0160c4] dark:text-white dark:hover:text-[#38b6ff]">
                    Can I close an account right after receiving the bonus?
                  </AccordionTrigger>
                  <AccordionContent className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    <p className="mb-2.5">
                      Most banks require you to keep the account open for 90 to
                      180 days to avoid early account closure fees or bonus
                      clawbacks.
                    </p>
                    <p>
                      Always note the required retention period on your
                      calendar. Once the retention period passes, you can
                      cleanly close or downgrade the account with zero
                      penalties.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>
      </PageContainer>
    </div>
  );
};

export default Resources;
