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
    const pick = [];
    this.answers.sort((a, b) => b - a);
    this.answers.forEach((i) => {
      pick.push(this.hand.splice(i, 1)[0]);
    });
    this.answers = [];

    return pick;
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
