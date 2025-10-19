import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface QuickActionsProps {
  onAddMoney: () => void;
  onRemoveMoney: () => void;
}

export const QuickActions = ({ onAddMoney, onRemoveMoney }: QuickActionsProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      <Card 
        onClick={onAddMoney}
        className="bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition-all cursor-pointer rounded-3xl"
      >
        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-3">
          <Icon name="Plus" size={28} className="text-white" />
        </div>
        <span className="text-sm font-semibold text-white">Пополнить</span>
      </Card>
      
      <Card 
        onClick={onRemoveMoney}
        className="bg-gradient-to-br from-red-500 to-red-600 border-0 shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition-all cursor-pointer rounded-3xl"
      >
        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-3">
          <Icon name="Minus" size={28} className="text-white" />
        </div>
        <span className="text-sm font-semibold text-white">Снять</span>
      </Card>
    </div>
  );
};
