import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HelpPage extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };
  }

  render() {
    return (
      <div>
        <div>Help page</div>
        <Link to="/">Home</Link> -
      </div>
    );
  }
}
