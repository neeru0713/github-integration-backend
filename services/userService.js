const { User } = require("../models/User");

async function checkUser(username) {
  try {
    const user = await User.findOne({ username });
    if (user) {
      return {
        user: user,
        exists: true,
      };
    }

    return {
      user: {},
      exists: false,
    };
  } catch (error) {
    throw new Error("user is not found");
  }
}

async function getUserFromGithub(username) {
  let res = await fetch(`https://api.github.com/users/${username}`);
  const user = await res.json();
  console.log("......", user);
  return user;
}

async function saveUser(user) {
  user.username = user.login;

  const userDetils = new User(user);
  const savedUser = userDetils.save();
  return savedUser;
}

module.exports = {
  checkUser,
  getUserFromGithub,
  saveUser
};
