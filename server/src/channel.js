const { CHANNEL_STATUS } = require('./status');

const MAX_PLAYERS_COUNT = 6;
const MIN_PLAYER_COUNT = 3;

const PLAYER_CARD_COUNT = 4;

class Channel {
  constructor(players, name) {
    this.id = Math.floor(Math.random() * Math.floor(100));
    this.players = players || [];
    this.name = name || '';
    this.deckAnswers = [];
    this.deckQuestions = [];
    this.currentStatus = CHANNEL_STATUS.WAITING_GAME;
  }

  addPlayer(player) {
    if (this.players.length >= MAX_PLAYERS_COUNT) {
      this.players.push(player);
    } else {
      throw new Error('Can\'t add more player to channel');
    }

    if (this.players.length >= MIN_PLAYER_COUNT) {
      this.currentStatus = CHANNEL_STATUS.GAMING;
    } else {
      this.currentStatus = CHANNEL_STATUS.WAITING_GAME;
    }
  }

  removePlayerById(id) {
    const toBeRemovedId = this.players.findIndex(p => p.id === id);
    if (toBeRemovedId !== -1) {
      this.players.splice(toBeRemovedId, 1);
    }
  }

  removePlayerByName(name) {
    const toBeRemovedId = this.players.findIndex(p => p.name === name);
    if (toBeRemovedId !== -1) {
      this.players.splice(toBeRemovedId, 1);
    }
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

  //----

  async init() {
    const db = await require('./src/models')(config);

    this.Questions = db.models.Questions;
    this.deckAnswers = db.models.Answers;
  }

  initializePlayersCards() {
    this.players.forEach((p) => {
      p.hand.push(...this.deckAnswers.splice(1, PLAYER_CARD_COUNT - p.hand.length));
      // or use pop() or shift()
    });
  }

  nextQuestionCard() {
    this.deckQuestions.shift();
  }

  getQuestionCard() {
    return this.deckQuestions[1];
  }
}

module.exports = Channel;
