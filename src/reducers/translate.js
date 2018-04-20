
import isFunction from 'lodash/isFunction';
import flowRight from 'lodash/flowRight';
import cookieHelper from '../helpers/cookieHelper';

const LOAD = 'redux-ducks/localization/LOAD';
const LOAD_SUCCESS = 'redux-ducks/localization/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-ducks/localization/LOAD_FAIL';
const EDIT_STOP = 'redux-ducks/localization/EDIT_STOP';
const SAVE = 'redux-ducks/localization/SAVE';
const SAVE_SUCCESS = 'redux-ducks/localization/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-ducks/localization/SAVE_FAIL';

const initialState = {
  loaded: false,
  data: {
    type: 'en',
    translations: {}
  },
  langs: ['en', 'ru', 'ua'],
};

function saveLocale(locale) {
  cookieHelper.save('locale', locale);
}

export function getLocale() {
  const locale = cookieHelper.get('locale');

  return locale || 'en';
}

export function isLoaded(globalState) {
  return globalState.localization && globalState.localization.loaded;
}

export function load(locale) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get(`/fapi/localization?lang=${locale}`)
  };
}

export function save(widget) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: widget.id,
    promise: client => client.post('/fapi/localization/update', {
      data: widget
    })
  };
}

export function updateLang(type) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get(`/fapi/localization?lang=${type}`)
  };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
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

const updateLocalization = action => (state) => {
  saveLocale(action.result.type);

  const langs = action.result.type !== 'ru' ? ['en', 'nl'] : ['ru'];

  return {
    ...state,
    data: action.result,
    langs
  };
};

const updateRequestOnLoadFail = (action, value) => state => ({
  ...state,
  loading: false,
  loaded: value,
  data: {},
  error: action.error
});

const editStopSuccess = action => state => ({
  ...state,
  editing: {
    ...state.editing,
    [action.id]: false,
  }
});

const updateRequestOnSave = state => ({
  ...state, // 'saving' flag handled by redux-form
});

const updateRequestOnSaveSuccess = action => (state) => {
  const data = [...state.data];
  data[action.result.id - 1] = action.result;

  return {
    ...state,
    data,
    editing: {
      ...state.editing,
      [action.id]: false
    },
    saveError: {
      ...state.saveError,
      [action.id]: null
    }
  };
};

const updateRequestOnSaveFail = action => (state) => {
  if (typeof action.error === 'string') {
    return {
      ...state,
      saveError: {
        ...state.saveError,
        [action.id]: action.error
      }
    };
  }

  return state;
};

const actionsLookup = {
  [LOAD]: state => updateRequestOnLoad(true)(state),
  [LOAD_SUCCESS]: (state, action) => flowRight(
    updateRequestOnLoadSuccess(false),
    updateLocalization(action),
  )(state),
  [LOAD_FAIL]: (state, action) => updateRequestOnLoadFail(action, false)(state),
  [EDIT_STOP]: (state, action) => editStopSuccess(action)(state),
  [SAVE]: state => updateRequestOnSave()(state),
  [SAVE_SUCCESS]: (state, action) => updateRequestOnSaveSuccess(action)(state),
  [SAVE_FAIL]: (state, action) => updateRequestOnSaveFail(action)(state),
};

export default function reducer(state = initialState, action) {
  if (isFunction(actionsLookup[action.type])) return actionsLookup[action.type](state, action);

  return state;
}
