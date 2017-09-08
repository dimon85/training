import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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

  const actions = [
    <FlatButton
      label="Cancel"
      primary
      onTouchTap={onCloseModal}
    />,
    <FlatButton
      label="Submit"
      primary
      keyboardFocused
      onTouchTap={onCloseModal}
    />,
  ];

  const speed = Math.round(60 * (typedCount / ((currentTime) / 1000)));
  const errorsPercent = Math.round((errorsCount * 100) / textLength);

  console.log('errors data: ', errorsData);
  return (
    <div>
      <Dialog
        title="Dialog With Actions"
        actions={actions}
        modal
        open={open}
      >
        {open &&
          <ul>
            <li>Typed symbols: {typedCount}/{textLength} symb</li>
            <li>Typed errors: {errorsCount} symb</li>
            <li>Errors: {errorsPercent} %</li>
            <li>Speed: {speed} symb/min</li>
          </ul>
        }
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