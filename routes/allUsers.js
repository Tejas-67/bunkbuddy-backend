const express = require("express");
const router = express.Router();
const allUser = require("../controller/allUser");

router.get("/", allUser);

module.exports = router;