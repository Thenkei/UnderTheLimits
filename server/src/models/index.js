module.exports = async (config) => {
  const Sequelize = require('sequelize');

  try {
    //init sequelize
    const db = new Sequelize(
      config.db,
      config.db_user,
      config.db_pwd, {
        host: config.db_host,
        dialect: 'mysql',
        operatorsAliases: false,
        logging: config.db_log,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      }
    );

    require('./answer')(db, Sequelize);
    require('./question')(db, Sequelize);

    await db.sync({ force: config.forceSync });

    return db;
  } catch (err) {
    throw err;
  }
};
