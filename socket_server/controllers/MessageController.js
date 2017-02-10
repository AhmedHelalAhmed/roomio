const events = require('../socket_io/events');

class MessageController {
    constructor(socket, io) {
        this.socket = socket;
        this.io = io;
        this.newMessage = this.newMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    newMessage(message) {
        console.log(message);
        this.io.emit(events.io.NEW_MESSAGE, message);
    }

    sendMessage({ message, user }) {
        console.log(`${user.name} said ${message}`);
        this.newMessage({
            message,
            name: user.name
        });
    }
}

module.exports = MessageController;
