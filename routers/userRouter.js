// const express = require('express');

// const userController = require('../controllers/userController');
// // const expenseController = require('../controller/expense')

// const authenticatemiddleware = require('../middleware/auth');

// const router = express.Router();


// router.post('/signup', userController.signup);

// router.post('/login',userController.login)



// module.exports = router;
const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/user/signup", userController.signup);
router.post("/user/login", userController.login);
module.exports = router;