// socket
const NEW_MESSAGE = 'new_message';
const DISCONNECT = 'disconnect';
const USER_CONNECTED = 'user_connected';
const JOIN_ROOM = 'join_room';
const LEAVE_ROOM = 'leave_room';

//  io
const CONNECTION = 'connection';
const SEND_MESSAGE = 'send_message';

module.exports = {
  socket: {
    DISCONNECT,
    USER_CONNECTED,
    SEND_MESSAGE,
    JOIN_ROOM,
    LEAVE_ROOM,
  },
  io: {
    CONNECTION,
    NEW_MESSAGE,
  },
};
