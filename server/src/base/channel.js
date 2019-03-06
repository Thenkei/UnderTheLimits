const { CHANNEL_STATUS } = require('../status');


class Channel {
  constructor(name, admin, minPlayersCount = 2, maxPlayersCount = 8) {
    this.id = Math.floor(Math.random() * Math.floor(100));
    this.name = name || '';
    this.admin = admin;
    this.players = [];
    this.currentStatus = CHANNEL_STATUS.IDLE;

    this.minPlayersCount = minPlayersCount;
    this.maxPlayersCount = maxPlayersCount;
  }

  addPlayer(player) {
    if (this.isRunning()) { throw new Error('Partie en cours, impossible de rejoindre ce salon.'); }
    if (this.players.length <= this.maxPlayersCount) {
      this.players.push(player);
    } else {
      throw new Error(`Plus de place dans le salon ${this.name} !`);
    }
  }

  removePlayerById(id) {
    const toBeRemovedId = this.players.findIndex(p => p.id === id);
    if (toBeRemovedId !== -1) {
      const p = this.players.splice(toBeRemovedId, 1)[0];

      if (this.admin.socket === id) {
        [this.admin] = this.players;
      }

      return p;
    }
    return null;
  }

  removePlayerByName(name) {
    const toBeRemovedId = this.players.findIndex(p => p.name === name);
    if (toBeRemovedId !== -1) {
      const p = this.players.splice(toBeRemovedId, 1)[0];

      if (this.admin.socket === toBeRemovedId) {
        [this.admin] = this.players;
      }

      return p;
    }
    return null;
  }

  getPlayersCount() {
    return this.players.length;
  }

  listPlayers() {
    let debug = '';
    this.players.forEach((p) => {
      debug += `${p.name} -- `;
    });

    console.log(debug);
  }

  canStart() {
    return this.players.length >= this.minPlayersCount;
  }

  isRunning() {
    return this.currentStatus !== CHANNEL_STATUS.IDLE;
  }

  canReconnect(playerName) {
    return this.players.find(p => (p.name === playerName));
  }

  serialize() {
    return {
      channel:
      {
        id: this.id,
        admin: this.admin,
        name: this.name,
        players: this.players,
        currentStatus: this.currentStatus,
      },
    };
  }
}

module.exports = Channel;
