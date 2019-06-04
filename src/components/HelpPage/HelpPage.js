import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class HelpPage extends Component {
  static propTypes = {
  };

  static contextTypes = {
    currentLang: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };
  }

  render() {
    const { currentLang } = this.context;
    return (
      <div className="container landing">
        <h1>Help center</h1>
        <Link to={`/${currentLang}`} className="landing__control">на главную</Link>
      </div>
    );
  }
}
