const Sequelize = require('sequelize');
const Answer = require('./answer');
const Question = require('./question');
const User = require('./user');
const MLAnswer = require('./mlAnswer');

module.exports = async (config) => {
  try {
    // init sequelize
    const db = new Sequelize(
      config.db,
      config.user,
      config.pwd, {
        host: config.host,
        dialect: config.dialect,
        storage: config.storage,
        port: config.port,
        operatorsAliases: false,
        logging: config.log,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      },
    );

    Answer(db, Sequelize);
    Question(db, Sequelize);
    User(db, Sequelize);
    MLAnswer(db, Sequelize);

    await db.sync({ force: config.forceSync });

    return db;
  } catch (err) {
    throw err;
  }
};
