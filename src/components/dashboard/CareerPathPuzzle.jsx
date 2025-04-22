import React, { useState, useEffect } from 'react';

const CareerMatch = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);

  const careerPairs = [
    { id: 1, emoji: '👨‍💻', career: 'Tecnología' },
    { id: 2, emoji: '🎨', career: 'Diseño' },
    { id: 3, emoji: '🔬', career: 'Ciencias' },
    { id: 4, emoji: '📚', career: 'Educación' },
  ];

  useEffect(() => {
    const shuffledCards = [...careerPairs, ...careerPairs]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, uniqueId: index }));
    setCards(shuffledCards);
  }, []);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].id === cards[second].id) {
        setMatched([...matched, first, second]);
        setScore(s => s + 10);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="mt-6 border-2 border-[#87C232] rounded-lg p-4">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-gray-700">Descubre tu Vocación 🎯</h3>
        <p className="text-sm text-gray-500">Puntos: {score}</p>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {cards.map((card, index) => (
          <button
            key={card.uniqueId}
            onClick={() => handleCardClick(index)}
            className={`aspect-square rounded-lg transition-all duration-300 transform 
              ${flipped.includes(index) || matched.includes(index)
                ? 'bg-[#9CE840] rotate-0'
                : 'bg-gray-100 rotate-180'} 
              ${matched.includes(index) ? 'opacity-70' : 'hover:scale-105'}`}
          >
            <div className="flex flex-col items-center justify-center h-full">
              {(flipped.includes(index) || matched.includes(index)) && (
                <>
                  <span className="text-xl">{card.emoji}</span>
                  <span className="text-xs mt-1">{card.career}</span>
                </>
              )}
            </div>
          </button>
        ))}
      </div>

      {matched.length === cards.length && (
        <div className="text-center p-2 bg-[#E8F5E9] rounded-lg">
          <p className="text-sm text-[#87C232]">¡Felicitaciones! Has descubierto todas las carreras</p>
        </div>
      )}
    </div>
  );
};

export default CareerMatch;