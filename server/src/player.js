const { PLAYER_STATUS } = require('./status');


class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name || '#VISITOR';
    this.score = 0;
    this.hand = [];
    this.currentStatus = PLAYER_STATUS.LOBBY;
  }
}

module.exports = Player;
