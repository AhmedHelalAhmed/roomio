const app = require('express')();
const http = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(http);
const events = require('./utils/events');
const argv = require('minimist')(process.argv.slice(2));

app.use(cors());

/**
 * Socket Controllers
 */
const connectionController = require('./controllers/connectionController');
const roomController = require('./controllers/roomController');
const topicController = require('./controllers/topicController');

process.env.laravelURI = process.env.laravelURI || 'http://localhost:8888';

app.get('/test', (req, res) => {
  res.send('hello world');
});

io.on(events.io.CONNECTION, (socket) => {
  connectionController.connect(io, socket);

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

http.listen(8081, () => {
  console.log(`socket server running on port ${8081}`);
  console.log(`connected to api running at ${process.env.laravelURI}`);
});
