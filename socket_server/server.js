const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const events = require('./utils/events');
const argv = require('minimist')(process.argv.slice(2));
// controllers
const ConnectionController = require('./controllers/ConnectionController');
const MessageController = require('./controllers/MessageController');

process.env.laravelApi = argv.laravelApi;

// connection instance
const connectionController = new ConnectionController();

io.on(events.io.CONNECTION, (socket) => {
  connectionController.connect();
  const messageController = new MessageController(socket, io);
    //  io events
  socket.on(events.socket.DISCONNECT, connectionController.disconnect);
    //  message events
  socket.on(events.socket.SEND_MESSAGE, messageController.sendMessage);
});

http.listen(3000, () => {
  console.log('listening on port:3000');
});
