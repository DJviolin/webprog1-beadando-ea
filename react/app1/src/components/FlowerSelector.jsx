import PropTypes from 'prop-types';
import React from 'react';

function FlowerSelector({ options, selected, onChange }) {
  return (
    <label>
      Válassz típust:
      <select
        value={selected.type}
        onChange={e => onChange(options.find(f => f.type === e.target.value))}
      >
        {options.map(f => (
          <option key={f.type} value={f.type}>{f.type}</option>
        ))}
      </select>
    </label>
  );
}

FlowerSelector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })
  ).isRequired,
  selected: PropTypes.shape({
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

export default FlowerSelector;
