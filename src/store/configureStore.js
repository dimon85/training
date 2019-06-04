import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducers';

export default function configureStore(history, data = {}) {
  // Sync dispatched route actions to the history

  function listMiddleware() {
    if (process.env.NODE_ENV === 'dev') {
      return [
        thunk,
        reduxImmutableStateInvariant()
      ];
    }

    return [
      thunk,
    ];
  }

  const middleware = listMiddleware();

  let finalCreateStore;

  if (process.env.NODE_ENV === 'dev') {
    // eslint-disable-next-line
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    finalCreateStore = composeEnhancers(applyMiddleware(...middleware))(createStore);
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
