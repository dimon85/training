import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { hot } from 'react-hot-loader';
import LanguageContainer from './LanguageContainer';

const RootContainer = (props) => {
  const { store, history } = props;

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <LanguageContainer history={history} store={store} />
      </ConnectedRouter>
    </Provider>
  );
};

RootContainer.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default hot(module)(RootContainer);
