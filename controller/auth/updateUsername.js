const zod = require("zod");
const User = require("../../models/user");

const inputSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(3),
  newUsername: zod.string().min(3).max(50),
});

const updateUsername = async (req, resp) => {
  try {
    const userData = {
      email: req.query.email,
      password: req.query.password,
      newUsername: req.query.newUsername,
    };

    const validator = inputSchema.safeParse(userData);

    if (!validator.success) {
      return resp.status(400).json({ message: validator.error.message });
    }
    const query = { email: userData.email, password: userData.password };

    const updateUsernameResult = await User.findOne(query);
    if (!updateUsernameResult) {
      return resp.status(302).json({ message: "User doesn't exist" });
    }
    updateUsernameResult.name = userData.newUsername;
    const updatedUser = await updateUsernameResult.save();
    return resp.status(200).json(updatedUser);
  } catch (error) {
    console.log("error at update username controller , error: ", error);
    const dispatchedError = { message: error.message, code: error.code };
    return resp.status(400).json(dispatchedError);
  }
};

module.exports = updateUsername;
