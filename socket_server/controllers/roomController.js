const roomController = {
  join: (io, socket, payload) => {
    const { roomName } = payload;
    const room = `/room/${roomName}`;
    console.log(`User joined ${roomName}`);
    socket.join(room);
  },

  leave: (io, socket, payload) => {
    const { roomName } = payload;
    const room = `/room/${roomName}`;
    console.log(`User left ${roomName}`);
    socket.leave(room);
  },
};

module.exports = roomController;