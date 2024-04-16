const express = require('express');
const router = express.Router();
const updateController = require('../controller/auth/update');

router.get('/', updateController);
module.exports = router;