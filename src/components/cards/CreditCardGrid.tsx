import { CreditCard } from "@/types";
import CreditCardItem from "./CreditCardItem";
import { EmptyState } from "@/components/shared/EmptyState";
import { CreditCard as CreditCardIcon } from "lucide-react";

interface CreditCardGridProps {
  cards: CreditCard[];
  emptyMessage?: string;
}

const CreditCardGrid = ({
  cards,
  emptyMessage = "No credit cards found",
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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map((card) => (
        <CreditCardItem key={card.cardId} card={card} />
      ))}
    </div>
  );
};

export default CreditCardGrid;
