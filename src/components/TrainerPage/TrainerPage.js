import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

export default class TrainerPage extends Component {
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
    console.log('TrainerPage render12');
    return (
      <div>
        <div>Trainer page</div>
        <Link to="/">Home</Link> -
      </div>
    )
  }
}
