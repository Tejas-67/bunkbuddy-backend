const User = require("../../models/user");
const zod = require("zod");

/*
app.get("/signup", (req, res) => {
  const user = new User({
    name: req.query.name,
    email: req.query.email,
    password: req.query.password,
    image: req.query.image,
  });
 */

const userSchema = zod.object({
  name: zod.string().min(3).max(50),
  email: zod.string().email(),
  password: zod.string().min(1),
  image: zod.string(),
});

const signup = async (req, resp) => {
  try {
    const userInfo = {
      name: req.query.name,
      email: req.query.email,
      password: req.query.password,
      image: req.query.image,
    };
    const result = userSchema.safeParse(userInfo);
    if (!result.success) {
      return resp.status(400).json({ message: "input data is incorrect" });
    }
    const user = new User(userInfo);
    const query = { email: userInfo.email };
    const dbResponse = await User.findOne(query);
    if (dbResponse == null) {
      const dbSaveResponse = await User.save(user);
      return resp.status(200).json(dbSaveResponse);
    } else {
      return resp.status(302).json({ message: "Email already exists" });
    }
  } catch (err) {
    resp.status(400).json(err);
  }
};

module.exports = signup;
