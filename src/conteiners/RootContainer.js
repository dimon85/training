import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import getRoutes from '../routes';

export default function RootContainer(props) {
  const { store, history } = props;
  const routes = getRoutes(store);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {routes}
      </ConnectedRouter>
    </Provider>
  );
}

RootContainer.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};