import openSocket from 'socket.io-client';

const socket = openSocket(`http://${window.location.hostname}:3000`, { path: '/api/socket.io' });

function addListener(name, cb) {
  if (!global.socket.hasListeners(name)) {
    global.socket.on(name, cb);
  }
}

function createPlayer(playerName, cb) {
  global.socket.emit('createPlayer', playerName);
  addListener('playerCreated', lobbyResponse => cb(lobbyResponse.player));
}

function updateLobby(cb) {
  addListener('updateLobby', (lobbyResponse) => {
    cb(lobbyResponse.lobby);
  });
}

function updateChannel(cb) {
  addListener('updateChannel', channelResponse => cb(channelResponse.channel));
}

function gotoChannel(channelId) {
  global.socket.emit('gotoChannel', channelId);
}

function createChannel(channelName) {
  global.socket.emit('createChannel', channelName);
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
  addListener('err', errMsg => cb(errMsg));
}

function success(cb) {
  addListener('success', successMsg => cb(successMsg));
}

function chatMessages(cb) {
  addListener('chat/message', msg => cb(msg));
}

function sendMessage(msg) {
  global.socket.emit('chat/message', msg);
}

if (!global.socket) {
  global.socket = socket;
}


export {
  createPlayer,
  chatMessages,
  sendMessage,
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
