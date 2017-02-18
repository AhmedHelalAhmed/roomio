const axios = require('axios');
const events = require('../utils/events');
const { makeHeaders } = require('../utils/headers');

class MessageController {
  constructor(socket, io) {
    this.socket = socket;
    this.io = io;
    this.newMessage = this.newMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
	}

  newMessage(message) {
    this.io.emit(events.io.NEW_MESSAGE, message);
  }

  sendMessage({ content, token, conversationId = 1 }) {
    const { laravelApi } = process.env;
    const newMessage = { content, conversation_id: conversationId };

    axios.post(`${laravelApi}/messages`, newMessage, { headers: makeHeaders(token) })
      .then((res) => {
        const { message, name } = res.data;
        this.newMessage({ message, name });
      })
      .catch((error) => {
        console.log(error);
      });
    // this.newMessage({
    //   message,
    //   name: user.name,
    // });
  }
}

module.exports = MessageController;
