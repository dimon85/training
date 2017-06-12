import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

export default class RootContainer extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  render() {
    const { store, history } = this.props;
    const getRoutes = require('../routes').default;
    const routes = getRoutes(store);

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {routes}
        </ConnectedRouter>
      </Provider>
    );
  }
}