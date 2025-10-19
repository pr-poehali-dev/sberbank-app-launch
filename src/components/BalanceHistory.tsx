import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface HistoryEntry {
  id: number;
  amount: number;
  type: 'add' | 'remove' | 'edit';
  date: string;
  previousBalance: number;
  newBalance: number;
}

interface BalanceHistoryProps {
  history: HistoryEntry[];
}

export const BalanceHistory = ({ history }: BalanceHistoryProps) => {
  const getHistoryIcon = (type: 'add' | 'remove' | 'edit') => {
    switch (type) {
      case 'add':
        return 'ArrowDown';
      case 'remove':
        return 'ArrowUp';
      case 'edit':
        return 'Edit2';
      default:
        return 'ArrowDown';
    }
  };

  const getHistoryColor = (type: 'add' | 'remove' | 'edit') => {
    switch (type) {
      case 'add':
        return 'text-emerald-600';
      case 'remove':
        return 'text-red-600';
      case 'edit':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getHistoryBg = (type: 'add' | 'remove' | 'edit') => {
    switch (type) {
      case 'add':
        return 'bg-emerald-100';
      case 'remove':
        return 'bg-red-100';
      case 'edit':
        return 'bg-blue-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getHistoryLabel = (type: 'add' | 'remove' | 'edit') => {
    switch (type) {
      case 'add':
        return 'Пополнение';
      case 'remove':
        return 'Снятие';
      case 'edit':
        return 'Редактирование';
      default:
        return 'Операция';
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur border-0 shadow-sm rounded-3xl p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-gray-900">История изменений</h2>
      </div>
      
      {history.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Receipt" size={48} className="text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">История пуста</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((entry) => (
            <div key={entry.id} className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-2xl">
              <div className={`w-10 h-10 rounded-xl ${getHistoryBg(entry.type)} flex items-center justify-center flex-shrink-0`}>
                <Icon name={getHistoryIcon(entry.type)} size={20} className={getHistoryColor(entry.type)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{getHistoryLabel(entry.type)}</p>
                <p className="text-xs text-gray-500">{entry.date}</p>
                <p className="text-xs text-gray-600">
                  {entry.previousBalance.toLocaleString('ru-RU')} ₽ → {entry.newBalance.toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${getHistoryColor(entry.type)}`}>
                  {entry.type === 'add' ? '+' : entry.type === 'remove' ? '-' : ''}
                  {entry.amount.toLocaleString('ru-RU')} ₽
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
