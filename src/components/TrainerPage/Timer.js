import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import { getDateFormattedUtc } from '../../selectors/dateSelectors';


const useStyles = makeStyles(() => ({
  button: {
    // width: 34,
    // height: 34,
  },
}));



export default function Timer(props) {
  const {
    startTime,
    currentTime,
    isPaused,
    onPlay,
  } = props;

  const formattedTime = getDateFormattedUtc(currentTime, 'mm:ss');
  const percentTime = 100 - (((startTime - currentTime) / startTime) * 100);

  const classes = useStyles();

  const handlePlay = () => {
    console.log('click', );
  }

  console.log('useStyles', classes);

  return (
    <div className="timer">
      <div className="timer__hours">
        {isPaused && <h3>{formattedTime}</h3>}
        {!isPaused && (
          <IconButton
            aria-label="Pause"
            className={classes.button}
            onClick={handlePlay}
          >
            <PauseIcon />
          </IconButton>
        )}
      </div>
      <div className="timer__circular">
        <CircularProgress
          mode="determinate"
          variant="static"
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