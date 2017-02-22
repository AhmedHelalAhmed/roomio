import { authGET } from '../../../shared/utils/authAxios';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const ADD_MESSAGES = 'ADD_MESSAGES';
export const UPDATE_LOADING = 'UPDATE_LOADING';
export const SET_CONVERSATION_DETAILS = 'SET_CONVERSATION_DETAILS';
export const SET_CONVERSATION_ID = 'SET_CONVERSATION_ID';
export const UPDATE_MESSAGE_FIELD = 'UPDATE_FIELD';

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    payload: { message },
  };
}

export function addMessages(messages) {
  return {
    type: ADD_MESSAGES,
    payload: {
      messages: messages.reverse(),
    },
  };
}

export function startLoading() {
  return {
    type: UPDATE_LOADING,
    payload: { loading: true },
  };
}

export function finishLoading(status, message) {
  return {
    type: UPDATE_LOADING,
    payload: { loading: false, status, message },
  };
}

export function setConversationDetails(details) {
  return {
    type: SET_CONVERSATION_DETAILS,
    payload: { details },
  };
}

export function setConversationId(id) {
  return {
    type: SET_CONVERSATION_ID,
    payload: { id },
  };
}

export const fetchMessages = id => (dispatch) => {
  dispatch(setConversationId(id));
  dispatch(startLoading());
  authGET(`/api/conversations/${id}/messages`)
    .then((res) => {
      const { conversation } = res.data;
      dispatch(finishLoading('success'));
      dispatch(addMessages(conversation.messages));
      dispatch(setConversationDetails(conversation));
    })
    .catch(() => {
      dispatch(finishLoading('error', 'error fetching messages'));
    });
};

export function updateMessageField(message) {
  return {
    type: UPDATE_MESSAGE_FIELD,
    payload: { message },
  };
}
