import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

export default class HomePage extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
    console.log('HomePage render12');
    this.state = {
      toggle: false,
    };
  }

  render() {
    const { toggle } = this.state;
    console.log('HomePage render12');
    return (
      <div>
        <div>Header homepage</div>
        <RaisedButton label="Default" />
      </div>
    )
  }
}
