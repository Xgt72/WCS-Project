import React from 'react';
import PropTypes from 'prop-types';
import './indicator.css';

function Indicator({
  name, value,
}) {
  return (
    <div className="playerIndicator d-inline-block m-2">
      {name === "Reputation" &&
        <i className="fas fa-star">
          {' '}
          {value}
          {' '}
          <i className="fas fa-percentage"></i>
        </i>
      }
      {name === "Budget" &&
        <i className="fas fa-coins">
          {' '}
          {value}
          {' '}
          <i className="fas fa-euro-sign"></i>
        </i>
      }
      {name === "ActualStudentsNumber" &&
        <i className="fas fa-graduation-cap">
          {' '}
          {value}
        </i>
      }
      {name === "FutureStudentsNumber" &&
        <i className="fas fa-user-graduate">
          {' '}
          {value}
        </i>
      }
    </div>
  );
}

Indicator.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default Indicator;
