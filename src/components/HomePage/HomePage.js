import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
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
          <h1 className="landing__title">Тренируйся с удовольствием</h1>
          <div className="landing__desc">Развивай внимание и скорость набора с помощью онлайн-тренажеров</div>
        </div>
        <Link to="/trainer" className="landing__control">
          Начать тренировку
        </Link>
      </div>
    );
  }
}
