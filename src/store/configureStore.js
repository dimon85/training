import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducers'

export default function configureStore(history, data = {}) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  function listMiddleware() {
    if (process.env.NODE_ENV === 'dev') {
      return [
        thunk,
        reduxRouterMiddleware,
        reduxImmutableStateInvariant()
      ];
    }

    return [
      thunk,
      reduxRouterMiddleware,
    ];
  }

  const middleware = listMiddleware();

  let finalCreateStore;

  if (process.env.NODE_ENV === 'dev') {
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore);
  } else {
    finalCreateStore = compose(applyMiddleware(...middleware))(createStore);
  }

  const store = finalCreateStore(rootReducer, data);

  if (process.env.NODE_ENV === 'dev' && module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers')); // eslint-disable-line global-require
    });
  }

  return store;
}
