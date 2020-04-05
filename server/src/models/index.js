const Sequelize = require('sequelize');
const Answer = require('./answer');
const Question = require('./question');
const User = require('./user');
const createDBConfig = require('../../createDBConfig');

const config = createDBConfig();

const sequelize = new Sequelize(config);

const models = {
  Answer: Answer.init(sequelize, Sequelize),
  Question: Question.init(sequelize, Sequelize),
  User: User.init(sequelize, Sequelize),
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

const db = {
  models,
  sequelize,
};

module.exports = db;
