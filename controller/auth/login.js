const zod = require("zod");
const User = require("./../../models/user");
const credentialSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(3),
});

const logIn = async (req, resp) => {
  try {
    const query = { email: req.query.email, password: req.query.password };

    const validator = credentialSchema.safeParse(query);

    if (!validator.success) {
      throw new error("invalid input ");
    }

    const resultLogin = await User.findOne(query);

    if (!resultLogin) {
      return resp.status(302).json({ message: "User doesn't exist" });
    }
    return resp.status(200).json(resultLogin);
  } catch (error) {
    console.log("error at login controller , error: ", error);

    const dispatchedError = { message: error.message, code: error.code };
    return resp.status(400).json(dispatchedError);
  }
};

module.exports = logIn;
