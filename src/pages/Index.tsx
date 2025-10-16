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
                        setBalance(Number(editValue));
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
            {quickActions.map((action) => (
              <Card 
                key={action.id}
                className="bg-white/90 backdrop-blur border-0 shadow-sm p-6 flex flex-col items-center justify-center hover:shadow-md transition-all cursor-pointer rounded-3xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
                  <Icon name={action.icon} size={28} className="text-gray-900" />
                </div>
                <span className="text-sm font-medium text-gray-900">{action.label}</span>
              </Card>
            ))}
          </div>

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
              <h2 className="text-xl font-semibold text-gray-900">История</h2>
              <Button variant="ghost" size="sm" className="text-[#98D8C8] hover:text-[#7BC4B0] hover:bg-[#98D8C8]/10">
                Все
              </Button>
            </div>
            
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div 
                  key={transaction.id}
                  className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Icon name={transaction.icon} size={20} className="text-gray-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{transaction.name}</p>
                    <p className="text-xs text-gray-500">{transaction.date} • {transaction.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-gray-900">{transaction.amount.toFixed(2)} ₽</p>
                  </div>
                </div>
              ))}
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