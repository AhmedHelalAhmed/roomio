//  Actions
const UPDATE_PAGINATION_ROOM = 'pagination/UPDATE_PAGINATION_ROOM';
const UPDATE_PAGINATION_HOME = 'pagination/UPDATE_PAGINATION_HOME';
const UPDATE_PAGINATION_TOPIC = 'pagination/UPDATE_PAGINATION_TOPIC';

const initialState = {
  rooms: {},
  topics: {},
  home: {
    page: 1,
    end: false,
    loading: false,
  },
};

//  Reducer
export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_PAGINATION_ROOM:
      return Object.assign({}, state, {
        rooms: {
          ...state.rooms,
          [payload.roomName]: {
            ...(state.rooms[payload.roomName] || {}),
            ...payload.pagination,
          },
        },
      });
    case UPDATE_PAGINATION_HOME:
      return Object.assign({}, state, {
        home: {
          ...state.home,
          ...payload.pagination,
        },
      });
    case UPDATE_PAGINATION_TOPIC:
      return Object.assign({}, state, {
        topics: {
          ...state.topics,
          [payload.topicRef]: {
            ...(state.topics[payload.topicRef] || {}),
            ...payload.pagination,
          },
        },
      });
    default:
      return state;
  }
}

//  Action Creators
export const updateRoomPagination = (roomName, pagination) => ({
  type: UPDATE_PAGINATION_ROOM,
  payload: { roomName, pagination },
});

export const updateTopicPagination = (topicRef, pagination) => ({
  type: UPDATE_PAGINATION_TOPIC,
  payload: { topicRef, pagination },
});

export const updateHomePagination = pagination => ({
  type: UPDATE_PAGINATION_HOME,
  payload: { pagination },
});
