//  Actions
const UPDATE_ACTIVE_ROOM = 'active/UPDATE_ACTIVE_ROOM';
const UPDATE_ACTIVE_TOPIC = 'active/UPDATE_ACTIVE_TOPIC';
const UPDATE_ACTIVE_PROFILE = 'active/UPDATE_ACTIVE_PROFILE';
const UPDATE_WINDOW = 'active/UPDATE_WINDOW';

//  Initial State
const initialState = {
  room: null,
  topic: null,
  profile: null,
  window: 'visable',
};

//  Reducer
export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_ACTIVE_ROOM:
      return Object.assign({}, state, {
        room: payload.roomName,
      });
    case UPDATE_ACTIVE_TOPIC:
      return Object.assign({}, state, {
        topic: payload.topicRef,
      });
    case UPDATE_ACTIVE_PROFILE:
      return Object.assign({}, state, {
        profile: payload.profileRef,
      });
    case UPDATE_WINDOW:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
}

//  Action Creators
export const updateActiveRoom = roomName => ({ type: UPDATE_ACTIVE_ROOM, payload: { roomName } });

export const updateActiveTopic = topicRef => ({ type: UPDATE_ACTIVE_TOPIC, payload: { topicRef } });

export const updateActiveProfile = profileRef => ({ type: UPDATE_ACTIVE_PROFILE, payload: { profileRef } });

export const updateActiveWindow = window => ({
  type: UPDATE_WINDOW,
  payload: { window },
});
