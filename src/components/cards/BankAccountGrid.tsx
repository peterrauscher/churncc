
import { BankAccount } from '@/types';
import BankAccountItem from './BankAccountItem';

interface BankAccountGridProps {
  accounts: BankAccount[];
  emptyMessage?: string;
}

const BankAccountGrid = ({ accounts, emptyMessage = "No bank accounts found" }: BankAccountGridProps) => {
  if (!accounts || accounts.length === 0) {
    return (
      <div className="my-10 flex flex-col items-center justify-center rounded-lg border border-dashed p-10 text-center">
        <p className="text-lg text-muted-foreground">{emptyMessage}</p>
      </div>
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
