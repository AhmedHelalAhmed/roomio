import { uniqBy, orderBy } from 'lodash';
import validator from 'validator';

//  Actions
const ADD_ROOM   = 'entities/ADD';
const ADD_PROFILE   = 'entities/ADD_PROFILE';
const ADD_TOPIC   = 'entities/ADD_TOPIC';
const ADD_MULTIPLE_TOPICS = 'entities/ADD_MULTIPLE_TOPICS';
const ADD_HOME_TOPICS = 'enitities/ADD_HOME_TOPICS';
const ADD_MULTIPLE_MESSAGES = 'entities/ADD_MULTIPLE_MESSAGES';
const ADD_MESSAGE   = 'entities/ADD_MESSAGE';
const VIEW_ALL_MESSAGES = 'entities/VIEW_ALL_MESSAGES';

//  Initial State
const initialState = {
  rooms: {}, //  roomName: { Room } - room information
  profiles: {},
  topics: {}, //  roomId: [Topic] - array of topics
  messages: {}, //  topicId: [Message] - array of messages
  homeTopics: [], // array of topics
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
    case ADD_PROFILE:
      return Object.assign({}, state, {
        profiles: {
          ...state.profiles,
          [payload.profile.username]: payload.profile,
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
                payload.topic,
              ], 'ref'),
              ['created_at'], ['desc']),
          ],
        }
      });
    case ADD_MESSAGE:
      return Object.assign({}, state, {
        messages: {
          ...state.messages,
          [payload.topicRef]: [
            ...orderBy(
              uniqBy([
                ...(state.messages[payload.topicRef] || []),
                payload.message,
              ], 'id'),
            ['created_at'], ['asc']),
          ],
        },
      });
    case VIEW_ALL_MESSAGES:
      return Object.assign({}, state, {
        messages: {
          ...state.messages,
          [payload.topicRef]: [
            ...state.messages[payload.topicRef].map((message) => {
              message.seen = true;
              return message;
            }),
          ],
        },
      });
    case ADD_MULTIPLE_TOPICS:
      return Object.assign({}, state, {
        topics: {
          ...state.topics,
          [payload.roomName]: [
            ...orderBy(
              uniqBy([
                ...state.topics[payload.roomName],
                ...payload.topics,
              ], 'ref'),
              ['created_at'], ['desc']),
          ],
        }
      });
    case ADD_HOME_TOPICS:
      return Object.assign({}, state, {
        homeTopics: [
          ...(state.homeTopics || []),
          ...payload.topics,
        ],
      });
    case ADD_MULTIPLE_MESSAGES:
      return Object.assign({}, state, {
        messages: {
          ...state.messages,
          [payload.topicRef]: [
            ...orderBy(
              uniqBy([
                ...(state.messages[payload.topicRef] || []),
                ...payload.messages,
              ], 'id'),
              ['created_at'], ['asc']),
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

export const addProfile = (profile) => {
  return { type: ADD_PROFILE, payload: { profile } };
};

export const addTopic = (topic) => {
  return { type: ADD_TOPIC, payload: { topic } };
};

export const addTopics = (roomName, topics = []) => {
  return { type: ADD_MULTIPLE_TOPICS, payload: { roomName, topics } };
};  

export const addHomeTopics = (topics = []) => {
  return { type: ADD_HOME_TOPICS, payload: { topics } };
};

export const addMessages = (topicRef, messages = []) => {
  return { type: ADD_MULTIPLE_MESSAGES, payload: { topicRef, messages } };
};

export const addMessage = (topicRef, message = {}) => {
  return (dispatch, getState) => {
    const { active } = getState();
    dispatch({
      type: ADD_MESSAGE,
      payload: {
        topicRef,
        message: Object.assign({}, message, {
          seen: active.window === 'visable',
        }),
      },
    });
  };
};

export const viewAllMessages = topicRef => ({
  type: VIEW_ALL_MESSAGES,
  payload: { topicRef },
});
