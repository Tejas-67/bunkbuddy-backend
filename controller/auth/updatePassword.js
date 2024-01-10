const User = require("./../../models/user");
const zod = require("zod");

const dataSchema = zod.object({
  email: zod.string().email(),
  currentPassword: zod.string().min(3),
  newPassword: zod.string().min(3),
});

const updatePassword = async (req, resp) => {
  try {
    const userInput = {
      email: req.query.email,
      currentPassword: req.query.currentPassword,
      newPassword: req.query.newPassword,
    };
    const validatorResult = dataSchema.safeParse(userInput);
    if (!validatorResult.success) {
      return resp.status(400).json(new Error("input credential not good"));
    }
    const query = {
      email: userInput.email,
      password: userInput.currentPassword,
    };
    const resultUpdatePassword = await User.findOne(query);
    if (!resultUpdatePassword) {
      return resp.status(302).json({ message: "Invalid email or password" });
    } else {
      resultUpdatePassword.password = userInput.newPassword;
      const resultUpdateNewPassword = await resultUpdatePassword.save();
      return resp.status(200).json(resultUpdateNewPassword);
    }
  } catch (error) {
    console.log("Error in updating password", error);

    const dispatchedError = { message: error.message, code: error.code };
    return resp.status(400).json(dispatchedError);
  }
};

module.exports = updatePassword;
