const User = require("../models/user");

const allUser = async (req, resp) => {
  try {
    const resultAllUsers = await User.find();
    return resp.status(200).json(resultAllUsers);
  } catch (error) {
    console.log("error in get all user :", error);
    const dispatchedError = { message: error.message, code: error.code };
    return resp.status(400).json(dispatchedError);
  }
};

module.exports = allUser;
