
import { CreditCard } from '@/types';
import CreditCardItem from './CreditCardItem';

interface CreditCardGridProps {
  cards: CreditCard[];
  emptyMessage?: string;
}

const CreditCardGrid = ({ cards, emptyMessage = "No credit cards found" }: CreditCardGridProps) => {
  if (!cards || cards.length === 0) {
    return (
      <div className="my-10 flex flex-col items-center justify-center rounded-lg border border-dashed p-10 text-center">
        <p className="text-lg text-muted-foreground">{emptyMessage}</p>
      </div>
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
