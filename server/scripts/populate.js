const fs = require('fs-extra'); // eslint-disable-line import/no-extraneous-dependencies
const DB = require('../src/models');
const createDBConfig = require('../createDBConfig');

module.exports = (async () => {
  try {
    const config = createDBConfig();
    // Force no log ouput for db
    config.db_log = false;
    // Force db to drop old data
    config.forceSync = false;

    console.log('Connection to db...'); // eslint-disable-line no-console
    const db = await DB(config);

    console.log('Populate...'); // eslint-disable-line no-console
    let sql = await fs.readFile(`${__dirname}/populate_answer.sql`, 'utf8');
    await db.query(sql);

    console.log('Populate...'); // eslint-disable-line no-console
    sql = await fs.readFile(`${__dirname}/populate_question.sql`, 'utf8');
    await db.query(sql);

    console.log('Populate done'); // eslint-disable-line no-console
    process.exit();
  } catch (err) {
    console.error(err.message);
  }
})();
