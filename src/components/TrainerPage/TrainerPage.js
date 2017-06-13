import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TrainerType from './TrainerType';

export default class TrainerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: true,
    };
  }

  @autobind
  handleClickStart() {
    this.setState({ start: true });
  }

  render() {
    const { start } = this.state;

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
          {start && <TrainerType />}
        </Paper>
      </div>
    );
  }
}
