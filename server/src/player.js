const { PLAYER_STATUS } = require('./status');


class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name || '#VISITOR';
    this.score = 0;
    this.hand = [];
    this.answers = [];
    this.isGameMaster = false;
    this.currentStatus = PLAYER_STATUS.LOBBY;
  }

  clearAnswers() {
    this.answers.sort(function(a,b){ return b - a; });
    this.answers.forEach((i) => {
      this.hand.splice(i, 1);
    });
    this.answers = [];
  }

  scored() {
    this.score = this.score + 1;
  }

  setGameMaster(isGameMaster) {
    this.isGameMaster = isGameMaster;
  }

  reset() {
    this.score = 0;
    this.hand = [];
    this.answers = [];
    this.isGameMaster = false;
  }
}

module.exports = Player;
