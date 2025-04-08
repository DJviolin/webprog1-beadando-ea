import React, { useState } from 'react';
import './App.css';
import FlowerSelector from './components/FlowerSelector.jsx';

const flowers = [
  { type: 'Fehér', price: 500 },
  { type: 'Piros', price: 600 },
  { type: 'Rózsaszín', price: 550 }
];

function App() {
  const [selected, setSelected] = useState(flowers[0]);
  const [quantity, setQuantity] = useState(1);
  const total = selected.price * quantity;

  return (
    <div className="app-container">
      <h1>Törökszegfű rendelés</h1>

      <FlowerSelector
        options={flowers}
        selected={selected}
        onChange={setSelected}
      />

      <label>
        Darabszám:
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
        />
      </label>

      <p>Egységár: {selected.price} Ft</p>
      <h2>Végösszeg: {total} Ft</h2>
    </div>
  );
}

export default App;
