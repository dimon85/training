import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class HomePage extends PureComponent {
  static contextTypes = {
    currentLang: PropTypes.string.isRequired,
    translates: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    const {
      currentLang,
      translates,
    } = this.context;

    return (
      <div className="container landing">
        <div className="landing__container">
          <h1 className="landing__title">Тренируйся с удовольствием</h1>
          <div className="landing__desc">Развивай внимание и скорость набора с помощью онлайн-тренажеров</div>
        </div>
        <Link to={`/${currentLang}/trainer`} className="landing__control">
          {translates.letsStart}
        </Link>
      </div>
    );
  }
}
