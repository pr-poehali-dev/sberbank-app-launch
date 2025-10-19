import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [balance, setBalance] = useState(100000);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [balanceHistory, setBalanceHistory] = useState<Array<{
    id: number;
    amount: number;
    type: 'add' | 'remove' | 'edit';
    date: string;
    previousBalance: number;
    newBalance: number;
  }>>([]);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAmount, setQuickAmount] = useState('');
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

  const quickActions = [
    { icon: 'QrCode', label: 'QR-код', id: 'qr' },
    { icon: 'Shield', label: 'Защита', id: 'protection' }
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

  const handleRemoveMoney = (amount: number) => {
    if (balance >= amount) {
      handleBalanceChange(balance - amount, 'remove');
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
                        handleBalanceChange(Number(editValue), 'edit');
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

          <div className="grid grid-cols-2 gap-3 mb-6">
            <Card 
              onClick={() => setShowQuickAdd(true)}
              className="bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition-all cursor-pointer rounded-3xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-3">
                <Icon name="Plus" size={28} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-white">Пополнить</span>
            </Card>
            
            <Card 
              onClick={() => {
                const amount = prompt('Сколько снять?');
                if (amount && !isNaN(Number(amount))) {
                  handleRemoveMoney(Number(amount));
                }
              }}
              className="bg-gradient-to-br from-red-500 to-red-600 border-0 shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition-all cursor-pointer rounded-3xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-3">
                <Icon name="Minus" size={28} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-white">Снять</span>
            </Card>
          </div>

          <Card 
            onClick={() => setShowFortune(true)}
            className="bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 border-0 shadow-lg p-6 mb-6 hover:shadow-xl transition-all cursor-pointer rounded-3xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <span className="text-3xl">🔮</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Гадание на картах</h3>
                  <p className="text-sm text-white/80">Узнай своё будущее</p>
                </div>
              </div>
              <Icon name="Sparkles" size={24} className="text-white" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 shadow-lg p-6 mb-6 rounded-3xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Icon name="Phone" size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Контакты</h3>
                <a href="tel:+79069606037" className="text-sm text-white/90 hover:text-white transition-colors">
                  +7 (906) 960-60-37
                </a>
              </div>
            </div>
          </Card>

          {showQuickAdd && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
              <div className="w-full max-w-md mx-auto bg-white rounded-t-3xl p-6 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Пополнить баланс</h3>
                  <button 
                    onClick={() => {
                      setShowQuickAdd(false);
                      setQuickAmount('');
                    }}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <Icon name="X" size={24} className="text-gray-600" />
                  </button>
                </div>
                
                <input
                  type="number"
                  value={quickAmount}
                  onChange={(e) => setQuickAmount(e.target.value)}
                  className="w-full text-3xl font-semibold text-gray-900 bg-gray-50 rounded-2xl px-4 py-4 mb-4 focus:outline-none focus:ring-2 focus:ring-[#98D8C8]"
                  placeholder="0"
                  autoFocus
                />
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[1000, 5000, 10000, 25000, 50000, 100000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setQuickAmount(amount.toString())}
                      className="py-3 px-4 bg-gray-100 hover:bg-[#98D8C8] hover:text-white rounded-xl transition-colors font-medium"
                    >
                      {amount.toLocaleString('ru-RU')} ₽
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => {
                    if (quickAmount && !isNaN(Number(quickAmount))) {
                      handleAddMoney(Number(quickAmount));
                      setShowQuickAdd(false);
                      setQuickAmount('');
                    }
                  }}
                  className="w-full py-4 bg-gradient-to-r from-[#98D8C8] to-[#7BC4B0] text-white font-semibold rounded-2xl hover:shadow-lg transition-all"
                >
                  Пополнить
                </button>
              </div>
            </div>
          )}

          {showFortune && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-3xl p-6 animate-fade-in shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">🔮</span>
                    <h3 className="text-2xl font-semibold text-white">Гадание</h3>
                  </div>
                  <button 
                    onClick={() => {
                      setShowFortune(false);
                      setSelectedCards([]);
                      setFortuneResult(null);
                    }}
                    className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                  >
                    <Icon name="X" size={24} className="text-white" />
                  </button>
                </div>

                {!fortuneResult ? (
                  <>
                    <p className="text-white/90 text-center mb-6">
                      Выберите 3 карты, чтобы узнать предсказание
                    </p>
                    
                    <div className="grid grid-cols-4 gap-3 mb-6">
                      {fortuneCards.map((card) => (
                        <button
                          key={card.id}
                          onClick={() => {
                            if (selectedCards.includes(card.id)) {
                              setSelectedCards(selectedCards.filter(id => id !== card.id));
                            } else if (selectedCards.length < 3) {
                              setSelectedCards([...selectedCards, card.id]);
                            }
                          }}
                          className={`aspect-square rounded-2xl transition-all ${
                            selectedCards.includes(card.id)
                              ? 'bg-white scale-95 shadow-lg'
                              : 'bg-white/20 backdrop-blur hover:bg-white/30 hover:scale-105'
                          }`}
                        >
                          <span className="text-4xl">{card.emoji}</span>
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        if (selectedCards.length === 3) {
                          const selected = fortuneCards.filter(c => selectedCards.includes(c.id));
                          const result = `${selected.map(c => c.meaning).join(' ')} 🌟`;
                          setFortuneResult(result);
                        }
                      }}
                      disabled={selectedCards.length < 3}
                      className={`w-full py-4 rounded-2xl font-semibold transition-all ${
                        selectedCards.length === 3
                          ? 'bg-white text-purple-600 hover:shadow-lg'
                          : 'bg-white/30 text-white/50 cursor-not-allowed'
                      }`}
                    >
                      {selectedCards.length === 3 ? 'Узнать предсказание' : `Выбрано ${selectedCards.length}/3`}
                    </button>
                  </>
                ) : (
                  <div className="text-center">
                    <div className="bg-white/20 backdrop-blur rounded-2xl p-6 mb-6">
                      <div className="flex justify-center gap-4 mb-4">
                        {fortuneCards
                          .filter(c => selectedCards.includes(c.id))
                          .map(card => (
                            <span key={card.id} className="text-5xl">{card.emoji}</span>
                          ))}
                      </div>
                      <p className="text-white text-lg font-medium leading-relaxed">
                        {fortuneResult}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setSelectedCards([]);
                        setFortuneResult(null);
                      }}
                      className="w-full py-4 bg-white text-purple-600 rounded-2xl font-semibold hover:shadow-lg transition-all"
                    >
                      Погадать еще раз
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

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

          <Card className="bg-white/90 backdrop-blur border-0 shadow-sm rounded-3xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-gray-900">История изменений</h2>
            </div>
            
            <div className="space-y-3">
              {balanceHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Icon name="History" size={48} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Изменений пока нет</p>
                </div>
              ) : (
                balanceHistory.map((entry) => (
                  <div 
                    key={entry.id}
                    className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      entry.type === 'add' ? 'bg-emerald-100' : 
                      entry.type === 'remove' ? 'bg-red-100' : 
                      'bg-blue-100'
                    }`}>
                      <Icon 
                        name={entry.type === 'add' ? 'Plus' : entry.type === 'remove' ? 'Minus' : 'Edit2'} 
                        size={20} 
                        className={
                          entry.type === 'add' ? 'text-emerald-600' : 
                          entry.type === 'remove' ? 'text-red-600' : 
                          'text-blue-600'
                        } 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">
                        {entry.type === 'add' ? 'Пополнение' : 
                         entry.type === 'remove' ? 'Снятие' : 
                         'Редактирование'}
                      </p>
                      <p className="text-xs text-gray-500">{entry.date}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {entry.previousBalance.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽ → {entry.newBalance.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className={`font-semibold ${
                        entry.type === 'add' ? 'text-emerald-600' : 
                        entry.type === 'remove' ? 'text-red-600' : 
                        'text-blue-600'
                      }`}>
                        {entry.type === 'add' ? '+' : entry.type === 'remove' ? '-' : ''}
                        {entry.amount.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card className="bg-white/90 backdrop-blur border-0 shadow-sm rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#98D8C8] to-[#7BC4B0] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">С</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">СберСпасибо</p>
                  <p className="text-sm text-[#98D8C8]">Подключить</p>
                </div>
              </div>
              <Icon name="ChevronRight" size={20} className="text-gray-400" />
            </div>
          </Card>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-200">
          <div className="max-w-md mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              {[
                { id: 'home', icon: 'Home', label: 'Главный' },
                { id: 'savings', icon: 'TrendingUp', label: 'Накопления' },
                { id: 'life', icon: 'Heart', label: 'Для жизни' },
                { id: 'payments', icon: 'ArrowRightLeft', label: 'Платежи' },
                { id: 'credits', icon: 'Wallet', label: 'Кредиты' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    activeTab === tab.id ? 'text-[#98D8C8]' : 'text-gray-500'
                  }`}
                >
                  <Icon name={tab.icon} size={24} />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;