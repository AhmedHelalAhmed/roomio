// socket
const NEW_MESSAGE = 'new_message';
const DISCONNECT = 'disconnect';
const USER_CONNECTED = 'user_connected';

//  io
const CONNECTION = 'connection';
const SEND_MESSAGE = 'send_message';

module.exports = {
    socket: {
        DISCONNECT,
        USER_CONNECTED,
        SEND_MESSAGE
    },
    io: {
        CONNECTION,
        NEW_MESSAGE
    }
};
