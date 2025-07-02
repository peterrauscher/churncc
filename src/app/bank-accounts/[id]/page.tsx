"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BankAccount } from "@/types";
import { fetchBankAccountById } from "@/services/api";
import {
  ArrowLeft,
  BanknoteIcon as BanknoteIconDetail,
  DollarSign,
  Calendar,
  Check,
  Info,
} from "lucide-react"; // Renamed BanknoteIcon to avoid conflict if any

interface BankAccountDetailPageProps {
  params: { id: string };
}

export default function BankAccountDetailPage({
  params,
}: BankAccountDetailPageProps) {
  const { id } = params;
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
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-6">
          <Link
            href="/bank-accounts"
            className="text-primary flex items-center hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Bank Accounts
          </Link>
        </div>
        <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-lg border p-8 text-center">
          <BanknoteIconDetail className="text-muted-foreground mb-4 h-16 w-16" />
          <h2 className="mb-2 text-2xl font-bold">Account Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The bank account you're looking for (ID: {id || "N/A"}) doesn't
            exist, has been removed, or there was an issue loading it.
          </p>
          <Button asChild>
            <Link href="/bank-accounts">Browse All Bank Accounts</Link>
          </Button>
        </div>
      </div>
    );
  }

  const accountTypeColors: Record<string, string> = {
    CHECKING: "bg-ring text-white",
    SAVINGS: "bg-chart-1 text-white",
    BROKERAGE: "bg-primary text-white",
    HYBRID: "bg-card text-white",
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-6">
        <Link
          href="/bank-accounts"
          className="text-primary flex items-center hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Bank Accounts
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <Badge
                className={
                  accountTypeColors[account.type.toUpperCase()] ||
                  "bg-gray-500 text-white"
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

            <Card className="border-primary mb-6 border-2">
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
                        <DollarSign className="text-primary h-5 w-5" />
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
                          <DollarSign className="text-ring h-5 w-5" />
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
                        <Calendar className="text-destructive h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Offer Expiration</p>
                        <p className="text-muted-foreground">
                          Expires on{" "}
                          {new Date(
                            account.expirationDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-muted-foreground text-sm">Monthly Fee</p>
                <p className="text-xl font-medium">
                  {account.monthlyFee
                    ? `$${account.monthlyFee.toLocaleString()}`
                    : "No Monthly Fee"}
                </p>
                {account.monthlyFee &&
                  account.monthlyFee > 0 &&
                  account.isMonthlyFeeWaivable && (
                    <p className="text-primary text-sm">Fee can be waived</p>
                  )}
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
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

        <div className="flex flex-col rounded-lg border bg-white p-6 md:p-8">
          {/* Card Image or Placeholder */}
          {account.imageUrl ? (
            <img
              src={account.imageUrl}
              alt={`${account.name} from ${account.institution}`}
              className="mb-6 h-auto max-h-[200px] w-auto self-center rounded-lg shadow-md" // Adjusted styling
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                (e.target as HTMLImageElement).src = "/placeholder-bank.svg"; // Specific placeholder for banks
              }}
            />
          ) : (
            <div className="mb-6 flex h-[200px] w-full items-center justify-center rounded-lg bg-gray-100">
              <BanknoteIconDetail className="text-muted-foreground h-24 w-24" />
            </div>
          )}

          <div className="from-ring to-primary mb-6 rounded-lg bg-gradient-to-r p-8 text-center text-white">
            <h3 className="mb-2 text-xl font-bold">Bonus Amount</h3>
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
                  {account.monthlyFee &&
                    account.monthlyFee > 0 &&
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
    </div>
  );
}
