import { uniqBy, orderBy } from 'lodash';
//  Actions
const ADD_ROOM   = 'entities/ADD';
const ADD_TOPIC   = 'entities/ADD_TOPIC';
const ADD_MULTIPLE_TOPICS = 'entities/ADD_MULTIPLE_TOPICS';
const ADD_MESSAGE   = 'entities/ADD_TOPIC';

//  Initial State
const initialState = {
  rooms: {}, //  roomName: { Room } - room information
  topics: {}, //  roomId: [Topic] - array of topics
  messages: {}, //  topicId: [Message] - array of messages
};

//  Reducer
export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case ADD_ROOM:
      return Object.assign({}, state, {
        rooms: {
          ...state.rooms,
          [payload.room.name]: payload.room
        },
        topics: {
          ...state.topics,
          [payload.room.name]: [],
        },
      });
    case ADD_TOPIC:
      return Object.assign({}, state, {
        topics: {
          ...state.topics,
          [payload.topic.room_name]: [
            ...orderBy(
              uniqBy([
                ...(state.topics[payload.topic.room_name] || []),
                payload.topic
              ], 'ref'),
              ['created_at'], ['desc']),
          ],
        }
      });
    case ADD_MULTIPLE_TOPICS:
      return Object.assign({}, state, {
        topics: {
          ...state.topics,
          [payload.roomName]: [
            ...orderBy(
              uniqBy([
                ...state.topics[payload.roomName],
                ...payload.topics
              ], 'ref'),
              ['created_at'], ['desc']),
          ],
        }
      });
    default:
      return state;
  }
}

//  Action Creators
export const addRoom = (room) => {
  return { type: ADD_ROOM, payload: { room } };
};

export const addTopic = (topic) => {
  return { type: ADD_TOPIC, payload: { topic } };
};

export const addTopics = (roomName, topics = []) => {
  return { type: ADD_MULTIPLE_TOPICS, payload: { roomName, topics } };
};