const { DataTypes } = require("sequelize");
// const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const GroupMessage = sequelize.define("groupMessage", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: DataTypes.TEXT,
    },
  });

module.exports = GroupMessage;


