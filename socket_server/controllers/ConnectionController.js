let users = 0;

const logUsers = () => {
  console.log(`total users: ${users}`);
};

const connectionController = {
  connect() {
    users += 1;
    logUsers();
  },

  disconnect() {
    users -= 1;
    logUsers();
  }
}

module.exports = connectionController;
