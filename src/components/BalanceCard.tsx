import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface BalanceCardProps {
  balance: number;
  onBalanceChange: (newBalance: number, type: 'edit') => void;
}

export const BalanceCard = ({ balance, onBalanceChange }: BalanceCardProps) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  return (
    <div className="mb-6">
      <p className="text-sm text-gray-600 mb-1">В кошельке</p>
      <div className="flex items-center gap-3">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="text-5xl font-semibold text-gray-900 bg-white/50 rounded-2xl px-4 py-2 w-[320px] focus:outline-none focus:ring-2 focus:ring-[#98D8C8]"
              placeholder={balance.toString()}
              autoFocus
            />
            <button 
              className="p-2 bg-[#98D8C8] hover:bg-[#7BC4B0] rounded-xl transition-colors"
              onClick={() => {
                if (editValue && !isNaN(Number(editValue))) {
                  onBalanceChange(Number(editValue), 'edit');
                }
                setIsEditing(false);
                setEditValue('');
              }}
            >
              <Icon name="Check" size={24} className="text-white" />
            </button>
            <button 
              className="p-2 hover:bg-white/50 rounded-xl transition-colors"
              onClick={() => {
                setIsEditing(false);
                setEditValue('');
              }}
            >
              <Icon name="X" size={24} className="text-gray-600" />
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-5xl font-semibold text-gray-900 transition-all duration-300 animate-fade-in">
              {isBalanceVisible ? `${balance.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽` : '••• •••,•• ₽'}
            </h1>
            <button 
              className="p-2 hover:bg-white/50 rounded-xl transition-colors"
              onClick={() => setIsBalanceVisible(!isBalanceVisible)}
            >
              <Icon name={isBalanceVisible ? "Eye" : "EyeOff"} size={24} className="text-gray-600" />
            </button>
            <button 
              className="p-2 hover:bg-white/50 rounded-xl transition-colors"
              onClick={() => {
                setIsEditing(true);
                setEditValue(balance.toString());
              }}
            >
              <Icon name="Edit2" size={24} className="text-gray-600" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
