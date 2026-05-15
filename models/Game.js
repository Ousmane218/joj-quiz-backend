const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('Game', {
  mode:        { type: DataTypes.ENUM('solo','live'), allowNull: false },
  host_id:     { type: DataTypes.INTEGER },
  room_code:   { type: DataTypes.STRING(6), unique: true },
  max_players: { type: DataTypes.INTEGER, defaultValue: 10 },
  max_matches: { type: DataTypes.INTEGER, defaultValue: 1 },
  status:      { type: DataTypes.ENUM('lobby','in_progress','finished'), defaultValue: 'lobby' },
}, { tableName: 'games', timestamps: true, createdAt: 'created_at', updatedAt: false });
