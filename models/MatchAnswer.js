const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('MatchAnswer', {
  match_id:    { type: DataTypes.INTEGER },
  player_id:   { type: DataTypes.INTEGER },
  question_id: { type: DataTypes.INTEGER },
  chosen_index:{ type: DataTypes.INTEGER },
  response_ms: { type: DataTypes.INTEGER },
  score:       { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'match_answers', timestamps: false });
