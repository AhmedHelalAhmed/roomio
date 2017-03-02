const { authPOST } = require('../utils/authAxios');

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
    const { laravelURI } = process.env;
    const { token, content, topicRef } = payload;
    console.log(payload);
    authPOST(`${laravelURI}/api/message`, token, {
      content,
      topic_ref: topicRef, 
    }).then((message) => {
      const topic = `topic:${message.topic_ref}`;
      io.to(topic).emit('topic:new_message', { message });
    }).catch((err) => console.log(err));
  },

};

module.exports = topicController;