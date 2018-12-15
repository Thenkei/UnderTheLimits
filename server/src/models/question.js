module.exports = (db, Sequelize) => {
  db.define('Question', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    text: Sequelize.STRING,
  }, {
    timestamps: false,
  });
};
