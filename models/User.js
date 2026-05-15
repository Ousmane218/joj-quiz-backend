const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('User', {
  username: { type: DataTypes.STRING(50), unique: true, allowNull: false },
  email:    { type: DataTypes.STRING(100), unique: true, allowNull: false },
  password_hash: { type: DataTypes.STRING(255), allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'player'), defaultValue: 'player' },
}, { tableName: 'users', timestamps: true, createdAt: 'created_at', updatedAt: false });
