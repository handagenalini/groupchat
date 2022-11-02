const express = require("express");
const friendsController = require("../controllers/friendsController");
const router = express.Router();

router.get("/friend", friendsController.allFriends);

module.exports = router;

