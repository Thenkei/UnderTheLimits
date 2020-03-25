/* eslint-disable no-param-reassign */
const Channel = require('../../base/channel');
const UTLPlayer = require('./player');

const PLAYER_CARD_COUNT = 4;
const MAX_POINTS = 99;
const LOG = '[LimitedGame Ninety-nine] ';

const UTL_STATUS = {
  IDLE: 'IDLE',
  WAITING_GAME: 'WAITING_GAME',
  PLAYING_CARD: 'PLAYING_CARD',
};

class Ninetynine extends Channel {
  constructor(
    name,
    minPlayersCount = 2,
    maxPlayersCount = 8,
    isPrivate = true,
  ) {
    super(name, minPlayersCount, maxPlayersCount, isPrivate);
  }

  async init() {
    this.score = 0;
  }

  addPlayer(user) {
    super.addPlayer(new UTLPlayer(user.id, user.username));
  }

  nextRound(io, updateUser) {
    super.nextRound(io);

    if (this.currentStatus === UTL_STATUS.IDLE) {
      console.log(LOG, this.name, 'starting new game !');

      this.players.forEach((p) => {
        updateUser(p);
        p.reset();
      });

      const j = Math.floor(Math.random() * this.players.length);
      this.players[j].setGameMaster(true);
    }

    this.score = 0;
    this.clockwise = true;

    // Create deck
    const deck = [
      { text: 'L\'as c\'est toi:\n1 or 11', definition: '', score: 11 },
      { text: '2', definition: '', score: 2 },
      { text: '3', definition: '', score: 3 },
      { text: '4', definition: '', score: 4 },
      { text: '5', definition: '', score: 5 },
      { text: '6', definition: '', score: 6 },
      { text: '7', definition: '', score: 7 },
      { text: '8', definition: '', score: 8 },
      { text: '9', definition: '', score: 9 },
      { text: '10', definition: '', score: 10 },
      { text: 'On change de sens', definition: '', score: 0 },
      { text: '-10', definition: '', score: -10 },
      { text: 'Directement\n70', definition: '', score: 70 },
    ];
    this.deck = [...deck, ...deck, ...deck, ...deck];

    // Shuffle the deck
    for (let i = this.deck.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [
        this.deck[j],
        this.deck[i],
      ];
    }

    // Deliver cards to player
    this.players.forEach((p) => {
      p.hand.push(...this.deck.splice(0, PLAYER_CARD_COUNT - p.hand.length));
    });

    // Default starting card (No card played)
    this.lastCard = { text: 'Posez donc une carte ! Miladiou' };
    this.currentStatus = UTL_STATUS.PLAYING_CARD;
  }

  playCard(p) {
    // Change top card
    [this.lastCard] = p.clearAnswers();

    // Update score
    if (this.lastCard.score === 70) { this.score = 70; } else { this.score += this.lastCard.score; }

    // Speciale case Player wanted to play AS => 11 becomes 1
    if (this.lastCard.score === 11 && this.score > 99) {
      this.score -= 10;
    }

    let roundEnded = false;
    // Check if score hits 99 or more
    if (this.score === 99) {
      // Player win
      p.score += 1;
      roundEnded = true;
    } else if (this.score > 99) {
      // Player loose
      p.score -= 1;
      roundEnded = true;
    }

    if (roundEnded) {
      this.currentStatus = UTL_STATUS.WAITING_GAME;
    } else {
      // Pick a card
      p.hand.push(...this.deck.splice(0, PLAYER_CARD_COUNT - p.hand.length));

      // Roll to next player or previous
      const len = this.players.length;
      const currentIndex = this.players.findIndex(player => p === player);
      // eslint-disable-next-line no-unused-expressions
      this.clockwise ? this.players[(currentIndex + 1) % len].setGameMaster(true) : this.players[(currentIndex + len - 1) % len].setGameMaster(true);
      p.setGameMaster(false);
    }
  }

  serialize() {
    return {
      channel: {
        id: this.id,
        admin: this.admin,
        name: this.name,
        type: 'LIMITED',
        players: this.players,
        currentStatus: this.currentStatus,
        timer: this.score,
        lastCard: this.lastCard,
        opts: {
          minPlayersCount: this.minPlayersCount,
          maxPlayersCount: this.maxPlayersCount,
          playerMaxPoint: this.playerMaxPoint,
        },
      },
    };
  }

  // eslint-disable-next-line class-methods-use-this
  serializeTimer() {
    return {
      channel:
        {
          timer: MAX_POINTS,
        },
    };
  }

  register(io, client, usersManager) {
    client.on('nextRound', () => {
      try {
        this.nextRound(io, (player) => {
          usersManager.updateUserStatsPlayed(player.id);
        });

        io.to(this.id).emit('updateChannel', this.serializeTimer());
        io.to(this.id).emit('updateChannel', this.serialize());
      } catch (err) {
        client.emit('err', err.message);
      }
    });

    client.on('selectedAnswers', (answers) => {
      const currentGamePlayer = this.players.find(p => p.id === client.id);
      currentGamePlayer.answers = answers;

      this.playCard(currentGamePlayer);

      io.to(this.id).emit('updateChannel', this.serialize());
    });
  }
}

module.exports = Ninetynine;
