async function start() {
  const io = require('socket.io')(); // eslint-disable-line global-require
  const Channel = require('./src/channel'); // eslint-disable-line global-require
  const Player = require('./src/player'); // eslint-disable-line global-require
  try {
    const config = {
      db: 'utl',
      db_user: 'user',
      db_pwd: 'pwd',
      db_host: 'mysql',
      db_log: false,
    };

    await require('./src/models')(config); // eslint-disable-line global-require
    const TEST_CHANNEL = new Channel([new Player('aaa'), new Player('bbb'), new Player('ccc')]);
    TEST_CHANNEL.addPlayer(new Player('ddd'));
    TEST_CHANNEL.removePlayerByName('aaa');
    TEST_CHANNEL.addPlayer(new Player('eee'));
    TEST_CHANNEL.listPlayers();
    io.on('connection', (client) => {
      client.on('subscribeToTimer', (interval) => {
        console.warn('client is subscribing to timer with interval ', interval);
        setInterval(() => {
          client.emit('timer', new Date());
        }, interval);
      });
      client.on('createPlayer', (playerName) => {
        console.warn(`createPlayer ${playerName}`);
        client.emit('playerCreated', new Player(playerName));
      });
    });
  } catch (err) {
    console.error(err);
  }
  const port = 3001;
  io.listen(port);
  console.warn('listening on port ', port);
}

(async () => {
  start();
})();
