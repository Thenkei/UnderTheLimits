module.exports = (db, Sequelize) => {
  db.define('Answer', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    text: Sequelize.STRING
  }, {
    timestamps: false,
  });
};
