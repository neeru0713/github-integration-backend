const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");


router.get("/save-user/:username", userController.saveUser);
router.get("/find-mutual-followers/:username", userController.mutualFollowers)


module.exports = router;
