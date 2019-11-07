import React from 'react';
import PropTypes from 'prop-types';
import './indicator.css';

function Indicator({
  name, value,
}) {
  return (
    <p className="playerIndicator">
      {name}
      {' '}
      {value}
    </p>
  );
}

Indicator.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default Indicator;
