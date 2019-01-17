const fs = require('fs-extra'); // eslint-disable-line import/no-extraneous-dependencies
const DB = require('../src/models');

(async () => {
  try {
    const config = {
      db: 'utl',
      db_user: 'user',
      db_pwd: 'pwd',
      db_host: 'mysql',
      db_log: false,
      forceSync: true,
    };

    console.log('Connection to db...'); // eslint-disable-line no-console
    const db = await DB(config);

    console.log('Populate...'); // eslint-disable-line no-console
    let sql = await fs.readFile(`${__dirname}/populate_answer.sql`, 'utf8');
    await db.query(sql);

    sql = await fs.readFile(`${__dirname}/populate_question.sql`, 'utf8');
    await db.query(sql);

    console.log('Populate done'); // eslint-disable-line no-console
    process.exit();
  } catch (err) {
    console.error(err);
  }
})();
