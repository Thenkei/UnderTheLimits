/* eslint-disable no-console */
const fs = require('fs-extra');
const { models, sequelize } = require('../src/models');

module.exports = (async () => {
  try {
    console.info('Populate started...');
    const dbExists = await fs.pathExists(`${__dirname}/db.sqlite3`);
    if (!dbExists) {
      await sequelize.sync({ force: true });
    }
    console.info('Populate answers...');
    const sqlAnswers = await fs.readFile(`${__dirname}/populate_answer.sql`, 'utf8');
    await sequelize.query(sqlAnswers);

    console.info('Populate questions...');
    const sqlQuestions = await fs.readFile(`${__dirname}/populate_question.sql`, 'utf8');
    await sequelize.query(sqlQuestions);
    console.log('Populate done...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
})();
