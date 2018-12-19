const { PLAYER_STATUS } = require('./status');


class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name || '#VISITOR';
    this.score = 0;
    this.hand = [];
    this.answers = [];
    this.currentStatus = PLAYER_STATUS.LOBBY;
  }

  clearAnswers() {
    this.answers = [];
  }

  scored() {
    this.score = this.score + 1;
  }
}

module.exports = Player;
