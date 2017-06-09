import { applyMiddleware, compose, createStore as _createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../redux';

export default function createStore(data) {
  // Sync dispatched route actions to the history

  function listMiddleware() {
    if (process.env.NODE_ENV === 'dev') {
      return [
        thunk,
      ];
    }

    return [
      thunk
    ];
  }

  const middleware = listMiddleware();

  let finalCreateStore;

  if (process.env.NODE_ENV === 'dev') {
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )(_createStore);
  } else {
    finalCreateStore = compose(applyMiddleware(...middleware))(_createStore);
  }

  const store = finalCreateStore(rootReducer, data);


  if (process.env.NODE_ENV === 'dev' && module.hot) {
    module.hot.accept('../redux', () => {
      store.replaceReducer(require('../redux')); // eslint-disable-line global-require
    });
  }

  return store;
}
