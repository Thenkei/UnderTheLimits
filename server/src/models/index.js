const Sequelize = require('sequelize');
const Answer = require('./answer');
const Question = require('./question');

module.exports = async (config) => {
  try {
    // init sequelize
    const db = new Sequelize(
      config.db,
      config.db_user,
      config.db_pwd, {
        host: config.db_host,
        dialect: 'mysql',
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

    await db.sync({ force: config.forceSync });

    return db;
  } catch (err) {
    throw err;
  }
};
