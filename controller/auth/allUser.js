const User = require("./../../models/user");

const allUser = async (req, resp) => {
  try {
    const resultAllUsers = await User.find();
    return resp.status(200).json(resultAllUsers);
  } catch (error) {
    console.log("error in get all user :", error);
    return resp.status(400).json({ error: "getting All user error" });
  }
};

module.exports = allUser;
