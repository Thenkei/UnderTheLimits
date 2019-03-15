const UTLGame = require('./utlGame');

const PLAYER_MAX_POINT = 10;

const UTL_STATUS = {
  IDLE: 'IDLE',
  WAITING_GAME: 'WAITING_GAME',
  PLAYING_CARD: 'PLAYING_CARD',
  JUDGING_CARD: 'JUDGING_CARD',
};

const JUDGMENTS_SCORE = [1, 2, 4];
const JUDGMENTS_SENTENCE = ['termine 3ème, il remporte 1 points.', 'finit 2nd, il remporte 2 points.', 'remporte la manche, il remporte 4 magnifiques points.'];

class UTLPlus extends UTLGame {
  constructor(name, admin, minPlayersCount = 4, maxPlayersCount = 8, playerMaxPoint = 5) {
    super(name, admin, minPlayersCount, maxPlayersCount, playerMaxPoint);

    this.judgment = 0;
    this.judgedIds = [];
  }

  judge(judgment, userCumul, userPoint) {
    if (this.judgedIds.find(judgment)) throw new Error('Vous avez déjà voté pour ce joueur...');

    this.judgedIds.push(judgment);
    const winner = this.players.find(p => p.id === judgment);

    this.players.forEach((p) => {
      p.setGameMaster(false);
    });

    winner.score += JUDGMENTS_SCORE[this.judgment];
    userCumul(winner, JUDGMENTS_SCORE[this.judgment], `${winner.name} ${JUDGMENTS_SENTENCE[this.judgment]}`);
    this.judgment += 1;

    const resultat = this.players.find(p => p.score >= PLAYER_MAX_POINT);

    if (this.judgment > 2) {
      this.judgment = 0;
      winner.setGameMaster(true);

      if (resultat) {
        userPoint(winner, `Le vainqueur est ${winner.name}`);
        this.currentStatus = UTL_STATUS.IDLE;
      } else {
        this.currentStatus = UTL_STATUS.WAITING_GAME;
      }
    }
  }

  nextRound(updateUser) {
    super.nextRound(updateUser);
    this.judgedIds = [];
  }
}

module.exports = UTLPlus;
