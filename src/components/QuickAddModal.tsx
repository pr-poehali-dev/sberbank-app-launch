import Icon from '@/components/ui/icon';

interface QuickAddModalProps {
  show: boolean;
  onClose: () => void;
  onAdd: (amount: number) => void;
}

export const QuickAddModal = ({ show, onClose, onAdd }: QuickAddModalProps) => {
  if (!show) return null;

  const quickAmounts = [1000, 5000, 10000, 50000, 100000];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
      <div className="w-full max-w-md mx-auto bg-white rounded-t-[2rem] p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">Выбрать сумму</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Icon name="X" size={24} className="text-gray-600" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {quickAmounts.map(amount => (
            <button
              key={amount}
              onClick={() => {
                onAdd(amount);
                onClose();
              }}
              className="p-4 bg-gradient-to-br from-[#98D8C8] to-[#7BC4B0] text-white font-semibold rounded-2xl hover:shadow-lg transition-all"
            >
              {amount.toLocaleString('ru-RU')} ₽
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
