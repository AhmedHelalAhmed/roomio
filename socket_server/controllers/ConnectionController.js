class ConnectionController {
  constructor() {
    this.users = 0;
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  logUsers() {
    console.log(`total users: ${this.users}`);
  }

  connect() {
    this.users += 1;
    this.logUsers();
  }

  disconnect() {
    this.users -= 1;
    this.logUsers();
  }
}

module.exports = ConnectionController;
