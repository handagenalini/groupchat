const { DataTypes } = require("sequelize");
const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const GroupUser =sequelize.define("groupUser", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    admin: {
      type: DataTypes.BOOLEAN,
      default: 0,
    },
  });


module.exports = GroupUser;
