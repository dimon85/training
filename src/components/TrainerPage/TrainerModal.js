import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default function TrainerModal(props) {
  const {
    data,
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

  const speed = !isEmpty(data) && Math.round(60 * (data.typedText.length / ((data.currentTime) / 1000)));

  return (
    <div>
      <Dialog
        title="Dialog With Actions"
        actions={actions}
        modal
        open={open}
      >
        {!isEmpty(data) &&
          <ul>
            <li>Errors: {data.countErrors}</li>
            <li>Typed symbols: {data.typedText.length}</li>
            <li>Speed: {speed} symb/min</li>
          </ul>
        }
      </Dialog>
    </div>
  );
}

TrainerModal.propTypes = {
  data: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};