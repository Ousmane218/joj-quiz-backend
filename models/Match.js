const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('Match', {
  game_id:      { type: DataTypes.INTEGER },
  quiz_id:      { type: DataTypes.INTEGER },
  match_number: { type: DataTypes.INTEGER, defaultValue: 1 },
  winner_id:    { type: DataTypes.INTEGER },
  status:       { type: DataTypes.ENUM('pending','in_progress','finished'), defaultValue: 'pending' },
}, { tableName: 'matches', timestamps: false });
