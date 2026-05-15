const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('GamePlayer', {
  game_id:   { type: DataTypes.INTEGER, primaryKey: true },
  user_id:   { type: DataTypes.INTEGER, primaryKey: true },
}, { tableName: 'game_players', timestamps: true, createdAt: 'joined_at', updatedAt: false });
