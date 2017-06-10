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
    console.log('HomePage render12');
    return (
      <div>
        <div>Home page</div>
        <Link to="/trainer">Link</Link> -
        <Link to="/miss">miss</Link>
        <RaisedButton label="Default" />
      </div>
    )
  }
}
