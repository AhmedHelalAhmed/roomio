//  Actions
const START_LOADING = 'isLoaded/START';
const STOP_LOADING = 'isLoaded/STOP';
const START_LOADING_HOME = 'isLoaded/START_LOADING_HOME';
const STOP_LOADING_HOME = 'isLoaded/STOP_LOADING_HOME';

const initialState = {
  rooms: {},
  topics: {},
  home: false,
};

//  Reducer
export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case START_LOADING_HOME:
      return Object.assign({}, state, { home: false });
    case STOP_LOADING_HOME:
      return Object.assign({}, state, { home: true });
    case START_LOADING:
      return Object.assign({}, state, {
        [payload.type]: {
          ...state[payload.type],
          [payload.identifier]: false,
        },
      });
    case STOP_LOADING:
      return Object.assign({}, state, {
        [payload.type]: {
          ...state[payload.type],
          [payload.identifier]: true,
        },
      });
    default:
      return state;
  }
}

export const startLoadingHome = () => {
  return { type: START_LOADING_HOME };
};

export const stopLoadingHome = () => {
  return { type: STOP_LOADING_HOME };
};

//  Action Creators
export const startLoadingRoom = (roomName) => {
  return {
    type: START_LOADING,
    payload: {
      type: 'rooms',
      identifier: roomName
    }
  };
};

export const stopLoadingRoom = (roomName) => {
  return {
    type: STOP_LOADING,
    payload: {
      type: 'rooms',
      identifier: roomName
    }
  };
};

export const startLoadingTopic = (topicRef) => {
  return {
    type: START_LOADING,
    payload: {
      type: 'topics',
      identifier: topicRef
    }
  };
};

export const stopLoadingTopic = (topicRef) => {
  return {
    type: STOP_LOADING,
    payload: {
      type: 'topics',
      identifier: topicRef
    }
  };
};

