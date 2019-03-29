class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name || '#VISITOR';
    this.score = 0;
    this.hand = [];
    this.answers = [];
    this.isGameMaster = false;
  }

  clearAnswers() {
    this.answers.sort((a, b) => b - a);
    this.answers.forEach((i) => {
      this.hand.splice(i, 1);
    });
    this.answers = [];
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
