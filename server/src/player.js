const { PLAYER_STATUS } = require('./status');


class Player {
  constructor(name) {
    this.id = Math.floor(Math.random() * Math.floor(100));
    this.name = name || '#VISITOR';
    this.score = 0;
    this.hand = [];
    this.currentStatus = PLAYER_STATUS.LOBBY;
  }
}

module.exports = Player;
