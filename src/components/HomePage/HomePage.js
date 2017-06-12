import React, { Component } from 'react';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };
  }

  render() {
    return (
      <div className="container">
        <h1>Home page</h1>
        <div>Some textf</div>
      </div>
    );
  }
}
