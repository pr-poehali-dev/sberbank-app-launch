import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Transaction {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
  icon: string;
}

interface TransactionsListProps {
  transactions: Transaction[];
}

export const TransactionsList = ({ transactions }: TransactionsListProps) => {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900">Операции</h2>
        <button className="text-sm text-[#98D8C8] font-medium hover:text-[#7BC4B0] transition-colors">
          Все
        </button>
      </div>

      <div className="space-y-3 mb-6">
        {transactions.map((transaction) => (
          <Card key={transaction.id} className="bg-white/90 backdrop-blur border-0 shadow-sm p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#98D8C8] to-[#7BC4B0] flex items-center justify-center flex-shrink-0">
                <Icon name={transaction.icon} size={24} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{transaction.name}</p>
                <p className="text-xs text-gray-500">{transaction.category}</p>
                <p className="text-xs text-gray-400">{transaction.date}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${transaction.amount < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                  {transaction.amount < 0 ? '' : '+'}
                  {transaction.amount.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};
