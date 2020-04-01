const UTLGame = require('./utlGame');

const UTL_STATUS = {
  IDLE: 'IDLE',
  WAITING_GAME: 'WAITING_GAME',
  PLAYING_CARD: 'PLAYING_CARD',
  JUDGING_CARD: 'JUDGING_CARD',
};

const JUDGMENTS_SCORE = [1, 2, 4];
const JUDGMENTS_SENTENCE = ['termine 3ème, il remporte 1 points.', 'finit 2nd, il remporte 2 points.', 'remporte la manche, il remporte 4 magnifiques points.'];
const JUDGMENTS_HINTS = ['Vote pour le troisième', 'Vote pour le second', 'Désigne le vainqueur'];

class UTLPlus extends UTLGame {
  constructor(
    name,
    minPlayersCount = 4,
    maxPlayersCount = 8,
    playerMaxPoint = 7,
    isPrivate = false,
  ) {
    super(name, minPlayersCount, maxPlayersCount, playerMaxPoint, isPrivate);

    this.judgment = 0;
    this.judgedIds = [];
  }

  judgementState(io) {
    super.judgementState(io);
    const message = { isSystem: true, message: '', date: Date.now() };
    message.message = encodeURI(JUDGMENTS_HINTS[this.judgment]);
    const toMaster = this.players.find(p => p.isGameMaster === true);
    io.to(`${toMaster.id}`).emit('chat/message', message);
  }

  judge(judgment, userCumul, userPoint, io) {
    if (this.judgedIds.find(id => id === judgment)) throw new Error('Vous avez déjà voté pour ce joueur...');

    this.judgedIds.push(judgment);
    const winner = this.players.find(p => p.id === judgment);

    winner.score += JUDGMENTS_SCORE[this.judgment];
    userCumul(winner, JUDGMENTS_SCORE[this.judgment], `${winner.name} ${JUDGMENTS_SENTENCE[this.judgment]}`);
    this.judgment += 1;

    if (this.judgment > 2) {
      this.players.forEach((p) => {
        p.setGameMaster(false);
      });

      winner.setGameMaster(true);
      this.judgment = 0;

      const resultat = this.players.find(p => p.score >= this.playerMaxPoint);
      if (resultat) {
        // TODO Check if several players have the required scrore to win
        // and find the one with the highest score in resultat
        userPoint(resultat, `Le vainqueur est ${resultat.name}`);
        this.currentStatus = UTL_STATUS.IDLE;
      } else {
        this.currentStatus = UTL_STATUS.WAITING_GAME;
      }
    } else {
      const message = { isSystem: true, message: '', date: Date.now() };
      message.message = encodeURI(JUDGMENTS_HINTS[this.judgment]);
      const toMaster = this.players.find(p => p.isGameMaster === true);
      io.to(`${toMaster.id}`).emit('chat/message', message);
    }
  }

  nextRound(io, updateUser) {
    super.nextRound(io, updateUser);
    this.judgedIds = [];
  }
}

module.exports = UTLPlus;
