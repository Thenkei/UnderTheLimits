const UTLGame = require('./UnderTheLimits/utlGame');
const UTLPlus = require('./UnderTheLimits/utlPlus');

const GameFactory = (
  type,
  channelName,
  admin,
  minPlayersCount,
  maxPlayersCount,
  playerMaxPoint,
) => {
  if (type === 'utlgame') {
    return new UTLGame(
      channelName,
      admin,
      minPlayersCount,
      maxPlayersCount,
      playerMaxPoint,
    );
  }
  if (type === 'utlplus') {
    return new UTLPlus(
      channelName,
      admin,
      minPlayersCount,
      maxPlayersCount,
      playerMaxPoint,
    );
  }

  return new UTLGame(
    channelName,
    admin,
    minPlayersCount,
    maxPlayersCount,
  );
};

module.exports = GameFactory;
