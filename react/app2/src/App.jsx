import React, { useState, useEffect } from 'react';
import './App.css';
import CardGrid from './components/CardGrid';

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

      <CardGrid
        cards={cards}
        flipped={flipped}
        matched={matched}
        onCardClick={handleFlip}
      />

      {matched.length === cards.length && <h2>Gratulálok, megtaláltál minden párt!</h2>}
    </div>
  );
}

export default App;
