// const Sequelize = require('sequelize')
const Sequelize = require("sequelize");

const sequelize = new Sequelize('groupchatj', 'root', 'nalini@200026',{
    dialect: 'mysql',
    host: 'localhost'
})

  
  module.exports = sequelize;


