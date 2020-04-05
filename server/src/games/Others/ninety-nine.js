/* eslint-disable no-param-reassign */
const Channel = require('../../base/channel');
const UTLPlayer = require('./player');

const PLAYER_CARD_COUNT = 4;
const MAX_POINTS = 99;
const LOG = '[LimitedGame Ninety-nine] ';

const CITATION = [
  "Tout ce que tu peux faire dans la vie, c'est être toi-même. Certains t'aimerons pour qui tu es. La plupart t'aimeront pour les services que tu peux leur rendre, d'autres ne t'aimeront pas.",
  'La beauté est dans les yeux de celui qui regarde.',
  "Si tu diffères de moi, mon frère, loin de me léser, tu m'enrichis.",
  'Sourire mobilise 15 muscles, mais faire la gueule en sollicite 40. Reposez-vous : souriez !',
  'On sait bien quand on part, mais jamais quand on revient.',
  "Ce que l'on doit faire on le sait bien mieux que les philosophes.",
  "Il faut accepter les déceptions passagères, mais conserver l'espoir pour l'éternité.",
  "C'est dans l'angoisse que l'homme prend conscience de sa liberté.",
  "Ne vaut-il pas cent fois mieux rester chez soi à ne rien faire que de perdre son temps à s'occuper des affaires d'autrui !",
  "Le temps fait du bien à l'amour contrairement à ce qu'on pense, les regrets c'est quand on se goure concrètement.",
  "L'inquiétude, c'est stupide. C'est comme si on marchait dans la rue avec un parapluie ouvert en attendant qu'il pleuve.",
  'Nous sommes ce que nous pensons. Tout ce que nous sommes résulte de nos pensées. Avec nos pensées, nous bâtissons notre monde.',
  "Il est dur d'échouer ; mais il est pire de n'avoir jamais tenté de réussir.",
  "Oublie les conséquences de l'échec. L'échec est un passage transitoire qui te prépare pour ton prochain succès.",
  "C'est difficile de mettre une laisse à un chien une fois qu'on lui a posé une couronne sur la tête.",
  "Exige beaucoup de toi-même et attends peu des autres. Ainsi beaucoup d'ennuis te seront épargnés.",
  "On se sépare deux fois, une première fois quand l'amour est mort, une seconde quand un sentiment renaît.",
  'Tirez le rideau, la farce est terminée !',
  "Un pigeon, c'est plus con qu'un dauphin, d'accord... mais ça vole.",
  "Il faut cueillir les cerises avec la queue. J'avais déjà du mal avec la main !",
  "Si l'herbe est plus verte dans le jardin de ton voisin, laisse-le s'emmerder à la tondre.",
  'Boire du café empêche de dormir. Par contre, dormir empêche de boire du café.',
];

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

  playCard(p, io) {
    // Change top card
    [this.lastCard] = p.clearAnswers();
    this.deck.push(this.lastCard);

    // Update score
    if (this.lastCard.score === 70) { this.score = 70; } else { this.score += this.lastCard.score; }

    // Speciale case Player wanted to play AS => 11 becomes 1
    if (this.lastCard.score === 11 && this.score > 99) {
      this.score -= 10;
    }

    // Speciale case Player wanted to play VALET
    if (this.lastCard.score === 0) {
      const message = { isSystem: true, message: 'Mettez le corps devant Sur le corps derrière Li tourné, li tourné Il met son corps devant Sur le corps derrière Li tourné, li tourné', date: Date.now() };
      io.to(`${this.id}`).emit('chat/message', message);
      this.clockwise = !this.clockwise;
    }

    const message = { isSystem: true, message: 'Allez du nerf !', date: Date.now() };
    let roundEnded = false;
    // Check if score hits 99 or more
    if (this.score === 99) {
      // Player win
      p.score += 1;
      roundEnded = true;
      message.message = `${p.name} a gagné.\n${CITATION[Math.floor(Math.random() * CITATION.length)]}\nBref, donne un bon cul sec à qui le mérite !`;
      io.to(`${this.id}`).emit('chat/message', message);
    } else if (this.score > 99) {
      // Player loose
      p.score -= 1;
      roundEnded = true;
      message.message = `${p.name}, tu es mauvais Jack.\n${CITATION[Math.floor(Math.random() * CITATION.length)]}\nPrends donc un gros cul sec dans la tronche. ❤️❤️❤️`;
      io.to(`${this.id}`).emit('chat/message', message);
    } else if (this.score % 10 === 0) {
      message.message = `${p.name} distribue ${this.score / 10} gorgées`;
      io.to(`${this.id}`).emit('chat/message', message);
    }

    if (roundEnded) {
      this.currentStatus = UTL_STATUS.WAITING_GAME;
    } else {
      // Pick a card
      p.hand.push(...this.deck.splice(0, PLAYER_CARD_COUNT - p.hand.length));

      // Roll to next player or previous
      const len = this.players.length;
      const currentIndex = this.players.findIndex((player) => p === player);
      // eslint-disable-next-line no-unused-expressions
      this.clockwise
        ? this.players[(currentIndex + 1) % len].setGameMaster(true)
        : this.players[(currentIndex + len - 1) % len].setGameMaster(true);
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
      const currentGamePlayer = this.players.find((p) => p.id === client.id);
      currentGamePlayer.answers = answers;

      this.playCard(currentGamePlayer, io);

      io.to(this.id).emit('updateChannel', this.serialize());
    });
  }
}

module.exports = Ninetynine;
