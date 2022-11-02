const { DataTypes } = require("sequelize");
const Sequelize = require('sequelize');
const sequelize = require('../utils/database')


const Message =sequelize.define("message", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: DataTypes.TEXT,
    },
    toUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });


module.exports = Message;