const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const events = require('./socket_io/events');

// controllers
const ConnectionController = require('./controllers/ConnectionController');
const MessageController = require('./controllers/MessageController');

// connection instance
const connectionController = new ConnectionController();

console.log(events);

io.on(events.io.CONNECTION, (socket) => {
    connectionController.connect();
    const messageController = new MessageController(socket, io);
    //  io events
    socket.on(events.socket.DISCONNECT, connectionController.disconnect);
    //  message events
    socket.on(events.socket.SEND_MESSAGE, messageController.sendMessage);
    // socket.on(events.socket.SEND_MESSAGE_TO_ALL, messageController.sendMessageToAll);
});

http.listen(3000, () => {
  console.log('listening on port:3000');
});
