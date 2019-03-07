module.exports = (db, Sequelize) => {
  db.define('User', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: Sequelize.STRING,
    points: Sequelize.INTEGER,
    cumulative: Sequelize.INTEGER,
    played: Sequelize.INTEGER,
  }, {
    timestamps: false,
  });
};
