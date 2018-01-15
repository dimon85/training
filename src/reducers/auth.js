import isFunction from 'lodash/isFunction';
import flowRight from 'lodash/flowRight';

export const LOAD = 'redux-ducks/auth/LOAD';
export const LOAD_SUCCESS = 'redux-ducks/auth/LOAD_SUCCESS';
export const LOAD_FAIL = 'redux-ducks/auth/LOAD_FAIL';
export const SET_STATUS_PAGE = 'redux-ducks/auth/SET_STATUS_PAGE';
export const SET_DEFAULT = 'redux-ducks/auth/SET_DEFAULT';

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  current: {
    type: 'guest',
  },
};

export function isLoaded(globalState) {
  return globalState.info && globalState.info.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('/loadInfo')
  };
}

export function setDefault() {
  return {
    type: SET_DEFAULT
  };
}

const updateRequestOnLoad = value => state => ({
  ...state,
  loading: value
});

const updateRequestOnLoadSuccess = value => state => ({
  ...state,
  loading: value,
  loaded: true,
  error: null
});

const update = action => state => ({
  ...state,
  current: action.result,
});

const updateRequestOnLoadFail = (action, value) => state => ({
  ...state,
  loading: value,
  loaded: value,
  current: {
    type: 'guest',
  },
  error: action.error
});

const setDefaultSuccess = () => initialState;

const actionsLookup = {
  [LOAD]: state => updateRequestOnLoad(true)(state),
  [LOAD_SUCCESS]: (state, action) => flowRight(
    updateRequestOnLoadSuccess(false),
    update(action),
  )(state),
  [LOAD_FAIL]: (state, action) => updateRequestOnLoadFail(action, false)(state),
  [SET_DEFAULT]: () => setDefaultSuccess(),
};

export default function reducer(state = initialState, action) {
  if (isFunction(actionsLookup[action.type])) return actionsLookup[action.type](state, action);

  return state;
}