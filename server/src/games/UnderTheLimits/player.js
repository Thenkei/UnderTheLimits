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

  /**
   * Serialize the entity - only data members visible by anyone.
   */
  serialize() {
    return {
      id: this.id,
      name: this.name,
      score: this.score,
      isGameMaster: this.isGameMaster,
    };
  }

  /**
   * SerializeIntimate the entity - secret data members.
   */
  serializeIntimate() {
    return {
      hand: this.hand,
    };
  }
}

module.exports = Player;
