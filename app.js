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

app.get("/test", (req, res) => {
  res.send("server is working");
});

app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/update-username", updateUsernameRouter);
app.use("/update-password", updatePasswordRouter);
app.use("/allusers", allUsersRouter);

//for handling error 404
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

//global error handler
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send({ message: err.message });
});

// app.use((req, res, next) => {
//   console.log(req.method);
//   next();
// });

// app.get("/allusers", (req, res) => {
//   User.find()
//     .then((result) => {
//       res.status(200).send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/login", (req, res) => {
//   const query = { email: req.query.email, password: req.query.password };

//   User.findOne(query)
//     .then((result) => {
//       if (result == null) {
//         res.status(302).json({ message: "User doesn't exist" });
//       } else {
//         res.status(200).json(result);
//       }
//     })
//     .catch((err) => {
//       res.send(400).json(err);
//     });
// });

// app.get("/signup", (req, res) => {
//   const user = new User({
//     name: req.query.name,
//     email: req.query.email,
//     password: req.query.password,
//     image: req.query.image,
//   });

//   const query = { email: user.email };
//   User.findOne(query)
//     .then((result) => {
//       if (result == null) {
//         user.save().then((result) => {
//           res.status(200).json(result);
//         });
//       } else {
//         res.status(302).json({ message: "Email already exists" });
//       }
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

// app.get("/update-password", (req, res) => {
//   const email = req.query.email;
//   const currentPassword = req.query.currentPassword;
//   const newPassword = req.query.newPassword;

//   const query = { email: email, password: currentPassword };
//   User.findOne(query)
//     .then((result) => {
//       if (result == null) {
//         res.status(302).json({ message: "Invalid email or password" });
//       } else {
//         result.password = newPassword;
//         result.save();
//         res.status(200).json(result);
//       }
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

// app.post("/update-username", (req, res) => {
//   const email = req.query.email;
//   const newUsername = req.query.newUsername;
//   const password = req.query.password;
//   const query = { email: email, password: password };
//   User.findOne(query)
//     .then((result) => {
//       if (result == null) {
//         res.status(302).json({ message: "Couldn't find user" });
//       } else {
//         result.name = newUsername;
//         result.save();
//         res.status(200).json(result);
//       }
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

const PORT = process.env.PORT || 3000;
mongoose
  .connect(dbUri)
  .then((result) => {
    app.listen(PORT);
    console.log("connected and listening");
  })
  .catch((err) => console.log(err));
