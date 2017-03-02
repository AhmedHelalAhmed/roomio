const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const events = require('./utils/events');
const argv = require('minimist')(process.argv.slice(2));

/**
 * Socket Controllers
 */
const connectionController = require('./controllers/connectionController');
const roomController = require('./controllers/roomController');
const topicController = require('./controllers/topicController');

process.env.laravelURI = argv.laravelURI || 'http://localhost:8888';
process.env.socketPort = argv.socketPort || 3000;

io.on(events.io.CONNECTION, (socket) => {
  connectionController.connect();

    //  io events
  socket.on('disconnect', () => {
    connectionController.disconnect();
  });

  // room join/leave
  socket.on('room:join', (payload) => {
    roomController.join(io, socket, payload);
  });

  socket.on('room:leave', (payload) => {
    roomController.leave(io, socket, payload);
  });

  // Topic events
  socket.on('topic:join', (payload) => {
    topicController.join(io, socket, payload);
  });

  socket.on('topic:leave', (payload) => {
    topicController.leave(io, socket, payload);
  });

  socket.on('topic:send_message', (payload) => {
    topicController.sendMessage(io, socket, payload);
  });

});

http.listen(process.env.socketPort, () => {
  console.log(`socket server running on port ${process.env.socketPort}`);
  console.log(`connected to api running at ${process.env.laravelURI}`);
});
