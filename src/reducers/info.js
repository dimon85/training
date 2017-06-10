import isFunction from 'lodash/isFunction';
import flowRight from 'lodash/flowRight';

export const LOAD = 'redux-ducks/info/LOAD';
export const LOAD_SUCCESS = 'redux-ducks/info/LOAD_SUCCESS';
export const LOAD_FAIL = 'redux-ducks/info/LOAD_FAIL';
export const SET_STATUS_PAGE = 'redux-ducks/info/SET_STATUS_PAGE';
export const SET_DEFAULT = 'redux-ducks/info/SET_DEFAULT';

const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: null,
  page: {
    status: 200,
    text: '',
  }
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

export function setStatusPage(data) {
  return {
    type: SET_STATUS_PAGE,
    data,
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

const updateInfo = action => state => ({
  ...state,
  data: action.result,
});

const updateRequestOnLoadFail = (action, value) => state => ({
  ...state,
  loading: value,
  loaded: value,
  data: {},
  error: action.error
});

const setStatusPageSuccess = action => state => ({
  ...state,
  page: action.data
});

const setDefaultSuccess = () => initialState;

const actionsLookup = {
  [LOAD]: state => updateRequestOnLoad(true)(state),
  [LOAD_SUCCESS]: (state, action) => flowRight(
    updateRequestOnLoadSuccess(false),
    updateInfo(action),
  )(state),
  [LOAD_FAIL]: (state, action) => updateRequestOnLoadFail(action, false)(state),
  [SET_STATUS_PAGE]: (state, action) => setStatusPageSuccess(action)(state),
  [SET_DEFAULT]: () => setDefaultSuccess(),
};

export default function reducer(state = initialState, action) {
  if (isFunction(actionsLookup[action.type])) return actionsLookup[action.type](state, action);

  return state;
}
