const express = require("express");
const groupController = require("../controllers/groupController");

const router = express.Router();

// // Message Related
// router.post("/group/message", groupController.storeMessage);
// router.get("/group/message", groupController.getAllMessages);

// //Admin
// router.get("/group/friends/list", groupController.groupFriends);
// router.delete("/group/friends/remove", groupController.removeGroupUser);
// router.post("/group/friends/add", groupController.addGroupUser);

// router.put("/group/admin/modify/", groupController.adminModify);
// router.get() removeFriend
// router.get() rename group

router.post("/group/create", groupController.addGroup);
router.get("/user/group/list", groupController.getUserGroupInformation);
router.get("/group/:id", groupController.getSingleGroupInformation);

// Admin

module.exports = router;