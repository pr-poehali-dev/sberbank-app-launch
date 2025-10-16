import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

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
            <button className="w-12 h-12 rounded-full bg-white/80 backdrop-blur flex items-center justify-center">
              <Icon name="User" size={24} className="text-gray-700" />
            </button>
            <div className="flex gap-2">
              <button className="w-12 h-12 rounded-full bg-white/80 backdrop-blur flex items-center justify-center">
                <Icon name="Moon" size={24} className="text-gray-700" />
              </button>
              <button className="w-12 h-12 rounded-full bg-white/80 backdrop-blur flex items-center justify-center">
                <Icon name="Grid3x3" size={24} className="text-gray-700" />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-1">В кошельке</p>
            <div className="flex items-center gap-3">
              <h1 className="text-5xl font-semibold text-gray-900">100 000,00 ₽</h1>
              <button className="p-2">
                <Icon name="Eye" size={24} className="text-gray-600" />
              </button>
              <button className="p-2">
                <Icon name="MoreHorizontal" size={24} className="text-gray-600" />
              </button>
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