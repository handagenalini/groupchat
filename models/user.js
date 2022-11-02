const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

//id, name , password, phone number, role

// const User = sequelize.define('user', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     name: Sequelize.STRING,
//     email: {
//        type:  Sequelize.STRING,
//        allowNull: false,
//        unique: true
//     },
//     phonenumber: {
//         type:  Sequelize.STRING
      
        
//     },
//     password: Sequelize.STRING,
// })

// module.exports=User;
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
    },
    password: { type: DataTypes.STRING, allowNull: false },
  });


module.exports = User;