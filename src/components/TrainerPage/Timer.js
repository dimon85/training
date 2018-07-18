import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';
import PauseIcon from 'material-ui/svg-icons/av/pause';
import { getDateFormattedUtc } from '../../selectors/dateSelectors';

const styles = {
  mediumIcon: {
    width: 34,
    height: 34,
  },
  medium: {
    width: 42,
    height: 42,
    padding: 0,
    top: -6,
  },
};

export default function Timer(props) {
  const {
    startTime,
    currentTime,
    isPaused,
    onPlay,
  } = props;

  const formattedTime = getDateFormattedUtc(currentTime, 'mm:ss');
  const percentTime = 100 - (((startTime - currentTime) / startTime) * 100);

  return (
    <div className="timer">
      <div className="timer__hours">
        {!isPaused && <h3>{formattedTime}</h3>}
        {isPaused &&
          <IconButton
            style={styles.medium}
            iconStyle={styles.mediumIcon}
            onClick={onPlay}
          >
            <PauseIcon />
          </IconButton>
        }
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
  isPaused: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
};