import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
      <div className="container">
        <h1>Home page</h1>
        <div>Some text</div>
      </div>
    )
  }
}
