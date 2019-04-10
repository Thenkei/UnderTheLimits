const DBProvider = require('../utils/dbProvider');

const MAX_USER_CONNECTED = 100;

class UsersManager {
  constructor() {
    this.users = [];
  }

  async findOrCreateUserFromDB(playerName, socket) {
    const waitingPlayers = this.waitingUsers();
    if (waitingPlayers.length >= MAX_USER_CONNECTED) {
      throw new Error('Impossible de créer un nouveau joueur, le lobby est plein !');
    }

    const doesNameAlreadyExist = this.findUser(playerName);
    if (doesNameAlreadyExist) {
      console.warn(`[UsersManager] Failed adding ${playerName} to lobby, already connected`);
      throw new Error('Ce nom existe déjà !');
    }

    let user;
    const db = DBProvider.get();
    try {
      await db.models.User.findOrCreate(
        {
          where: { username: playerName },
          defaults:
          {
            points: 0,
            cumulative: 0,
            played: 0,
          },
        },
      )
        .spread((userDB) => {
          user = userDB.get({ raw: true });
        });
    } catch (err) {
      throw err;
    }

    // TODO TWICK LATER JUST FOR DEV COMPATIBILITY
    user.dbid = user.id;
    user.id = socket;
    user.socket = socket;
    user.currentStatus = 'LOBBY';
    user.name = user.username;

    console.warn(`[UsersManager] Adding user ${playerName} to lobby`);
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
    const disconnected = this.users.splice(index, 1)[0];
    DBProvider.get().models.User.update(
      {
        points: disconnected.points,
        cumulative: disconnected.cumulative,
        played: disconnected.played,
      },
      { where: { id: disconnected.dbid } },
    );
    console.log('[UsersManager] User', disconnected ? disconnected.name : id, ' got disconnected from lobby');
    return disconnected;
  }

  updateUserStatsPlayed(socket) {
    const user = this.getUserBySocket(socket);
    if (user) {
      user.played += 1;
    }
  }

  updateUserStatsCumul(socket, value = 1) {
    const user = this.getUserBySocket(socket);
    if (user) {
      user.cumulative += value;
    }
  }

  updateUserStatsPoint(socket) {
    const user = this.getUserBySocket(socket);
    if (user) {
      user.points += 1;
    }
  }


  static leaderBoard() {
    const leaderBoard = DBProvider.get().models.User.findAll({
      attributes: ['username', 'points', 'cumulative', 'played'],
      order: [
        ['points', 'DESC'],
      ],
    });
    console.log(leaderBoard);
    return leaderBoard;
  }
}

module.exports = UsersManager;
