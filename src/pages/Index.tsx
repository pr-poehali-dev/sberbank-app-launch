import { useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { BalanceCard } from '@/components/BalanceCard';
import { QuickActions } from '@/components/QuickActions';
import { QuickAddModal } from '@/components/QuickAddModal';
import { FortuneModal } from '@/components/FortuneModal';
import { BalanceHistory } from '@/components/BalanceHistory';
import { TransactionsList } from '@/components/TransactionsList';
import { BottomNav } from '@/components/BottomNav';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [balance, setBalance] = useState(100000);
  const [balanceHistory, setBalanceHistory] = useState<Array<{
    id: number;
    amount: number;
    type: 'add' | 'remove' | 'edit';
    date: string;
    previousBalance: number;
    newBalance: number;
  }>>([]);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showFortune, setShowFortune] = useState(false);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [fortuneResult, setFortuneResult] = useState<string | null>(null);

  const fortuneCards = [
    { id: 1, emoji: '😊', name: 'Ребёнок', number: 4 },
    { id: 2, emoji: '💰', name: 'Деньги', number: 10 },
    { id: 3, emoji: '😢', name: 'Одиночество', number: 62 },
    { id: 4, emoji: '☕', name: 'Общение', number: 14 },
    { id: 5, emoji: '😔', name: 'Бедность', number: 20 },
    { id: 6, emoji: '🎨', name: 'Творчество', number: 33 },
    { id: 7, emoji: '👨', name: 'Мужчина', number: 28 },
    { id: 8, emoji: '💍', name: 'Государство', number: 88 },
    { id: 9, emoji: '🌙', name: 'Тайна', number: 73 },
    { id: 10, emoji: '🤔', name: 'Вопрос', number: 67 },
  ];

  const drawRandomCards = () => {
    setSelectedCards([]);
    setFortuneResult(null);
    
    setTimeout(() => {
      const shuffled = [...Array(fortuneCards.length)].map((_, i) => i).sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 5);
      setSelectedCards(selected);
      setFortuneResult('Карты вытянуты! Позвоните для полной расшифровки расклада.');
    }, 800);
  };

  const transactions = [
    {
      id: 1,
      name: 'JARCHE BELOKURIKHA RUS',
      amount: -179.97,
      category: 'Оплата товаров и услуг',
      date: 'Сегодня',
      icon: 'ShoppingBasket'
    },
    {
      id: 2,
      name: 'SP_DEBYUT . Belokurikha RUS',
      amount: -74.00,
      category: 'Оплата товаров и услуг',
      date: 'Сегодня',
      icon: 'ShoppingBasket'
    }
  ];

  const handleBalanceChange = (newBalance: number, type: 'add' | 'remove' | 'edit') => {
    const now = new Date();
    const historyEntry = {
      id: Date.now(),
      amount: Math.abs(newBalance - balance),
      type,
      date: now.toLocaleString('ru-RU', { 
        day: 'numeric', 
        month: 'long', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      previousBalance: balance,
      newBalance
    };
    setBalanceHistory(prev => [historyEntry, ...prev]);
    setBalance(newBalance);
  };

  const handleAddMoney = (amount: number) => {
    handleBalanceChange(balance + amount, 'add');
  };

  const handleRemoveMoney = () => {
    const amount = prompt('Сколько снять?');
    if (amount && !isNaN(Number(amount))) {
      if (balance >= Number(amount)) {
        handleBalanceChange(balance - Number(amount), 'remove');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7FFFD] to-[#E8F5F1] pb-20">
      <div className="max-w-md mx-auto">
        <div className="px-4 pt-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button className="w-12 h-12 rounded-full bg-gradient-to-br from-[#98D8C8] to-[#7BC4B0] flex items-center justify-center shadow-sm">
                <span className="text-white font-semibold text-lg">АЛ</span>
              </button>
              <div>
                <p className="text-sm font-semibold text-gray-900">Александр С Ломакин</p>
                <p className="text-xs text-gray-600">Личный счет</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-12 h-12 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white transition-colors">
                <Icon name="Moon" size={24} className="text-gray-700" />
              </button>
              <button className="w-12 h-12 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white transition-colors">
                <Icon name="Grid3x3" size={24} className="text-gray-700" />
              </button>
            </div>
          </div>

          <BalanceCard 
            balance={balance} 
            onBalanceChange={handleBalanceChange}
          />

          <QuickActions 
            onAddMoney={() => setShowQuickAdd(true)}
            onRemoveMoney={handleRemoveMoney}
          />

          <Card 
            onClick={() => setShowFortune(true)}
            className="bg-gradient-to-br from-purple-600 to-purple-800 border-0 shadow-lg rounded-3xl overflow-hidden mb-6 cursor-pointer hover:shadow-xl transition-all"
          >
            <div className="p-6 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Sparkles" size={24} className="text-yellow-300" />
                  <h3 className="text-xl font-bold text-white">Гадание на картах</h3>
                </div>
                <p className="text-white/80 text-sm mb-3">Узнай своё будущее</p>
                <a href="tel:+79069606037" className="text-yellow-300 font-semibold text-sm hover:text-yellow-200 transition-colors">
                  +7 906 960-60-37
                </a>
              </div>
              <div className="text-6xl">🔮</div>
            </div>
          </Card>

          <QuickAddModal 
            show={showQuickAdd}
            onClose={() => setShowQuickAdd(false)}
            onAdd={handleAddMoney}
          />

          <FortuneModal 
            show={showFortune}
            onClose={() => setShowFortune(false)}
            fortuneCards={fortuneCards}
            selectedCards={selectedCards}
            fortuneResult={fortuneResult}
            onDrawCards={drawRandomCards}
          />

          <Card className="bg-gradient-to-br from-[#98D8C8] to-[#7BC4B0] border-0 shadow-lg rounded-3xl overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-800 mb-1">Срок действия закончился</p>
                  <p className="text-2xl font-semibold text-gray-900">41,48 ₽</p>
                  <p className="text-sm text-gray-700 mt-1">Maestro •• 7646</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white/30 backdrop-blur flex items-center justify-center">
                  <Icon name="CreditCard" size={32} className="text-gray-900" />
                </div>
              </div>
            </div>
          </Card>

          <BalanceHistory history={balanceHistory} />

          <TransactionsList transactions={transactions} />
        </div>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
