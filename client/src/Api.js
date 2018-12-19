import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3001');

function init(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

function createPlayer(playerName, cb) {
  socket.emit('createPlayer', playerName );
  socket.on( 'playerCreated', lobbyResponse => cb(null, lobbyResponse.player ));
}

function updateLobby(cb) {
  socket.on('updateLobby', lobbyResponse => {
    cb(null, lobbyResponse.lobby );
  });
}

function updateChannel(cb) {
  socket.on('updateChannel', channelResponse => {
    cb(null, channelResponse.channel );
  });
}

function inChannel(cb) {
  socket.on('inChannel', channelResponse => {
    cb(null, channelResponse.channel );
  });
}

function gotoChannel( channelId, cb ) {
  socket.emit('gotoChannel', channelId );
}

function createChannel(channelName) {
  socket.emit('createChannel', channelName);
}

function startGame(channelId) {
  socket.emit('nextRound', channelId);
}

function selectedAnswers(channelId, answers) {
  socket.emit('selectedAnswers', channelId, answers);
}

function selectedJudgment(channelId, winnerId) {
  socket.emit('selectedJudgment', channelId, winnerId);
}

function error(cb) {
  socket.on('err', errMsg => cb( errMsg ) );
}

export {
  init,
  createPlayer,
  updateLobby,
  updateChannel,
  createChannel,
  startGame,
  selectedAnswers,
  selectedJudgment,
  inChannel,
  gotoChannel,
  error
};
