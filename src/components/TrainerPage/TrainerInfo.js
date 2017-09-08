import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

function TrainerInfo(props) {
  const {
    typedCount,
    currentTime,
    textLength,
    errorsCount,
  } = props;

  const speed = !!currentTime && Math.round(60 * (typedCount / ((currentTime) / 1000)));
  const errorsPercent = ((errorsCount * 100) / textLength).toFixed(2);

  return (
    <Paper zDepth={4} className="info">
      <div >
        <h4 className="info__header">Info</h4>
        <ul className="info__list">
          <li>Typed: {typedCount}/{textLength} symb</li>
          <li>Errors: {errorsCount} symb ({errorsPercent} %)</li>
          <li>Speed: {speed} symb/min</li>
        </ul>
      </div>
    </Paper>
  );
}

TrainerInfo.propTypes = {
  textLength: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  typedCount: PropTypes.number.isRequired,
  errorsCount: PropTypes.number.isRequired,
};

export default TrainerInfo;