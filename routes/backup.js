const express = require('express');
const router = express.Router();
const {fetchData, uploadData} = require('../controller/auth/backup');
router.post('/upload', uploadData);
router.post('/fetch', fetchData);
module.exports = router;