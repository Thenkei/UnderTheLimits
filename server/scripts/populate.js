(async () => {
  const fs = require('fs-extra');
  try {
    const config = {
      db: 'utl',
      db_user: 'user',
      db_pwd: 'pwd',
      db_host: 'mysql',
      db_log: false,
      forceSync: true
    };
    console.log('Connection to db...');
    const db = await require('../src/models')(config);

    console.log('Populate...');
    var sql = await fs.readFile(__dirname + '/populate_answer.sql', 'utf8');
    db.query(sql);

    sql = await fs.readFile(__dirname + '/populate_question.sql', 'utf8');
    db.query(sql);

    console.log('Populate done');
    process.exit();
  } catch (err) {
    throw err;
  }
})();
