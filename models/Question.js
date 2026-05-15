const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('Question', {
  text:          { type: DataTypes.TEXT, allowNull: false },
  type:          { type: DataTypes.ENUM('mcq','true_false','fill'), defaultValue: 'mcq' },
  category:      { type: DataTypes.STRING(50), allowNull: false },
  difficulty:    { type: DataTypes.ENUM('bronze','silver','gold'), defaultValue: 'bronze' },
  options:       { type: DataTypes.JSON },
  correct_index: { type: DataTypes.INTEGER, allowNull: false },
  media_url:     { type: DataTypes.STRING(255) },
  language:      { type: DataTypes.ENUM('fr','en'), defaultValue: 'fr' },
}, { tableName: 'questions', timestamps: false });
