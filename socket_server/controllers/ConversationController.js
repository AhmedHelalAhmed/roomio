const axios = require('axios');
const events = require('../utils/events');
const { makeHeaders } = require('../utils/headers');

const ConversationController = {

  joinRoom: (io, socket, payload) => {
    const { conversationId } = payload;
    const room = `/conversation/${conversationId}`;
    console.log(`User joined ${room}`);
    socket.join(room);
  },

  leaveRoom: (io, socket, payload) => {
    const { conversationId } = payload;
    const room = `/conversation/${conversationId}`;
    console.log(`User left ${room}`);
    socket.leave(room);
  },


  sendMessage: (io, socket, payload) => {
    const { laravelURI } = process.env;
    const { content, token, conversationId } = payload;
    const newMessage = { content, conversation_id: conversationId };

    if (!conversationId) {
      socket.emit('error', { message: 'no conversationId supplied' });
    } else if (!token) {
      socket.emit('error', { message: 'no token supplied' });
    }

    axios.post(`${laravelURI}/api/message`, newMessage, { headers: makeHeaders(token) })
      .then((res) => {
        const room = `/conversation/${conversationId}`;
        io.in(room).emit(events.io.NEW_MESSAGE, res.data);
        // socket.to(room).emit(events.io.NEW_MESSAGE, res.data);
      })
      .catch((error) => {
        console.log(error);
        // TODO: Handle socket errors.
      });
  },
};

module.exports = ConversationController;
