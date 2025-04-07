const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");


router.get("/save-user/:username", userController.saveUser);


module.exports = router;
