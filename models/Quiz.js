const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('Quiz', {
  title:      { type: DataTypes.STRING(100), allowNull: false },
  category:   { type: DataTypes.STRING(50) },
  created_by: { type: DataTypes.INTEGER },
  is_preset:  { type: DataTypes.BOOLEAN, defaultValue: false },
  language:   { type: DataTypes.ENUM('fr','en'), defaultValue: 'fr' },
}, { tableName: 'quizzes', timestamps: true, createdAt: 'created_at', updatedAt: false });
