const express = require("express");
const messageController = require("../controllers/messageController");
const router = express.Router();

// Post message
router.post("/message", messageController.storeMessage);

// Getting all message from server
router.post("/message/all", messageController.getAllMessages);
module.exports = router;
