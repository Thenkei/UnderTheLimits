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
      config.db_user,
      config.db_pwd, {
        host: config.db_host,
        dialect: config.db_dialect,
        storage: config.db_storage,
        port: config.db_port,
        operatorsAliases: false,
        logging: config.db_log,
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
