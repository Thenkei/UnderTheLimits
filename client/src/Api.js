import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3001');

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.on('playerCreated', player => cb(null, player));
  socket.emit('subscribeToTimer', 1000);
}

function createPlayer(playerName, cb) {
  socket.emit('createPlayer', playerName );
}

export { subscribeToTimer, createPlayer };
