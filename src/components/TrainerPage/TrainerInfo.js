import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ErrorIcon from '@material-ui/icons/Error';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  mainPaper: {
    padding: '20px',
    marginTop: '30px',
  },
});


function TrainerInfo(props) {
  const classes = useStyles();
  const {
    typedCount,
    currentTime,
    textLength,
    errorsCount,
  } = props;

  const speed = !!currentTime && Math.round(60 * (typedCount / ((currentTime) / 1000)));
  const errorsPercent = ((errorsCount * 100) / textLength).toFixed(2);

  return (
    <Paper className={classes.mainPaper}>
      <div>
        <Typography
          variant="h5"
        >
          {'Main info'}
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <KeyboardIcon />
            </ListItemIcon>
            <ListItemText>
              Typed: {typedCount}/{textLength} symb
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <ScheduleIcon />
            </ListItemIcon>
            <ListItemText>
              Speed: {speed} symb/min
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <ErrorIcon />
            </ListItemIcon>
            <ListItemText>
              Errors: {errorsCount} symb ({errorsPercent} %)
            </ListItemText>
          </ListItem>

        </List>
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