import { BankAccount } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BanknoteIcon,
  ArrowRight,
  DollarSign,
  Calendar,
  Info,
} from "lucide-react";

interface BankAccountItemProps {
  account: BankAccount;
}

const BankAccountItem = ({ account }: BankAccountItemProps) => {
  return (
    <Card className="h-full overflow-hidden border-border/70 bg-card/95 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="from-primary via-primary to-secondary bg-gradient-to-r p-4 text-primary-foreground">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold tracking-tight">
            {account.institution}
          </h3>
          <Badge className="bg-white/20 text-primary-foreground">
            {account.type}
          </Badge>
        </div>
        <h2 className="font-serif mt-2 text-2xl font-semibold leading-tight">
          {account.name}
        </h2>
        <div className="mt-4 flex items-center">
          <div className="rounded-full bg-white/20 p-2">
            <BanknoteIcon className="h-6 w-6" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-primary-foreground/85">Bonus Amount</p>
            <p className="text-2xl font-bold">${account.offerAmount}</p>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Info className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
            <p className="text-sm">{account.requirements}</p>
          </div>

          {account.directDepositRequired && (
            <div className="flex items-center gap-2">
              <DollarSign className="text-primary h-4 w-4" />
              <span className="text-sm">
                Direct Deposit Required:
                {account.directDepositAmount
                  ? ` $${account.directDepositAmount.toLocaleString()}`
                  : " Yes"}
              </span>
            </div>
          )}

          {account.minimumBalance !== undefined && (
            <div className="flex items-center gap-2">
              <DollarSign className="text-primary h-4 w-4" />
              <span className="text-sm">
                Min Balance: ${account.minimumBalance.toLocaleString()}
              </span>
            </div>
          )}

          {account.expirationDate && (
            <div className="flex items-center gap-2">
              <Calendar className="text-primary h-4 w-4" />
              <span className="text-sm">
                Expires: {new Date(account.expirationDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        <div className="mt-4 rounded-lg bg-muted/55 p-3">
          <div className="flex items-center justify-between text-sm">
            <span>Monthly Fee</span>
            <span className="font-semibold">
              {account.monthlyFee ? `$${account.monthlyFee}` : "No Fee"}
            </span>
          </div>

          {account.monthlyFee &&
            account.monthlyFee > 0 &&
            account.isMonthlyFeeWaivable && (
              <p className="text-muted-foreground mt-1 text-xs">
                Fee can be waived with qualifying activity
              </p>
            )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <Link
          href={`/bank-accounts/${account.id}`}
          className="text-primary text-sm font-medium hover:underline"
        >
          View Details
        </Link>

        <Button
          asChild
          size="sm"
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          <a href={account.url} target="_blank" rel="noopener noreferrer">
            Claim Bonus <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BankAccountItem;
