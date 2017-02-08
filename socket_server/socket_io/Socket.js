const events = require('./events').socket;

class Socket {
    constructor(socket, io) {
        this.socket = socket;
        this.io = io;
        this.user = {};
        this.initialize();
    }

    initialize() {
        this.on(events.DISCONNECT, this.onDisconnect.bind(this));
        this.on(events.USER_CONNECTED, this.onUserConnected.bind(this));
        this.on(events.SEND_MESSAGE, this.onSendMessage.bind(this));
    }

    on(event, task) {
        this.socket.on(event, task);
    }

    emit(event, payload) {
        this.socket.emit(event, { payload });
    }

    /**
     * Event Handlers.
     */

    onDisconnect() {
        console.log(`${this.user ? this.user.name : 'a user'} disconnected`);
        this.io.removeUser(this.user.name);
        this.user = {};
        this.socket = null;
    }

    onUserConnected({ user }){
        this.user = user;
        this.io.addUser(user);
        console.log(`${this.user ? this.user.name : 'a user'} connected`);
    }

    onSendMessage({ message }) {
        console.log(`${this.user ? this.user.name : 'a user'} said ${message}`);
        this.io.newMessage(message, this.user.name);
    }
}

module.exports = Socket;
