import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import { getDateFormattedUtc } from '../../selectors/dateSelectors';

export default function Timer(props) {
  const {
    startTime,
    currentTime,
  } = props;

  const formattedTime = getDateFormattedUtc(currentTime, 'mm:ss');
  const percentTime = 100 - ((startTime - currentTime) / startTime * 100);

  return (
    <div className="timer">
      <div className="timer__hours">
        <h3>{formattedTime}</h3>
      </div>
      <div className="timer__circular">
        <CircularProgress
          mode="determinate"
          value={percentTime}
          size={100}
          thickness={9}
        />
      </div>
    </div>
  );
}

Timer.propTypes = {
  startTime: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
};