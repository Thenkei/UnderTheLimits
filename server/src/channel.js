const { CHANNEL_STATUS } = require('./status');

const MAX_PLAYERS_COUNT = 6;

const PLAYER_CARD_COUNT = 4;

class Channel {
  constructor(players, name, admin) {
    this.id = Math.floor(Math.random() * Math.floor(100));
    this.admin = admin;
    this.players = players || [];
    this.name = name || '';
    this.currentStatus = CHANNEL_STATUS.WAITING_GAME;

    this.deckAnswers = [];
    this.deckQuestions = [];
  }

  async init(dataBase) {
    try {
      this.deckAnswers = await dataBase.models.Answer.findAll({
        order: [
          dataBase.Sequelize.fn('RAND'),
        ],
        raw: true,
      });
      this.deckQuestions = await dataBase.models.Question.findAll({
        order: [
          dataBase.Sequelize.fn('RAND'),
        ],
        raw: true,
      });
      this.deckAnswers = this.deckAnswers.map(a => a.text);
      this.deckQuestions = this.deckQuestions.map(q => q.text);
    } catch (err) {
      throw err;
    }
  }

  addPlayer(player) {
    if (this.players.length <= MAX_PLAYERS_COUNT) {
      this.players.push(player);
    } else {
      throw new Error('Can\'t add more player to channel');
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
  nextRound() {
    this.initializePlayersCards();
    if (this.currentStatus === CHANNEL_STATUS.JUDGING_CARD) {
      this.nextQuestionCard();
    }

    this.currentStatus = CHANNEL_STATUS.PLAYING_CARD;
  }

  judgementState() {
    this.currentStatus = CHANNEL_STATUS.JUDGING_CARD;
  }

  initializePlayersCards() {
    this.players.forEach((p) => {
      p.hand.push(...this.deckAnswers.splice(0, PLAYER_CARD_COUNT - p.hand.length));
      p.clearAnswers();
    });
  }

  nextQuestionCard() {
    this.deckQuestions.shift();
  }

  getQuestionCard() {
    return this.deckQuestions[0];
  }

  judge(judgment) {
    const winner = this.players.find(p => p.id === judgment);
    winner.scored();
    this.currentStatus = CHANNEL_STATUS.WAITING_GAME;
  }
}

module.exports = Channel;
