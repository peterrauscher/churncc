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
  BanknoteIcon,
  Info,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { ResourceCard } from "@/components/resources/ResourceCard";

const Resources = () => {
  return (
    <PageContainer className="py-8">
      <PageHeader
        title="Resources & Guides"
        description="Playbooks and FAQs to help you maximize card and bank bonuses with less risk and more consistency."
      />

      <Tabs defaultValue="creditcards" className="mb-12">
        <TabsList className="grid w-full grid-cols-2 rounded-xl border border-border/70 bg-card/70">
          <TabsTrigger value="creditcards" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Credit Card Strategies
          </TabsTrigger>
          <TabsTrigger value="banks" className="flex items-center gap-2">
            <BanknoteIcon className="h-4 w-4" />
            Bank Bonus Tips
          </TabsTrigger>
        </TabsList>

        <TabsContent value="creditcards" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ResourceCard
              icon={Info}
              title="Understanding Credit Card Bonuses"
              description="Credit card welcome bonuses are incentives offered to new cardholders who meet spending requirements within a specific timeframe."
            />
            <ResourceCard
              icon={TrendingUp}
              title="Maximizing Point Values"
              description="Learn how to get better value from points through strategic transfer partners and redemption timing."
            />
            <ResourceCard
              icon={Calendar}
              title="Timing Your Applications"
              description="Apply with intent to improve approvals and capture elevated offers at the right moment."
            />
          </div>

          <div className="mt-8">
            <h2 className="mb-4 font-serif text-3xl">Credit Card Bonus FAQs</h2>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="chase524">
                <AccordionTrigger>
                  What is the Chase 5/24 rule?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-3">
                    The Chase 5/24 rule is an unwritten policy where Chase will
                    automatically reject your credit card application if
                    you&apos;ve opened 5 or more personal credit cards across
                    all banks in the past 24 months.
                  </p>
                  <p className="mb-3">
                    This rule applies to most Chase credit cards, though there
                    are some exceptions. Business credit cards from most issuers
                    (except Capital One and Discover) typically don&apos;t count
                    toward your 5/24 status.
                  </p>
                  <p>
                    To check your 5/24 status, count how many personal credit
                    cards you&apos;ve opened in the last 24 months across all
                    banks. If you&apos;re at or over 5, you&apos;ll likely be
                    denied for a new Chase card.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="churning">
                <AccordionTrigger>
                  What is credit card churning?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-3">
                    Credit card churning refers to the practice of repeatedly
                    opening and closing credit cards to earn welcome bonuses,
                    rewards, and perks multiple times.
                  </p>
                  <p className="mb-3">
                    However, many issuers have implemented rules to prevent
                    churning. For example, American Express typically has a
                    once-per-lifetime rule for welcome bonuses, while Chase
                    often requires 24-48 months between card welcome bonuses for
                    the same product.
                  </p>
                  <p>
                    While churning can be profitable, it may impact your credit
                    score through hard inquiries and reduced average account
                    age. It&apos;s important to approach churning strategically
                    and to understand the potential impact on your credit
                    profile.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="manufactured">
                <AccordionTrigger>
                  What is manufactured spending?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-3">
                    Manufactured spending refers to techniques used to generate
                    credit card spending (to meet minimum spend requirements) in
                    ways that don&apos;t represent actual expenses by converting
                    credit card purchases into cash or cash equivalents.
                  </p>
                  <p className="mb-3">
                    Common methods include purchasing gift cards, money orders,
                    or prepaid debit cards with a credit card, then liquidating
                    them to recoup the funds.
                  </p>
                  <p>
                    While not illegal, many credit card issuers consider
                    manufactured spending against their terms of service and may
                    close accounts they suspect of engaging in this practice. We
                    don&apos;t recommend manufactured spending as it carries
                    significant risks.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="business">
                <AccordionTrigger>
                  Can I apply for business credit cards as an individual?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-3">
                    Yes, you can apply for business credit cards as a sole
                    proprietor even if you don&apos;t have a formal business
                    entity. Many people qualify for business credit cards
                    through side hustles, freelancing, selling items online, or
                    other small-scale income-generating activities.
                  </p>
                  <p className="mb-3">
                    When applying as a sole proprietor, you typically use your
                    Social Security Number instead of an EIN, and your legal
                    name as the business name. You&apos;ll need to provide
                    honest estimates of your business revenue and years in
                    business.
                  </p>
                  <p>
                    Business credit cards often have higher welcome bonuses and
                    don&apos;t typically report to personal credit reports
                    (except in cases of default), making them attractive for
                    maximizing rewards.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="points">
                <AccordionTrigger>
                  What are the most valuable types of points?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-3">
                    Transferable points are generally considered the most
                    valuable because of their flexibility. The main transferable
                    points currencies are:
                  </p>
                  <ul className="mb-3 list-disc pl-6">
                    <li>Chase Ultimate Rewards</li>
                    <li>American Express Membership Rewards</li>
                    <li>Capital One Miles</li>
                    <li>Citi ThankYou Points</li>
                  </ul>
                  <p className="mb-3">
                    These points can be transferred to various airline and hotel
                    partners, often at a 1:1 ratio, which allows you to book
                    premium travel experiences that would cost much more if
                    purchased directly.
                  </p>
                  <p>
                    Airline and hotel-specific points can also be valuable,
                    particularly for frequent travelers loyal to specific
                    brands, but they lack the flexibility of transferable points
                    and are subject to devaluations.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>

        <TabsContent value="banks" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ResourceCard
              icon={Info}
              title="Bank Account Bonus Basics"
              description="Understand how direct deposits, minimum balances, and timelines affect eligibility."
            />
            <ResourceCard
              icon={BanknoteIcon}
              title="Understanding Direct Deposits"
              description="Learn what usually qualifies as direct deposit and how to satisfy requirements efficiently."
            />
            <ResourceCard
              icon={Calendar}
              title="Timing Multiple Bank Bonuses"
              description="Plan overlapping applications without missing deadlines or fee-waiver conditions."
            />
          </div>

          <div className="mt-8">
            <h2 className="mb-4 font-serif text-3xl">
              Bank Account Bonus FAQs
            </h2>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="taxes">
                <AccordionTrigger>
                  Are bank account bonuses taxable?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-3">
                    Yes, unlike credit card bonuses (which are considered
                    rebates), bank account bonuses are treated as interest
                    income by the IRS and are taxable. Banks will issue a
                    1099-INT form for any bonuses you receive.
                  </p>
                  <p className="mb-3">
                    You&apos;ll need to report this income when you file your
                    taxes, even if you don&apos;t receive a 1099-INT form from
                    the bank (which typically happens if the bonus is under
                    $10).
                  </p>
                  <p>
                    This tax treatment is an important consideration when
                    evaluating bank bonuses, as it effectively reduces the value
                    of the bonus by your marginal tax rate.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="directdeposit">
                <AccordionTrigger>
                  What counts as a direct deposit?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-3">
                    Technically, a direct deposit is an ACH transfer from your
                    employer or a government benefit provider directly to your
                    bank account. However, many banks have different methods for
                    identifying direct deposits.
                  </p>
                  <p className="mb-3">
                    In some cases, ACH transfers from other banks, payment
                    services, or investment platforms may code as direct
                    deposits and satisfy bonus requirements. However, this
                    varies by bank and can change over time.
                  </p>
                  <p>
                    The safest approach is to use an actual employer or
                    government direct deposit when possible. If that&apos;s not
                    an option, research current data points from other users
                    about which transfers are working for the specific bank
                    you&apos;re targeting.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="chexsystems">
                <AccordionTrigger>
                  What is ChexSystems and how does it affect bank bonuses?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-3">
                    ChexSystems is a consumer reporting agency that banks use to
                    verify the banking history of potential customers. It&apos;s
                    similar to a credit bureau but specifically for banking
                    activities.
                  </p>
                  <p className="mb-3">
                    When you open and close multiple bank accounts in a short
                    period (as many bank bonus seekers do), these actions are
                    recorded in ChexSystems. Some banks are sensitive to having
                    many recent inquiries and may deny your application if you
                    have too many.
                  </p>
                  <p>
                    The sensitivity to ChexSystems inquiries varies greatly
                    between banks. Some are very sensitive and may deny
                    applications with just a few recent inquiries, while others
                    are much more lenient. Research a bank&apos;s ChexSystems
                    sensitivity before applying.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="earlyclosure">
                <AccordionTrigger>
                  Can I close a bank account soon after getting a bonus?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-3">
                    Most banks have terms and conditions specifying how long an
                    account must remain open to keep the bonus, often 90 days,
                    180 days, or even longer. Closing an account before this
                    period may result in the bonus being clawed back.
                  </p>
                  <p className="mb-3">
                    Additionally, some banks charge early account closure fees
                    if an account is closed within a certain timeframe (e.g., 6
                    months or a year) from opening, regardless of bonus terms.
                  </p>
                  <p>
                    Always read the fine print of the bonus offer and the
                    bank&apos;s account agreement carefully. It&apos;s generally
                    best practice to keep accounts open for at least 6 months to
                    avoid issues, even if the bonus terms are shorter.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="multipleaccounts">
                <AccordionTrigger>
                  Can I open multiple accounts at the same bank for bonuses?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-3">
                    This depends on the bank&apos;s specific terms. Some banks
                    allow you to earn bonuses for different types of accounts
                    (e.g., a checking bonus and a savings bonus). Others may
                    limit bonuses to one per customer or one per household.
                  </p>
                  <p className="mb-3">
                    Banks often have &quot;new customer&quot; requirements,
                    meaning you can&apos;t have had an account with them
                    recently (e.g., within the last 12 months or longer) to be
                    eligible for a bonus.
                  </p>
                  <p>
                    Always check the offer terms. Attempting to circumvent these
                    rules can lead to bonus denial or account closure.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default Resources;
