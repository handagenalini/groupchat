const bcrypt = require("bcrypt");
const sequelize = require("../utils/database");
const jwt = require("jsonwebtoken");
const Op = require("sequelize");
const SECRET_KEY = process.env.SECRET_KEY;

// Models
const Group = sequelize.models.group;
const GroupUser = sequelize.models.groupUser;
const User = sequelize.models.user;
const GroupMessage = sequelize.models.groupMessage;

exports.addGroup = (req, res, next) => {
  console.log("----------------------------------in GROUP------------")

  let body = req.body;
  let token = req.headers.token;
  if (body !== undefined && token !== undefined) {
    jwt.verify(token, SECRET_KEY, async function (err, decryptToken) {
      // let admin = decryptToken.userId;
      let users = body.users;
      let groupName = body.name;
      console.log(users,groupName,"----------------------------------in group")


      // First Create Group
      try {
        let group = await Group.create({
          
          name: groupName,
          creator: admin,
        });
        console.log(group,"fhgfhjgjgjjjjjjjjjj")

        try {
          users.push(Number(admin));
          console.log(users,"list")
          for (const user of users) {
        console.log("----------------------------------in groupcreate")

            // let isAdmin = decryptToken.userId === user ? true : false;
            // console.log(isAdmin,"vnnjhg")
            await GroupUser.create({
              groupId: group.id,
              userId: user,
              admin: isAdmin,
            });
          }
          // console.log(isAdmin,"gjhkujkukljulk")

          let groupList = await GroupUser.findAll({
            where: { groupId: group.id },
          });
          res.status(201).json({ status: "success", data: [groupList] });
        } catch (err) {
          res.status(500).json({ status: "error", message: "Server Error" });
        }
      } catch (err) {
        res.status(500).json({ status: "error", message: "Server Error" });
      }
    });
  } else {
    if (body === undefined) {
      res
        .status(205)
        .json({ status: "error", message: "Client needs to resend data" });
    } else {
      res
        .status(205)
        .json({ status: "error", message: "User not logged in yet" });
    }
  }
};

// // (req, res, next) => {
// //     let body = req.body;
// //     let token = req.headers.token;
// //     if (body !== undefined && token !== undefined) {
// //    jwt.verify(token, SECRET_KEY, async function (err, decryptToken) {});
// //     } else {
// //       if (body === undefined) {
// //         res
// //           .status(205)
// //           .json({ status: "error", message: "Client needs to resend data" });
// //       } else {
// //         res
// //           .status(205)
// //           .json({ status: "error", message: "User not logged in yet" });
// //       }
// //     }
// //   };

// // This is return all group associated with particular user.
exports.getUserGroupInformation = (req, res, next) => {
  let body = req.body;
  let token = req.headers.token;
  if (body !== undefined && token !== undefined) {
    jwt.verify(token, SECRET_KEY, async function (err, decryptToken) {
      if (err) {
        res.status(401).json({ status: "error", message: "token is wrong" });
      }
      let user = decryptToken.userId;

      try {
        let group = await GroupUser.findAll({
          include: {
            all: true,
          },
          where: {
            userId: user,
          },
        });

        let responseGroup = [];
        for (const data of group) {
          let id = data.dataValues.groupId;
        

          let group = await Group.findOne({ where: { id: id } });

          let obj = {};
          obj["group"] = group;
          obj["isAdmin"] = data.admin;
          responseGroup.push(obj);
        }
   

        res
          .status(200)
          .json({ status: "success", data: { groups: responseGroup } });
      } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Server Error" });
      }
    });
  } else {
    if (body === undefined) {
      res
        .status(205)
        .json({ status: "error", message: "Client needs to resend data" });
    } else {
      res
        .status(205)
        .json({ status: "error", message: "User not logged in yet" });
    }
  }
};

// This is return specific group information and it's users.
exports.getSingleGroupInformation = (req, res, next) => {
  let body = req.body;
  let token = req.headers.token;
  let groupId = req.params.id;
  if (body !== undefined && token !== undefined) {
    jwt.verify(token, SECRET_KEY, async function (err, decryptToken) {
      if (err) {
        res.status(401).json({ status: "error", message: "token is wrong" });
      }

      try {
        let groupUsers = await GroupUser.findAll({
          where: {
            groupId: groupId,
          },
        });

        let group = await Group.findOne({ where: { id: groupId } });

        res.status(200).json({
          status: "success",
          data: { group: group, user: groupUsers },
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Server Error" });
      }
    });
  } else {
    if (body === undefined) {
      res
        .status(205)
        .json({ status: "error", message: "Client needs to resend data" });
    } else {
      res
        .status(205)
        .json({ status: "error", message: "User not logged in yet" });
    }
  }
};

