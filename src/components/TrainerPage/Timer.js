import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import Box from '@material-ui/core/Box';
import { blue } from '@material-ui/core/colors';
import orange from '@material-ui/core/colors/orange';
import { getDateFormattedUtc } from '../../selectors/dateSelectors';

const useStyles = makeStyles({
  main: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 0',
  },
  timer: {
    position: 'absolute',
    top: '25px',
    zIndex: 1,
  },
  time: {
    padding: '10px 0',
    fontSize: '20px',
  },
  progress: {
    color: (time) => {
      if (time > 90) {
        return orange[500];
      }
      
      if (time > 50) {
        return blue[300];
      }

      return blue;
    },
  },
});


const Timer = (props) => {
  const {
    startTime,
    currentTime,
    isPaused,
    onPlay,
  } = props;
  const percentTime = (100 - (((startTime - currentTime) / startTime) * 100)) || 1;
  const classes = useStyles(percentTime);

  const formattedTime = getDateFormattedUtc(currentTime, 'mm:ss');

  return (
    <Box className={classes.main}>
      <Box className={classes.timer}>
        {!isPaused && (
          <Box
            className={classes.time}
          >
            {formattedTime}
          </Box>
        )}
        {isPaused && (
          <IconButton
            onClick={onPlay}
          >
            <PauseIcon />
          </IconButton>
        )}
      </Box>
      <div className="timer__circular">
        <CircularProgress
          className={classes.progress}
          variant="static"
          size={80}
          thickness={4}
          value={percentTime}
        />
      </div>
    </Box>
  );
}

Timer.propTypes = {
  startTime: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  isPaused: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
};

export default Timer;
