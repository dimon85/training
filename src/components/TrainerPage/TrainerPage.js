import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TrainerType from './TrainerType';
import TrainerModal from './TrainerModal';

export default class TrainerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: true,
      openModal: false,
      data: {}
    };
  }

  @autobind
  handleClickStart() {
    this.setState({ start: true });
  }

  @autobind
  handleOpenModal(data) {
    this.setState({ openModal: true, data });
  }

  @autobind
  handleCloseModal() {
    this.setState({ openModal: false, start: false});
  }

  render() {
    const { start, data, openModal } = this.state;

    return (
      <div className="container">
        <h1>Training your ability</h1>
        <Paper zDepth={4}>
          {!start &&
            <div className="paper__area">
              <div className="paper__header">
                <h3>Press button to start</h3>
              </div>
              <div className="paper__body">
                <RaisedButton
                  label="Start"
                  primary={Boolean(true)}
                  fullWidth={Boolean(true)}
                  onTouchTap={this.handleClickStart}
                />
              </div>
            </div>
          }
          {start &&
            <TrainerType
              onOpenModal={this.handleOpenModal}
            />
          }
        </Paper>
        <TrainerModal
          open={openModal}
          data={data}
          onCloseModal={this.handleCloseModal}
        />
      </div>
    );
  }
}
