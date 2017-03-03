//  Actions
const START_LOADING = 'isLoaded/START';
const STOP_LOADING = 'isLoaded/STOP';

// //  Initial State
// const initialState = {
//   room: true,
//   topic: true,
// };

const initialState = {
  rooms: {},
  topics: {},
};

//  Reducer
export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
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

