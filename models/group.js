const { DataTypes } = require("sequelize");
const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Group = sequelize.define("group", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    creator: {
      type: DataTypes.INTEGER,
    },
  });


module.exports = Group;
