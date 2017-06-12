import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import info from './info';

const rootReducer = combineReducers({
  router: routerReducer,
  info,
});

export default rootReducer;

