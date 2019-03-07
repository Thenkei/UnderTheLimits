import openSocket from 'socket.io-client';

const socket = openSocket(`http://${window.location.hostname}:3000`, { path: '/api/socket.io' });

function initPlayer(playerName, cb) {
  socket.emit('initPlayer', playerName);
  socket.on('playerCreated', lobbyResponse => cb(null, lobbyResponse.player));
}

function createPlayer(playerName, cb) {
  socket.emit('createPlayer', playerName);
  socket.on('playerCreated', lobbyResponse => cb(null, lobbyResponse.player));
}

function updateLobby(cb) {
  socket.on('updateLobby', (lobbyResponse) => {
    cb(null, lobbyResponse.lobby);
  });
}

function updateChannel(cb) {
  socket.on('updateChannel', (channelResponse) => {
    cb(null, channelResponse.channel);
  });
}

function gotoChannel(channelId) {
  socket.emit('gotoChannel', channelId);
}

function createChannel(channelName) {
  socket.emit('createChannel', channelName);
}

function startGame() {
  socket.emit('nextRound');
}

function selectedAnswers(answers) {
  socket.emit('selectedAnswers', answers);
}

function selectedJudgment(winnerId) {
  socket.emit('selectedJudgment', winnerId);
}

function error(cb) {
  socket.on('err', errMsg => cb(errMsg));
}

function success(cb) {
  socket.on('success', successMsg => cb(successMsg));
}

export {
  initPlayer,
  createPlayer,
  updateLobby,
  updateChannel,
  createChannel,
  startGame,
  selectedAnswers,
  selectedJudgment,
  gotoChannel,
  error,
  success,
};
