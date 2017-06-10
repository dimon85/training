import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

export default class TrainerType extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
      start: false,
    };
  }

  render() {
    const { start } = this.state;

    return (
      <div className="container">
        <h1>Trainer page</h1>
        <Paper zDepth={2}>
          <div className="paper__area">
            <div className="paper__header">
              <h3>Type text</h3>
            </div>
            <div className="paper__body">
              <div className="paper__type">
                <div>1</div>
                <div>2</div>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    )
  }
}
