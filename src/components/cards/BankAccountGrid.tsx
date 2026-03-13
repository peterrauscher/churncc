import { BankAccount } from "@/types";
import BankAccountItem from "./BankAccountItem";
import { EmptyState } from "@/components/shared/EmptyState";
import { BanknoteIcon } from "lucide-react";

interface BankAccountGridProps {
  accounts: BankAccount[];
  emptyMessage?: string;
}

const BankAccountGrid = ({
  accounts,
  emptyMessage = "No bank accounts found",
}: BankAccountGridProps) => {
  if (!accounts || accounts.length === 0) {
    return (
      <EmptyState
        icon={BanknoteIcon}
        title="No bank accounts found"
        description={emptyMessage}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {accounts.map((account) => (
        <BankAccountItem key={account.id} account={account} />
      ))}
    </div>
  );
};

export default BankAccountGrid;
