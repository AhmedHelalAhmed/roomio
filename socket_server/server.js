const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const events = require('./utils/events');
const argv = require('minimist')(process.argv.slice(2));

// controllers
const ConnectionController = require('./controllers/ConnectionController');
const conversationController = require('./controllers/ConversationController');

process.env.laravelApi = argv.laravelApi;
process.env.socketPort = argv.socketPort;

// connection instance
const connectionController = new ConnectionController();

io.on(events.io.CONNECTION, (socket) => {
  connectionController.connect();

    //  io events
  socket.on(events.socket.DISCONNECT, connectionController.disconnect);

  // room related
  socket.on(events.JOIN_ROOM, (payload) => {
    connectionController.joinRoom(payload);
  });

  //  message events
  socket.on(events.socket.SEND_MESSAGE, (payload) => {
    conversationController.sendMessage(io, socket, payload);
  });
});

http.listen(process.env.socketPort, () => {
  console.log(`socket server running on port ${process.env.socketPort}`);
  console.log(`connected to api running on at ${process.env.socketPort}`);
});
