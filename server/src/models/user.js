module.exports = (db, Sequelize) => {
  db.define('User', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: Sequelize.STRING,
    score: Sequelize.INTEGER,
  }, {
    timestamps: false,
  });
};
