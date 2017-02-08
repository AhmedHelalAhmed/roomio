const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const IO = new (require('./socket_io/IO'))(io);

IO.listen();

http.listen(3000, () => {
  console.log('listening on *:3000');
});
