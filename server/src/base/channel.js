const { CHANNEL_STATUS } = require('../status');

const MAX_ROUND_KICK = 2;

class Channel {
  constructor(name, minPlayersCount = 2, maxPlayersCount = 8, isPrivate = false) {
    this.id = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
    this.name = name || '';
    this.admin = {};
    this.players = [];
    this.currentStatus = CHANNEL_STATUS.IDLE;

    this.minPlayersCount = minPlayersCount;
    this.maxPlayersCount = maxPlayersCount;

    this.isPrivate = isPrivate;
  }

  addPlayer(player) {
    this.players.push(player);
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

  isRunning() {
    return this.currentStatus !== CHANNEL_STATUS.IDLE;
  }

  nextRound(io) {
    // Check channel cannot start
    if (this.players.length < this.minPlayersCount) {
      this.currentStatus = CHANNEL_STATUS.IDLE;
      throw new Error('Il n\'y a pas assez de joueurs dans ce salon !');
    }

    if (this.isRunning()) {
      this.players.forEach((p) => {
        if (p.afkCount >= MAX_ROUND_KICK) {
          io.sockets.sockets[p.id].disconnect();
          console.log('[Channel] Kick', p.name, 'for inactivity into channel', this.name);
        }
      });
    }
  }

  tryReconnectOrConnect(user, socket) {
    const canReconnect = this.players.find(p => (p.name === user.name));
    if (canReconnect) {
      canReconnect.id = socket;
      console.log('[Channel] Reconnect ', user.name, 'into channel', this.name);
    } else {
      if (this.isRunning()) {
        throw new Error('Partie en cours, impossible de rejoindre ce salon.');
      }
      if (this.players.length === this.maxPlayersCount) {
        throw new Error(`Plus de place dans le salon ${this.name} !`);
      } else {
        // Set admin for the first joining
        if (this.players.length === 0) { this.admin = user; }
        this.addPlayer(user);
        console.log('[Channel] Connect ', user.name, 'into channel', this.name);
      }
    }
    /* eslint no-param-reassign: 0 */
    user.currentStatus = 'IN_CHANNEL';
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
