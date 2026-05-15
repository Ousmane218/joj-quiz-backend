const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('QuizQuestion', {
  quiz_id:     { type: DataTypes.INTEGER, primaryKey: true },
  question_id: { type: DataTypes.INTEGER, primaryKey: true },
  order_index: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'quiz_questions', timestamps: false });
