
module.exports = (env = process.env.NODE_ENV) => (env === 'production' ? {
  db: process.env.DB || 'utl',
  user: process.env.DB_USER || 'user',
  pwd: process.env.DB_PWD || 'pwd',
  host: process.env.DB_HOST || 'mysql',
  port: process.env.DB_PORT || 3306,
  dialect: process.env.DB_DIALECT || 'mysql',
  log: () => {},
} : {
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: process.env.DB_STORAGE || `${__dirname}/db.sqlite3`,
  log: () => {},
  // db_log: console.log,
});
