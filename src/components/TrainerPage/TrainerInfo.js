import React from 'react';
import PropTypes from 'prop-types';


function TrainerInfo(props) {
  const { countErrors } = props;

  return (
    <div>
      <h3>Info</h3>
      <span>Typed: 30 char</span>
      <span>Speed: 280 ch/s</span>
      <span>Count Errors: {countErrors} char</span>
    </div>
  );
}

TrainerInfo.propTypes = {
  countErrors: PropTypes.number,
};

export default TrainerInfo;