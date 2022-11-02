const sequelize = require("../utils/database");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
console.log("----------------------------------in freiend")

// Models
const User = sequelize.models.user;
const Message = sequelize.models.message;

// const Message = sequelize.models.message;
const Friends = sequelize.models.friendsRelation;

exports.allFriends = (req, res, next) => {
  console.log("----------------------------------in freiend------------")
  let token = req.headers.token;

  if (token !== "") {
    console.log("----------------------------------====================in freiend")
    jwt.verify(token, SECRET_KEY, async function (err, decryptToken) {
      if (err) {
        /*
              err = {
                name: 'JsonWebTokenError',
                message: 'jwt malformed'
              }
  
            */
        console.log(err);
      }
      try {
        console.log("----------------------------------in freiend------------")
        let friends = await User.findAll({
          // console.log("----------------------------------in freiend------------")
          where: {
            id: {
              
              [Op.ne]: decryptToken.userId,
            },
          },
          
          attributes: ["id", "name"],
        });

        res.status(200).json({
          
          status: "success",
          data: { user: decryptToken.name, friends: friends },
          
        });
      } catch (error) {
        console.log(error);
      }
    });
  } else {
    res.status(404).json({ status: "error", message: "User Not Found." });
  }
};

// exports.addFriend = (req, res, next) => {
//   let token = req.headers.token;
//   let body = req.body;
//   if (token !== "" && body) {
//     jwt.verify(token, SECRET_KEY, async function (err, decryptToken) {
//       if (err) {
//         console.log(err);
//       }
//       try {
//         let friends = await Friends.create({
//           fromUser: decryptToken.userId,
//           toUser: body.id,
//         });

//         res.status(200).json({
//           status: "success",
//           data: { user: decryptToken.name, friends: friends },
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     });
//   } else {
//     res.status(404).json({ status: "error", message: "User Not Found." });
//   }
// };

// exports.chatList = (req, res, next) => {
//   let token = req.headers.token;
//   let body = req.body;
//   if (token !== "" && body) {
//     jwt.verify(token, SECRET_KEY, async function (err, decryptToken) {
//       if (err) {
//         console.log(err);
//       }
//       try {
//         let friends = await User.findAll({
//           include: { all: true },
//           exclude: { model: Message },
//           where: {
//             id: decryptToken.userId,
//           },
//           attributes: ["id", "name"],
//         });

//         res.status(200).json({
//           status: "success",
//           data: { user: decryptToken.name, friends: friends },
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     });
//   } else {
//     res.status(404).json({ status: "error", message: "User Not Found." });
//   }
// };