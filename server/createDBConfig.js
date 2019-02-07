
module.exports = (env = process.env.NODE_ENV) => (env === 'production' ? {
  db: process.env.DB || 'utl',
  db_user: process.env.DB_USER || 'user',
  db_pwd: process.env.DB_PWD || 'pwd',
  db_host: process.env.DB_HOST || 'mysql',
  db_port: process.env.DB_PORT || 3306,
  db_dialect: process.env.DB_DIALECT || 'mysql',
  db_log: false,
} : {
  db_dialect: process.env.DB_DIALECT || 'sqlite',
  db_storage: process.env.DB_STORAGE || `${__dirname}/db.sqlite3`,
  db_log: true,
  forceSync: true,
});
