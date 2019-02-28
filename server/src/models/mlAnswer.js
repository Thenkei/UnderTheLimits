module.exports = (db, Sequelize) => {
  db.define('MLAnswer', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    questionId: Sequelize.INTEGER,
    answerIds: Sequelize.STRING,
    handIds: Sequelize.STRING,
    chosen: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    timestamps: false,
  });
};
