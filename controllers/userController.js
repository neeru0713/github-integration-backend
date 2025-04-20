const { User } = require("../models/User");
const userService = require("../services/userService");


async function saveUser(req, res) {
  try {
    const username = req.params.username;
    const user = await userService.checkUser(username);
    if (user.exists) {
      res.status(200).json({ user: user.user });
    } else {
      const user = await userService.getUserFromGithub(username);
      const savedUser = await userService.saveUser(user);
      res.status(200).json({ user: savedUser });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
    
 
async function mutualFollowers(req, res) {
 try {
   const username = req.params.username;
   const user = await userService.mutualFollowers(username);
   if (user) {
     res.status(200).json({ user });
   } else {
     res.status(404).json({ message: "user not found" });
   }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function searchUsers(req, res) {
  try {
    const serchQuery = req.query;
    console.log(".....", serchQuery);
    console.log("######", req.query);

    const users = await userService.searchUsers(serchQuery);
    res.status(200).json(users);
  } catch(error) {
    console.error("serchQuery not found");
    res.status(500).json({ error: "serchQuery Error" });
}
}


  module.exports = {
    saveUser,
    mutualFollowers,
    searchUsers,
  };
