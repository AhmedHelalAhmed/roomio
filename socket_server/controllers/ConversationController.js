const axios = require('axios');
const events = require('../utils/events');
const { makeHeaders } = require('../utils/headers');

const ConversationController = {
  joinRoom: (io, socket, payload) => {
    const { conversationId } = payload;
    const room = `/conversation/${conversationId}`;
    socket.join(room);
  },
  sendMessage: (io, socket, payload) => {
    const { laravelApi } = process.env;
    const { content, token, conversationId } = payload;
    const newMessage = { content, conversation_id: conversationId };

    if (!conversationId) {
      socket.emit('error', { message: 'no conversationId supplied' });
    } else if (!token) {
      socket.emit('error', { message: 'no token supplied' });
    }

    axios.post(`${laravelApi}/messages`, newMessage, { headers: makeHeaders(token) })
      .then((res) => {
        const room = `/conversation/${conversationId}`;
        socket.to(room).broadcast.emit(events.io.NEW_MESSAGE, res.data);
      })
      .catch((error) => {
        console.log(error);
        // TODO: Handle socket errors.
      });
  },
};

module.exports = ConversationController;
