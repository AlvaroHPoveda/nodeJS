const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const ToDo = sequelize.define('todo', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  status: {
    //active | deleted
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: 'active'
  }
});

module.exports = { ToDo };
