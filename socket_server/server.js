const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const events = require('./utils/events');
const argv = require('minimist')(process.argv.slice(2));

// controllers
const ConnectionController = require('./controllers/ConnectionController');
const conversationController = require('./controllers/ConversationController');

process.env.laravelURI = argv.laravelURI || 'http://localhost:8888';
process.env.socketPort = argv.socketPort || 3000;

// connection instance
const connectionController = new ConnectionController();

io.on(events.io.CONNECTION, (socket) => {
  connectionController.connect();

    //  io events
  socket.on(events.socket.DISCONNECT, connectionController.disconnect);

  // room join/leave
  socket.on(events.socket.JOIN_ROOM, (payload) => {
    conversationController.joinRoom(io, socket, payload);
  });
  socket.on(events.socket.LEAVE_ROOM, (payload) => {
    conversationController.leaveRoom(io, socket, payload);
  });

  //  message events
  socket.on(events.socket.SEND_MESSAGE, (payload) => {
    conversationController.sendMessage(io, socket, payload);
  });
});

http.listen(process.env.socketPort, () => {
  console.log(`socket server running on port ${process.env.socketPort}`);
  console.log(`connected to api running on at ${process.env.laravelURI}`);
});
