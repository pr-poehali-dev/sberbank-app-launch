import Icon from '@/components/ui/icon';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: 'home', icon: 'Home', label: 'Главная' },
    { id: 'payments', icon: 'CreditCard', label: 'Платежи' },
    { id: 'catalog', icon: 'Grid3x3', label: 'Каталог' },
    { id: 'services', icon: 'Package', label: 'Сервисы' },
    { id: 'profile', icon: 'User', label: 'Профиль' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-200">
      <div className="max-w-md mx-auto px-2 py-2">
        <div className="flex justify-around items-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                activeTab === tab.id 
                  ? 'bg-[#98D8C8]/10' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <Icon 
                name={tab.icon} 
                size={24} 
                className={activeTab === tab.id ? 'text-[#98D8C8]' : 'text-gray-500'}
              />
              <span className={`text-xs font-medium ${
                activeTab === tab.id ? 'text-[#98D8C8]' : 'text-gray-500'
              }`}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
