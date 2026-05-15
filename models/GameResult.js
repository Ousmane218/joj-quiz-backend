const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('GameResult', {
  game_id:      { type: DataTypes.INTEGER, primaryKey: true },
  winner_id:    { type: DataTypes.INTEGER },
  final_scores: { type: DataTypes.JSON },
}, { tableName: 'game_results', timestamps: false });
