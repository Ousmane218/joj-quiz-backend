const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

// Import models
const User         = require('./User')(sequelize);
const Question     = require('./Question')(sequelize);
const Quiz         = require('./Quiz')(sequelize);
const QuizQuestion = require('./QuizQuestion')(sequelize);
const Game         = require('./Game')(sequelize);
const GamePlayer   = require('./GamePlayer')(sequelize);
const Match        = require('./Match')(sequelize);
const MatchAnswer  = require('./MatchAnswer')(sequelize);
const GameResult   = require('./GameResult')(sequelize);

// Associations
User.hasMany(Quiz, { foreignKey: 'created_by' });
Quiz.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

Quiz.belongsToMany(Question, { through: QuizQuestion, foreignKey: 'quiz_id' });
Question.belongsToMany(Quiz, { through: QuizQuestion, foreignKey: 'question_id' });

Game.belongsTo(User, { foreignKey: 'host_id', as: 'host' });
Game.belongsToMany(User, { through: GamePlayer, foreignKey: 'game_id', as: 'players' });

Match.belongsTo(Game, { foreignKey: 'game_id' });
Match.belongsTo(Quiz, { foreignKey: 'quiz_id' });
Match.belongsTo(User, { foreignKey: 'winner_id', as: 'winner' });

MatchAnswer.belongsTo(Match, { foreignKey: 'match_id' });
MatchAnswer.belongsTo(User, { foreignKey: 'player_id', as: 'player' });
MatchAnswer.belongsTo(Question, { foreignKey: 'question_id' });

GameResult.belongsTo(Game, { foreignKey: 'game_id' });
GameResult.belongsTo(User, { foreignKey: 'winner_id', as: 'winner' });

module.exports = {
  sequelize,
  User, Question, Quiz, QuizQuestion,
  Game, GamePlayer, Match, MatchAnswer, GameResult,
};
