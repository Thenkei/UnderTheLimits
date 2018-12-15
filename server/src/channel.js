const MAX_PLAYERS_COUNT = 6;
// const MIN_PLAYER_COUNT = 3;
class Channel {
  constructor(players) {
    this.id = Math.floor(Math.random() * Math.floor(100));
    this.players = players || [];
  }

  addPlayer(player) {
    if (this.players.length < MAX_PLAYERS_COUNT) {
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
}

module.exports = Channel;
