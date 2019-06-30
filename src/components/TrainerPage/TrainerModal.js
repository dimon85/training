import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

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
          <DialogContentText>
            {open && (
              <ul>
                <li>Typed symbols: {typedCount}/{textLength} symb</li>
                <li>Typed errors: {errorsCount} symb</li>
                <li>Errors: {errorsPercent} %</li>
                <li>Speed: {speed} symb/min</li>
              </ul>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseModal} color="primary" autoFocus>
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