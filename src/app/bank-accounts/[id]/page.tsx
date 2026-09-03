"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BankAccount } from "@/types";
import { fetchBankAccountById } from "@/services/api";
import {
  Bank as BankIcon,
  CurrencyDollar,
  CalendarBlank,
  Check,
  Info,
} from "@phosphor-icons/react";
import { PageContainer } from "@/components/shared/PageContainer";
import { BackLink } from "@/components/shared/BackLink";
import { EmptyState } from "@/components/shared/EmptyState";

export default function BankAccountDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [account, setAccount] = useState<BankAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBankAccount = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const accountData = await fetchBankAccountById(id);
          setAccount(accountData);
        }
      } catch (error) {
        console.error(`Error loading bank account with ID ${id}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadBankAccount();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-8 md:px-6">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  if (!account) {
    return (
      <PageContainer className="py-8">
        <div className="mb-6">
          <BackLink href="/bank-accounts" label="Back to Bank Accounts" />
        </div>
        <EmptyState
          icon={BankIcon}
          title="Account Not Found"
          description={`The bank account you are looking for (ID: ${id || "N/A"}) does not exist or could not be loaded.`}
          actionHref="/bank-accounts"
          actionLabel="Browse All Bank Accounts"
        />
      </PageContainer>
    );
  }

  const accountTypeColors: Record<string, string> = {
    CHECKING: "bg-ring text-white",
    SAVINGS: "bg-chart-1 text-white",
    BROKERAGE: "bg-primary text-white",
    HYBRID: "bg-card text-white",
  };

  return (
    <PageContainer className="py-8">
      <div className="mb-6">
        <BackLink href="/bank-accounts" label="Back to Bank Accounts" />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <Badge
                className={
                  accountTypeColors[account.type.toUpperCase()] ||
                  "bg-primary text-primary-foreground"
                }
              >
                {account.type.toUpperCase()}
              </Badge>
            </div>

            <h1 className="mb-2 text-3xl font-bold md:text-4xl">
              {account.institution} {account.name}
            </h1>

            <h2 className="text-primary mb-6 text-xl font-semibold">
              ${account.offerAmount.toLocaleString()} Bonus
            </h2>

            {account.description && (
              <p className="text-muted-foreground mb-6 text-lg">
                {account.description}
              </p>
            )}

            <Card className="border-primary/40 mb-6 border-2 bg-card/90">
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-bold">Offer Requirements</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-chart-1/10 mt-1 rounded-full p-1">
                      <Info className="text-chart-1 h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Requirements</p>
                      <p className="text-muted-foreground">
                        {account.requirements}
                      </p>
                    </div>
                  </div>

                  {account.directDepositRequired && (
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 mt-1 rounded-full p-1">
                        <CurrencyDollar
                          weight="light"
                          className="h-5 w-5 text-gold"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Direct Deposit Required</p>
                        <p className="text-muted-foreground">
                          {account.directDepositAmount
                            ? `$${account.directDepositAmount.toLocaleString()} required`
                            : "Required (amount not specified)"}
                        </p>
                      </div>
                    </div>
                  )}

                  {account.minimumBalance !== undefined &&
                    account.minimumBalance > 0 && (
                      <div className="flex items-start gap-3">
                        <div className="bg-ring/10 mt-1 rounded-full p-1">
                          <CurrencyDollar
                            weight="light"
                            className="h-5 w-5 text-gold"
                          />
                        </div>
                        <div>
                          <p className="font-medium">Minimum Balance</p>
                          <p className="text-muted-foreground">
                            ${account.minimumBalance.toLocaleString()} minimum
                            balance required
                          </p>
                        </div>
                      </div>
                    )}

                  {account.expirationDate && (
                    <div className="flex items-start gap-3">
                      <div className="bg-destructive/10 mt-1 rounded-full p-1">
                        <CalendarBlank
                          weight="light"
                          className="h-5 w-5 text-gold"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Offer Expiration</p>
                        <p className="text-muted-foreground">
                          Expires on{" "}
                          {new Date(
                            account.expirationDate,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted/55 p-4">
                <p className="text-muted-foreground text-sm">Monthly Fee</p>
                <p className="text-xl font-medium">
                  {account.monthlyFee
                    ? `$${account.monthlyFee.toLocaleString()}`
                    : "No Monthly Fee"}
                </p>
                {(account.monthlyFee ?? 0) > 0 &&
                  account.isMonthlyFeeWaivable && (
                    <p className="text-sm text-gold">Fee can be waived</p>
                  )}
              </div>

              <div className="rounded-lg bg-muted/55 p-4">
                <p className="text-muted-foreground text-sm">Account Type</p>
                <p className="text-xl font-medium">
                  {account.type.charAt(0).toUpperCase() +
                    account.type.slice(1).toLowerCase()}
                </p>
                <p className="text-muted-foreground text-sm">
                  {account.institution}
                </p>
              </div>
            </div>
          </div>

          <Button
            asChild
            className="bg-chart-1 hover:bg-chart-1/90 mt-6 text-white"
          >
            <a href={account.url} target="_blank" rel="noopener noreferrer">
              Open Account Now
            </a>
          </Button>
        </div>

        <div className="flex flex-col rounded-lg border border-border/70 bg-card/90 p-6 md:p-8">
          {/* Card Image or Placeholder */}
          {account.imageUrl ? (
            <Image
              src={account.imageUrl}
              alt={`${account.name} from ${account.institution}`}
              width={320}
              height={200}
              unoptimized
              className="mb-6 h-auto max-h-[200px] w-auto self-center rounded-lg shadow-md"
            />
          ) : (
            <div className="mb-6 flex h-[200px] w-full items-center justify-center rounded-lg bg-muted/55">
              <BankIcon
                weight="light"
                className="h-24 w-24 text-muted-foreground"
              />
            </div>
          )}

          <div className="from-ring to-primary mb-6 rounded-lg bg-gradient-to-r p-8 text-center text-white">
            <h3 className="mb-2 font-serif text-3xl">Bonus Amount</h3>
            <div className="text-5xl font-bold">
              ${account.offerAmount.toLocaleString()}
            </div>
            {account.offerType && (
              <p className="mt-1 text-sm text-white/80">
                ({account.offerType})
              </p>
            )}
            <p className="mt-2 text-white/80">Limited-Time Offer</p>
          </div>

          <div className="mb-6">
            <h3 className="mb-4 text-xl font-bold">What You Need to Know</h3>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                <p>
                  <span className="font-medium">Institution:</span>{" "}
                  {account.institution}
                </p>
              </div>

              <div className="flex items-start gap-2">
                <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                <p>
                  <span className="font-medium">Account Type:</span>{" "}
                  {account.type.charAt(0).toUpperCase() +
                    account.type.slice(1).toLowerCase()}
                </p>
              </div>

              <div className="flex items-start gap-2">
                <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                <p>
                  <span className="font-medium">Bonus Amount:</span> $
                  {account.offerAmount.toLocaleString()}
                </p>
              </div>

              <div className="flex items-start gap-2">
                <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                <p>
                  <span className="font-medium">Monthly Fee:</span>{" "}
                  {account.monthlyFee
                    ? `$${account.monthlyFee.toLocaleString()}`
                    : "None"}
                  {(account.monthlyFee ?? 0) > 0 &&
                    account.isMonthlyFeeWaivable &&
                    " (Can be waived)"}
                </p>
              </div>

              {account.directDepositRequired && (
                <div className="flex items-start gap-2">
                  <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                  <p>
                    <span className="font-medium">Direct Deposit:</span>{" "}
                    Required
                    {account.directDepositAmount &&
                      ` ($${account.directDepositAmount.toLocaleString()})`}
                  </p>
                </div>
              )}

              {account.minimumBalance !== undefined &&
                account.minimumBalance > 0 && (
                  <div className="flex items-start gap-2">
                    <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                    <p>
                      <span className="font-medium">Min Balance:</span> $
                      {account.minimumBalance.toLocaleString()}
                    </p>
                  </div>
                )}

              {account.availability &&
                account.availability.toLowerCase() !== "nationwide" && (
                  <div className="flex items-start gap-2">
                    <Info className="text-destructive mt-0.5 h-5 w-5 flex-shrink-0" />
                    <p>
                      <span className="font-medium">Availability:</span>{" "}
                      {account.availability}
                    </p>
                  </div>
                )}
            </div>
          </div>

          {account.additionalInfo && (
            <>
              <Separator className="my-6" />
              <div>
                <h3 className="mb-3 text-xl font-bold">
                  Additional Information
                </h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {account.additionalInfo}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
