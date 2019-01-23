const { CHANNEL_STATUS } = require('./status');

const MAX_PLAYERS_COUNT = 6;
const MIN_PLAYERS_COUNT = 2;
const PLAYER_MAX_POINT = 5;
const PLAYER_CARD_COUNT = 10;

class Channel {
  constructor(players, name, admin) {
    this.id = Math.floor(Math.random() * Math.floor(100));
    this.admin = admin;
    this.players = players || [];
    this.name = name || '';
    this.currentStatus = CHANNEL_STATUS.IDLE;

    this.deckAnswers = [];
    this.deckQuestions = [];

    this.players[0].setGameMaster(true);
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
      this.deckAnswers = this.deckAnswers.map(a => a);
      this.deckQuestions = this.deckQuestions.map(q => q);
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
      console.log('Player removed from channel');

      if (this.admin.id === id) {
        [this.admin] = this.players;
      }

      return this.id;
    }
    return -1;
  }

  removePlayerByName(name) {
    const toBeRemovedId = this.players.findIndex(p => p.name === name);
    if (toBeRemovedId !== -1) {
      this.players.splice(toBeRemovedId, 1);
      console.log('Player removed from channel');

      if (this.admin.name === name) {
        [this.admin] = this.players;
      }

      return this.id;
    }
    return -1;
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

    for (let i = this.players.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.players[i], this.players[j]] = [this.players[j], this.players[i]];
    }

    this.currentStatus = CHANNEL_STATUS.PLAYING_CARD;
  }

  judgementState() {
    this.currentStatus = CHANNEL_STATUS.JUDGING_CARD;
  }

  initializePlayersCards() {
    this.players.forEach((p) => {
      p.clearAnswers();
      p.hand.push(...this.deckAnswers.splice(0, PLAYER_CARD_COUNT - p.hand.length));
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
    this.players.forEach(p => p.setGameMaster(false));
    winner.setGameMaster(true);
    this.nextQuestionCard();
    const resultat = this.players.find(p => p.score >= PLAYER_MAX_POINT);
    if (resultat) {
      this.currentStatus = CHANNEL_STATUS.IDLE;
      this.players.forEach((p) => {
        p.reset();
      });
    } else {
      this.currentStatus = CHANNEL_STATUS.WAITING_GAME;
    }

    const gameWinner = resultat || winner;

    return {
      winner: gameWinner,
      gameWinner: gameWinner === resultat,
    };
  }

  hasAllPlayersAnswers() {
    return this.players.find(p => p.answers.length === 0) == null;
  }

  isRunning() {
    return this.currentStatus !== CHANNEL_STATUS.IDLE;
  }

  isFull() {
    return this.players.length >= MAX_PLAYERS_COUNT;
  }

  canStart() {
    return this.players.length >= MIN_PLAYERS_COUNT;
  }
}

module.exports = Channel;
