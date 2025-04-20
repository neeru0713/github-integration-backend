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

async function mutualFollowers(username) {
  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  };

  const res = await fetch(
    `https://api.github.com/users/${username}/followers`,
    { headers }
  );
  const followers = await res.json();
  // console.log("......", followers);

  followers.forEach(async (item) => {
    const isFollowing = await fetch(
      `https://api.github.com/users/${username}/following/${item.login}`,
      { headers }
    );

    if (isFollowing.status === 204) {
      const user = await User.findOne({ username });
      const existingUser = user.friends.find(
        (friend) => friend.username === item.login
      );
      if (!existingUser) {
        user.friends.push({ ...item, username: item.login });
        await user.save();
      }

      return user;
    }
  });
}

async function searchUsers(serchQuery) {

  const filter = {};
  if (serchQuery.username) {
    filter.username = { $regex: serchQuery.username, $options: "i" };
  } 
    if (serchQuery.location) {
      filter.location = { $regex: serchQuery.location, $options: "i" };
      console.log("0000", filter);
    }
    
    const users = await User.find(filter);
          console.log("******", users);

    return users;

  
}

module.exports = {
  checkUser,
  getUserFromGithub,
  saveUser,
  mutualFollowers,
  searchUsers,
};
