import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ErrorIcon from '@material-ui/icons/Error';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import ScheduleIcon from '@material-ui/icons/Schedule';

const TrainerModal = (props) => {
  const {
    textLength,
    typedCount,
    currentTime,
    errorsCount,
    errorsData,
    open,
    onCloseModal,
  } = props;

  const speed = Math.round(60 * (typedCount / ((currentTime) / 1000)));
  const errorsPercent = Math.round((errorsCount * 100) / textLength);

  console.log('errors data: ', errorsData);
  return (
    <div>
      <Dialog
        open={open}
        onClose={onCloseModal}
      >
        <DialogTitle>{'Info'}</DialogTitle>
        <DialogContent>
          {open && (
            <List>
              <ListItem>
                <ListItemIcon>
                  <KeyboardIcon />
                </ListItemIcon>
                <ListItemText>
                  Typed symbols: {typedCount}/{textLength} symb
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ErrorIcon />
                </ListItemIcon>
                <ListItemText>
                Typed errors: {errorsCount} symb
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ErrorIcon />
                </ListItemIcon>
                <ListItemText>
                  Errors: {errorsPercent} %
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
            </List>
          )}

        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            autoFocus
            onClick={onCloseModal}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

TrainerModal.propTypes = {
  textLength: PropTypes.number.isRequired,
  typedCount: PropTypes.number.isRequired,
  currentTime: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]).isRequired,
  errorsCount: PropTypes.number.isRequired,
  errorsData: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default TrainerModal;