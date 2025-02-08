const express = require("express");
const {loginController} = require("../controllers/loginController");
const {registerController} = require("../controllers/registerController");
const router = express.Router();


router.post("/login",loginController );
router.post("/register",registerController );

module.exports = router;