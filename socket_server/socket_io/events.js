const CONNECTION = 'connection';
const SEND_MESSAGE = 'send_message';
const NEW_MESSAGE = 'new_message';
const DISCONNECT = 'disconnect';
const USER_CONNECTED = 'user_connected';

module.exports = {
    socket: {
        DISCONNECT,
        USER_CONNECTED,
        NEW_MESSAGE,
        SEND_MESSAGE
    },
    io: {
        CONNECTION,
        NEW_MESSAGE
    }
};
