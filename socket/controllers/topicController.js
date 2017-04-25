const { authPOST } = require('../utils/authAxios');
const RoomioBot = require('../roomio_bot/');

const topicController = {

  /**
   * The user opens a topic.
   */
  join: (io, socket, payload) => {
    const { topicRef, roomName } = payload;
    const topic = `topic:${topicRef}`;
    console.log(`User joined topic ${topicRef} in ${roomName}`);
    socket.join(topic);
  },

  /**
   * The user closes a topic or navigates away.
   */
  leave: (io, socket, payload) => {
    const { topicRef, roomName } = payload;
    const topic = `topic:${topicRef}`;
    console.log(`User left topic ${topicRef} in ${roomName}`);
    socket.leave(topic);
  },

  /**
   * The User sends a message while in a Topic chat.
   */
  sendMessage: (io, socket, payload) => {
    const { laravelURI = 'http://127.0.0.1:8888' } = process.env;
    const { token, content, topic_ref } = payload;
    const message = { content, topic_ref };
    authPOST(`${laravelURI}/api/message`, token, message)
      .then((res) => {  
        const { message } = res.data;
        const topic = `topic:${message.topic_ref}`;
        io.sockets.to(topic).emit('topic:new_message', { message });
        RoomioBot(io, socket, message);
      }).catch((error) => {
        const { status, data, message } = error.response;
        switch (status) {
          case 400:
            console.log('Validation Error');
            console.log(data.message);
            return socket.emit('error:topic', {
              error: data.messages,
              type: 'validation',
            });
          case 500:
            console.log('Server Error');
            console.log(message);
            return socket.emit('error:topic', {
              error: 'Server Error',
              type: 'server',
            });
          case 403:
            console.log('Unauthenticated Request');
            console.log(message);
            return socket.emit('error:topic', {
              error: 'Unauthenticated Request',
              type: 'auth',
            });
          default:
            console.log('General Server Error');
            return socket.emit('error:topic', {
              error: 'Server Error',
              type: 'general',
            });
        };
      });
  },

};

module.exports = topicController;