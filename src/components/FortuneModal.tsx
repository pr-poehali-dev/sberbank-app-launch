import Icon from '@/components/ui/icon';

interface FortuneCard {
  id: number;
  emoji: string;
  name: string;
  number: number;
}

interface FortuneModalProps {
  show: boolean;
  onClose: () => void;
  fortuneCards: FortuneCard[];
  selectedCards: number[];
  fortuneResult: string | null;
  onDrawCards: () => void;
}

export const FortuneModal = ({ 
  show, 
  onClose, 
  fortuneCards, 
  selectedCards, 
  fortuneResult,
  onDrawCards 
}: FortuneModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gradient-to-br from-purple-600 to-purple-800 rounded-[2rem] p-6 animate-fade-in shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Icon name="Sparkles" size={28} className="text-yellow-300" />
            <h3 className="text-2xl font-bold text-white">Гадание на картах</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <Icon name="X" size={24} className="text-white" />
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-3xl p-5 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Icon name="Phone" size={24} className="text-white" />
            <div>
              <p className="text-white/80 text-sm">Записаться на сеанс</p>
              <a href="tel:+79069606037" className="text-xl font-bold text-white hover:text-yellow-300 transition-colors">
                +7 906 960-60-37
              </a>
            </div>
          </div>
        </div>

        {selectedCards.length === 0 ? (
          <div className="text-center">
            <div className="mb-8">
              <img 
                src="https://cdn.poehali.dev/files/e9da8219-e974-4603-9f81-1bf75dbe788e.png" 
                alt="Карты гадания" 
                className="w-full max-w-sm rounded-3xl shadow-2xl mb-6 mx-auto"
              />
            </div>
            <p className="text-white/90 text-lg mb-8 max-w-xs mx-auto">
              Сконцентрируйтесь на своём вопросе и вытяните карты
            </p>
            <button
              onClick={onDrawCards}
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 font-bold text-lg rounded-2xl hover:shadow-xl transition-all"
            >
              Вытянуть карты
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {selectedCards.map((cardIndex, index) => {
                const card = fortuneCards[cardIndex];
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 shadow-xl transform hover:scale-105 transition-transform animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-3">{card.emoji}</div>
                      <div className="text-3xl font-bold text-purple-600 mb-2">{card.number}</div>
                      <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{card.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-3xl p-5 mb-4">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={24} className="text-yellow-300 flex-shrink-0 mt-1" />
                <p className="text-white/90 text-sm leading-relaxed">
                  {fortuneResult}
                </p>
              </div>
            </div>

            <button
              onClick={onDrawCards}
              className="w-full py-4 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-2xl transition-all backdrop-blur"
            >
              Вытянуть снова
            </button>
          </div>
        )}

        <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 backdrop-blur rounded-2xl p-4 border border-yellow-300/30 mt-6">
          <div className="flex items-center gap-3">
            <Icon name="Star" size={20} className="text-yellow-300" />
            <p className="text-white/90 text-sm">
              Профессиональное гадание • Опытный мастер • Точные предсказания
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
