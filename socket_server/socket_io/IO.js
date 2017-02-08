const events = require('./events').io;
const Socket = require('./Socket');

class IO {
    constructor(io) {
        this.io = io;
        this.users = [];
        this.socket = null;
    }

    on(event, task) {
        this.io.on(event, task);
    }

    listen() {
        this.on(events.CONNECTION, this.onConnection.bind(this));
    }

    addUser(user) {
        this.users.push(user);
    }

    removeUser(name) {
        this.users = this.users.filter((user) => user.name !== name);
    }

    newMessage(message, name) {
        this.io.emit(events.NEW_MESSAGE, { message, name });
    }

    /**
     * Event Handlers.
     */
    onConnection(socket) {
        console.log('a user has joined');
        this.socket = new Socket(socket, this);
    }
}

module.exports = IO;
