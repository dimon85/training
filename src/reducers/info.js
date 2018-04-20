import isFunction from 'lodash/isFunction';

export const SET_STATUS_PAGE = 'redux-ducks/info/SET_STATUS_PAGE';
export const SET_DEFAULT = 'redux-ducks/info/SET_DEFAULT';

const initialState = {
  page: {
    status: 200,
    msg: '',
  }
};

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

const setStatusPageSuccess = action => state => ({
  ...state,
  page: {
    ...action.data,
  }
});

const setDefaultSuccess = () => initialState;

const actionsLookup = {
  [SET_STATUS_PAGE]: (state, action) => setStatusPageSuccess(action)(state),
  [SET_DEFAULT]: () => setDefaultSuccess(),
};

export default function reducer(state = initialState, action) {
  if (isFunction(actionsLookup[action.type])) return actionsLookup[action.type](state, action);

  return state;
}
