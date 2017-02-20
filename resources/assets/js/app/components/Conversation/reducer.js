import {
  ADD_MESSAGE,
  ADD_MESSAGES,
  UPDATE_LOADING,
  SET_CONVERSATION_DETAILS,
  SET_CONVERSATION_ID,
  UPDATE_MESSAGE_FIELD,
} from './actions';

const initialState = {
  details: {},
  id: null,
  messages: [],
  message: '',
  loading: true,
  otherUser: {},
};

const ConversationReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_MESSAGE:
      return Object.assign({}, state, {
        messages: [
          payload.message,
          ...state.messages,
        ],
      });
    case ADD_MESSAGES:
      return Object.assign({}, state, {
        messages: [
          ...payload.messages,
          ...state.messages,
        ],
      });
    case UPDATE_LOADING:
    case SET_CONVERSATION_DETAILS:
    case SET_CONVERSATION_ID:
    case UPDATE_MESSAGE_FIELD:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
};

export default ConversationReducer;
