const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
require("dotenv").config();
const dbUri = process.env.DB_URI;
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const updateUsernameRouter = require("./routes/updateUsername");
const updatePasswordRouter = require("./routes/updatePassword");
const allUsersRouter = require("./routes/allUsers");
const update = require('./routes/update');

app.get("/test", (req, res) => {
  res.send("server is working");
});

app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/update-username", updateUsernameRouter);
app.use("/update-password", updatePasswordRouter);
app.use("/allusers", allUsersRouter);
app.use("/update", update);
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});


app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 3000;
mongoose
  .connect(dbUri)
  .then((result) => {
    app.listen(PORT);
    console.log("connected and listening");
  })
  .catch((err) => console.log(err));
