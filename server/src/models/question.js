const Sequelize = require('sequelize');
class Question extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      text: Sequelize.STRING,
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

module.exports = Question;
