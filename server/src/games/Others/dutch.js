const Channel = require('../../base/channel');
const DBProvider = require('../../utils/dbProvider');
const UTLPlayer = require('./player');

const PLAYER_CARD_COUNT = 10;

const TIMER = 40;
const TIMER_DELAY = 5;
const FINAL_TIMEOUT = 5;

const UTL_STATUS = {
  IDLE: 'IDLE',
  WAITING_GAME: 'WAITING_GAME',
  PLAYING_CARD: 'PLAYING_CARD',
  JUDGING_CARD: 'JUDGING_CARD',
};

class UTLGame extends Channel {
  constructor(
    name,
    minPlayersCount = 2,
    maxPlayersCount = 8,
    playerMaxPoint = 5,
    isPrivate = false,
  ) {
    super(name, minPlayersCount, maxPlayersCount, isPrivate);
    this.deckAnswers = [];
    this.deckQuestions = [];
    this.timer = 0;
    this.playerMaxPoint = playerMaxPoint;
  }

  async init() {
    const dataBase = DBProvider.get();
    try {
      this.deckAnswers = await dataBase.models.Answer.findAll({
        order: [
          dataBase.Sequelize.fn('random'),
        ],
        raw: true,
      });
      this.deckQuestions = await dataBase.models.Question.findAll({
        order: [
          dataBase.Sequelize.fn('random'),
        ],
        raw: true,
      });
      this.deckAnswers = this.deckAnswers.map(a => a);
      this.deckQuestions = this.deckQuestions.map(q => q);
    } catch (err) {
      throw err;
    }
  }

  addPlayer(user) {
    super.addPlayer(new UTLPlayer(user.id, user.username));
  }

  nextRound(io, updateUser) {
    super.nextRound(io);

    if (this.currentStatus === UTL_STATUS.IDLE) {
      console.log('[UTLGame] ', this.name, 'starting new game !');
      const j = Math.floor(Math.random() * this.players.length);

      this.players.forEach((p) => {
        updateUser(p);
        p.reset();
      });

      this.players[j].setGameMaster(true);
    }

    this.deckQuestions.push(this.deckQuestions.shift());
    this.players.forEach((p) => {
      this.deckAnswers.push(...p.clearAnswers());
      p.hand.push(...this.deckAnswers.splice(0, PLAYER_CARD_COUNT - p.hand.length));
    });

    this.timer = TIMER + TIMER_DELAY * (this.deckQuestions[0].text.match(/______/g) || []).length;
    this.currentStatus = UTL_STATUS.PLAYING_CARD;

    console.log('[UTLGame] ', this.name, 'starting new round...');
  }

  shufflePlayer() {
    const playersShuffle = this.players.slice();
    for (let i = playersShuffle.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [playersShuffle[i], playersShuffle[j]] = [
        playersShuffle[j],
        playersShuffle[i],
      ];
    }
    return playersShuffle;
  }

  judgementState() {
    this.currentStatus = UTL_STATUS.JUDGING_CARD;
    if (!this.hasAllPlayersAnswered()) {
      const occurences = (this.deckQuestions[0].text.match(/______/g) || []).length;
      const pls = this.players.filter(p => !p.isGameMaster && p.answers.length < occurences);

      pls.forEach((p) => {
        const answers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(v => !p.answers.includes(v));

        while (p.answers.length < occurences) {
          const selectedAnswer = answers.splice(Math.floor((Math.random() * answers.length)), 1);
          p.answers.push(selectedAnswer[0]);
        }

        p.hasAfk();
      });
    }

    this.players = this.shufflePlayer();
  }

  getQuestionCard() {
    return this.deckQuestions[0] || 'error empty questions deck';
  }

  judge(judgment, userCumul, userPoint) {
    const winner = this.players.find(p => p.id === judgment);

    this.players.forEach((p) => {
      if (!p.isGameMaster) {
        // Machine learning data training set creation
        const machineLearningAnswers = [];
        p.answers.forEach((a) => {
          machineLearningAnswers.push(p.hand[a].id);
        });

        const machineLearningHandAnswers = [];
        p.hand.forEach((a) => {
          machineLearningHandAnswers.push(a.id);
        });

        DBProvider.get().models.MLAnswer.create(
          {
            questionId: this.deckQuestions[0].id,
            answerIds: machineLearningAnswers.toString(),
            handIds: machineLearningHandAnswers.toString(),
            chosen: (winner.id === p.id),
          },
        );
      }
      p.setGameMaster(false);
    });

    winner.score += 1;
    winner.setGameMaster(true);
    userCumul(winner, 1, `${winner.name} remporte la manche !`);

    const resultat = this.players.find(p => p.score >= this.playerMaxPoint);
    if (resultat) {
      userPoint(winner, `Le vainqueur est ${winner.name}`);
      this.currentStatus = UTL_STATUS.IDLE;
    } else {
      this.currentStatus = UTL_STATUS.WAITING_GAME;
    }
  }

  hasAllPlayersAnswered() {
    const occurences = (this.deckQuestions[0].text.match(/______/g) || []).length;
    return this.players.find(p => !p.isGameMaster && p.answers.length < occurences) == null;
  }

  getAnwersTime() {
    return this.timer * 1000;
  }

  serialize() {
    return {
      channel: {
        id: this.id,
        admin: this.admin,
        name: this.name,
        players: this.players,
        currentStatus: this.currentStatus,
        timer: this.timer,
        deckQuestion: this.deckQuestions[0],
        opts: {
          minPlayersCount: this.minPlayersCount,
          maxPlayersCount: this.maxPlayersCount,
          playerMaxPoint: this.playerMaxPoint,
        },
      },
    };
  }

  serializeTimer() {
    return {
      channel:
        {
          timer: this.timer,
        },
    };
  }

  register(io, client, usersManager) {
    client.on('nextRound', () => {
      try {
        this.nextRound(io, (player) => {
          usersManager.updateUserStatsPlayed(player.id);
        });
        io.to(this.id).emit('updateChannel', this.serialize());

        this.launchJudge = () => {
          clearInterval(this.interval);
          this.judgementState(io);
          io.to(this.id).emit('updateChannel', this.serialize());
        };
        this.interval = setInterval(() => { this.timer -= 1; io.to(this.id).emit('updateChannel', this.serializeTimer()); }, 1000);
        this.timeout = setTimeout(this.launchJudge, this.getAnwersTime());
      } catch (err) {
        client.emit('err', err.message);
      }
    });

    client.on('selectedAnswers', (answers) => {
      if (!answers) { return; }
      const currentGamePlayer = this.players.find(p => p.id === client.id);
      currentGamePlayer.answers = answers;

      if (this.timer > 5 && this.hasAllPlayersAnswered()) {
        if (this.timeout) {
          // 5 SECONDES FINAL TIMER
          clearTimeout(this.timeout);
          setTimeout(this.launchJudge, FINAL_TIMEOUT * 1000);
          this.timer = FINAL_TIMEOUT;
          this.timeout = null;
        }
      }

      io.to(this.id).emit('updateChannel', this.serialize());
    });

    client.on('selectedJudgment', (judgment) => {
      try {
        this.judge(
          judgment,
          (player, score, response) => {
            usersManager.updateUserStatsCumul(player.id, score);
            io.to(this.id).emit('success', response);
          },
          (player, response) => {
            usersManager.updateUserStatsPoint(player.id);
            io.to(this.id).emit('success', response);
          },
          io,
        );
      } catch (err) {
        client.emit('err', err.message);
      }

      io.to(this.id).emit('updateChannel', this.serialize());
    });
  }
}

module.exports = UTLGame;
