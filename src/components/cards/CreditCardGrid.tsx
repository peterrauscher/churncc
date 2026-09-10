import { CreditCard } from "@/types";
import CreditCardItem from "./CreditCardItem";
import { EmptyState } from "@/components/shared/EmptyState";
import { CreditCard as CreditCardIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

interface CreditCardGridProps {
  cards: CreditCard[];
  emptyMessage?: string;
  columns?: string;
}

const CreditCardGrid = ({
  cards,
  emptyMessage = "No credit cards found",
  columns = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}: CreditCardGridProps) => {
  if (!cards || cards.length === 0) {
    return (
      <EmptyState
        icon={CreditCardIcon}
        title="No credit cards found"
        description={emptyMessage}
      />
    );
  }

  return (
    <div className={cn("grid gap-6", columns)}>
      {cards.map((card) => (
        <CreditCardItem key={card.cardId} card={card} />
      ))}
    </div>
  );
};

export default CreditCardGrid;
