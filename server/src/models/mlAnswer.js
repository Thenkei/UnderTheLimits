const Sequelize = require('sequelize');
class MLAnswer extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      questionId: Sequelize.INTEGER, // Why integer ? Should be using association
      answerIds: Sequelize.STRING, // Why string ? Should be using association
      handIds: Sequelize.STRING, // Why string ? Should be using association
      chosen: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    }, {
      sequelize,
    }
  )}
}

module.exports = MLAnswer;
