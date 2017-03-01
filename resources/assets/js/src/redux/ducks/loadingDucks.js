//  Actions
const START_LOADING = 'loading/START';
const STOP_LOADING = 'loading/STOP';

//  Initial State
const initialState = {
  room: true,
  topic: true,
};

//  Reducer
export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case START_LOADING:
      return Object.assign({}, state, {
        [payload.key]: true,
      });
    case STOP_LOADING:
      return Object.assign({}, state, {
        [payload.key]: false,
      });
    default:
      return state;
  }
}

//  Action Creators
export const startLoading = (key) => {
  return { type: START_LOADING, payload: { key } };
};

export const stopLoading = (key) => {
  return { type: STOP_LOADING, payload: { key } };
};