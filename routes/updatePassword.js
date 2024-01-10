const express = require('express');
const router = express.Router();
const updatePasswordController=require('../controller/updatePassword');

router.get('/',updatePasswordController);

module.exports=router;
