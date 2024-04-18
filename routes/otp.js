const express = require('express');
const router = express.Router();
const { sendOtpByEmail, verifyOtp } = require('../controller/auth/otp'); // Import controller functions

// Route to send OTP to user's email
router.post('/send-otp', sendOtpByEmail);

// Route to verify OTP entered by the user
router.post('/verify-otp', verifyOtp);

module.exports = router;