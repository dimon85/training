import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

export default function TrainerModal(props) {
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
        title="Dialog With Actions"
        open={open}
        onClose={onCloseModal}
      >
        <DialogTitle id="alert-dialog-title">Results</DialogTitle>
        <DialogContent>
          {open && (
            <ul>
              <li>Typed symbols: {typedCount}/{textLength} symb</li>
              <li>Typed errors: {errorsCount} symb</li>
              <li>Errors: {errorsPercent} %</li>
              <li>Speed: {speed} symb/min</li>
            </ul>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={onCloseModal} color="primary" autoFocus>
            Submit
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