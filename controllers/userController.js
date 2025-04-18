const { User } = require("../models/User");
const userService = require("../services/userService");


async function saveUser(req, res) {
  try {
    const username = req.params.username;
    const user = await userService.checkUser(username)
    if (user.exists) {
      res.status(200).json({ user: user.user });
    } else {
      const user = await userService.getUserFromGithub(username);
      const savedUser = await userService.saveUser(user);
      res.status(200).json({ user: saveUser });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
    
   
  module.exports = {
  saveUser,
};
