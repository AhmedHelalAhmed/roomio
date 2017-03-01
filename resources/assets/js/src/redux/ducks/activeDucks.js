//  Actions
const UPDATE_ACTIVE_ROOM   = 'active/UPDATE_ACTIVE_ROOM';
const UPDATE_ACTIVE_TOPIC   = 'active/UPDATE_ACTIVE_TOPIC';

//  Initial State
const initialState = {
  room: null,
  topic: null
};

//  Reducer
export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_ACTIVE_ROOM:
      return Object.assign({}, state, {
        room: payload.roomName
      });
    case UPDATE_ACTIVE_TOPIC:
      return Object.assign({}, state, {
        topic: payload.topicRef
      });
    default:
      return state;
  }
}

//  Action Creators
export const updateActiveRoom = (roomName) => {
  return { type: UPDATE_ACTIVE_ROOM, payload: { roomName } };
};

export const updateActiveTopic = (topicRef) => {
  return { type: UPDATE_ACTIVE_TOPIC, payload: { topicRef } };
};