import PropTypes from 'prop-types';
import React from 'react';

function CardGrid({ cards, flipped, matched, onCardClick }) {
  return (
    <div className="grid">
      {cards.map((card, index) => {
        const isFlipped = flipped.includes(index) || matched.includes(index);
        return (
          <div
            key={index}
            className={`card ${isFlipped ? 'flipped' : ''}`}
            onClick={() => onCardClick(index)}
          >
            {isFlipped ? card : '❓'}
          </div>
        );
      })}
    </div>
  );
}

CardGrid.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.string).isRequired,
  flipped: PropTypes.arrayOf(PropTypes.number).isRequired,
  matched: PropTypes.arrayOf(PropTypes.number).isRequired,
  onCardClick: PropTypes.func.isRequired
};

export default CardGrid;
