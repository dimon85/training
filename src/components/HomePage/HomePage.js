import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

export default class HomePage extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
    };
  }

  render() {
    const { toggle } = this.state;

    return (
      <div>
        <div>Header</div>
        <RaisedButton label="Default" />
      </div>
    )
  }
}
