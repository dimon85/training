import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFoundPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <div className="container landing">
        <div className="landing__container">
          <h1 className="landing__title">Page not found</h1>
          <div className="landing__desc">We're sorry, we couldn't find the page you requested.</div>
        </div>
        <Link to="/en" className="landing__control">
          Go to home page
        </Link>
      </div>
    );
  }
}
