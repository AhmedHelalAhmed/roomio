let users = 0;

const logUsers = () => {
  console.log(`total users: ${users}`);
};

const connectionController = {
  connect(io, socket) {
    users += 1;
    socket.emit('check_connection');
    logUsers();
  },

  disconnect() {
    users -= 1;
    logUsers();
  }
}

module.exports = connectionController;
