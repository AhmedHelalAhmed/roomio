import authGet from '../../../src/shared/utils/authAxios';

// Actions
const ADD   = 'room/ADD';
const CREATE = 'room/CREATE';
const UPDATE = 'room/UPDATE';
const REMOVE = 'room/REMOVE';

// Initial State
const initialState = {
  rooms: {},
  activeRoom: null,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case ADD:
        return [
          ...payload,
          ...state.rooms,
        ];
    default:
      return state;
  }
}

// Action Creators
export const loadRoomWithTopics = (roomName) => (dispatch) => {
  authGet(`$/api/room/{roomName}/topics`)
  return { type: LOAD };
};