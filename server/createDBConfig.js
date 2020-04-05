
module.exports = () => ({
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: process.env.DB_STORAGE || `${__dirname}/db.sqlite3`,
  logging: () => {},
  // db_log: console.log,
});
