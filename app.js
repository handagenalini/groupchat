const path=require('path');
const express = require('express');
const app = express();
const User = require('./models/user');
const Message = require('./models/message');
const groupMessage = require('./models/groupMessage');
const  groupUser = require('./models/groupUser');
const Group = require('./models/group');


const bodyParser=require('body-parser');
const cors=require('cors');
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'public')))
const sequelize = require('./utils/database');
require("dotenv").config();
const routers = [
    require("./routers/userRouter"),
    require("./routers/messageRouter"),
    require("./routers/friendsRouter"),
    require("./routers/groupRouter"),
  ];
  
  for (const router of routers) {
    app.use(router);
  }
 
  User.hasMany(Message, {
    onDelete: "CASCADE",
  });
  Message.belongsTo(User);
  
  // Group Relationship
  Group.belongsToMany(User, {
    onDelete: "CASCADE",
    through: "groupUser",
  });
  
  // Group Message Relation
  // Include work in this type of relationship (belongsTo)
  Group.hasMany(groupMessage, {
    onDelete: "CASCADE",
  });
  groupMessage.belongsTo(Group);
  User.hasMany(groupMessage, {
    onDelete: "CASCADE",
  });
  groupMessage.belongsTo(User);





sequelize.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
});