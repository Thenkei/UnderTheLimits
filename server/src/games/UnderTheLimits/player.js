class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name || '#VISITOR';
    this.score = 0;
    this.hand = [];
    this.answers = [];
    this.isGameMaster = false;

    this.afkCount = 0;
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

  hasAfk() {
    this.afkCount += 1;
  }

  reset() {
    this.score = 0;
    this.hand = [];
    this.answers = [];
    this.isGameMaster = false;
  }
}

module.exports = Player;
