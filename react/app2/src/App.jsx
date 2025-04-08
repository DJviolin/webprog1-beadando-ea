import React, { useState, useEffect } from 'react';
import './App.css';

const initialCards = ['🌸', '🌼', '🌺', '🌻', '🌸', '🌼', '🌺', '🌻'].sort(() => 0.5 - Math.random());

function App() {
  const [cards, setCards] = useState(initialCards);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  const handleFlip = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    setFlipped([...flipped, index]);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  }, [flipped, cards, matched]);

  return (
    <div className="app-container">
      <h1>Törökszegfű memóriajáték</h1>
      <div className="grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${flipped.includes(index) || matched.includes(index) ? 'flipped' : ''}`}
            onClick={() => handleFlip(index)}
          >
            {flipped.includes(index) || matched.includes(index) ? card : '❓'}
          </div>
        ))}
      </div>
      {matched.length === cards.length && <h2>Gratulálok, megtaláltál minden párt!</h2>}
    </div>
  );
}

export default App;
