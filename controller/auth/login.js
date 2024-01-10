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

    const result = await User.findOne(query);

    if (!result) {
      return resp.status(302).json({ message: "User doesn't exist" });
    }
    return resp.status(200).json(result);
  } catch (error) {}
};

module.exports = logIn;
