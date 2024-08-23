import React, { useState, useEffect } from 'react';
import { Shuffle } from 'lucide-react';

const cardEmojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...cardEmojis, ...cardEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji }));
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
  };

  const handleCardClick = (id) => {
    if (disabled) return;
    setFlipped((flipped) => [...flipped, id]);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      setDisabled(true);
      const [first, second] = flipped;
      if (cards[first].emoji === cards[second].emoji) {
        setSolved((solved) => [...solved, first, second]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  }, [flipped, cards]);

  const isFlipped = (id) => flipped.includes(id) || solved.includes(id);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Memory Card Game</h1>
      <button
        onClick={initializeGame}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
      >
        <Shuffle className="mr-2" /> Shuffle and Restart
      </button>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`h-24 flex items-center justify-center text-4xl cursor-pointer ${
              isFlipped(card.id)
                ? 'bg-white'
                : 'bg-blue-500 hover:bg-blue-600'
            } rounded-lg transition-colors`}
          >
            {isFlipped(card.id) ? card.emoji : '?'}
          </div>
        ))}
      </div>
      {solved.length === cardEmojis.length * 2 && (
        <div className="mt-4 text-2xl font-bold text-green-600">
          Congratulations! You've won!
        </div>
      )}
    </div>
  );
};

export default MemoryGame;