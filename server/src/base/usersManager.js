const DBProvider = require('../utils/dbProvider');

class UsersManager {
  constructor() {
    this.users = [];
  }

  async findOrCreateUserFromDB(playerName, socket) {
    let user;
    const db = DBProvider.get();
    try {
      await db.models.User.findOrCreate(
        {
          where: { username: playerName },
          defaults: { score: 0 },
        },
      )
        .spread((userDB) => {
          user = userDB.get({ raw: true });
        });
    } catch (err) {
      throw err;
    }

    // REMOVE LATER JUST FOR TEST COMPATIBILITY
    user.dbid = user.id;
    user.id = socket;
    user.socket = socket;
    user.currentStatus = 'LOBBY';
    user.name = user.username;
    this.users.push(user);

    return user;
  }

  waitingUsers() {
    return this.users.filter(c => c.currentStatus === 'LOBBY');
  }

  findUser(userName) {
    return this.users.find(c => c.username === userName);
  }

  getUserBySocket(id) {
    return this.users.find(c => c.socket === id);
  }

  removeUserById(id) {
    const index = this.users.findIndex(c => c.socket === id);
    if (index === -1) { return null; }
    return this.users.splice(index, 1)[0];
  }
}

module.exports = UsersManager;
