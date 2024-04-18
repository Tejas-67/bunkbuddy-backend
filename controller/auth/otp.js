const express = require('express');
const router = express.Router();
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const User = require("../../models/user");
require("dotenv").config();

const otpStore = {};


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user: process.env.HOST_EMAIL,
        pass: process.env.HOST_PASSWORD
    }
});

const sendOtp = async(email, otp) => {
    const mailOptions = {
        from: process.env.HOST_EMAIL,
        to: email,
        subject: 'BunkBuddy OTP Verification',
        html: `<p>Dear User, </p>
        <br>
        <p>Thank you for signing up for our attendance tracking application! 
        To complete the registration process and verify your account, 
        please use the following OTP (One-Time Password):</p>
        <p>OTP: ${otp}</p>

        <p>Please enter this OTP within 15 minutes to verify your account 
        and start using our app to track your attendance and view statistics.</p>

        <p>If you did not request this OTP or have any questions, 
        please contact our support team immediately at tejas.dev.2023@gmail.com.</p>
        
        <p>Thank you for choosing our app for managing your attendance. 
        We look forward to providing you with a seamless experience!</p>
        
        <p>Best regards.</p>`
    };

    return await transporter.sendMail(mailOptions);
};

const sendOtpByEmail = async(req, res) =>{
    const {email} = req.body;
    try{
        const otp = otpGenerator.generate(6, {digits: true, alphabets: false, upperCase: false, specialChars: false});
        await sendOtp(email, otp);

        const expiryTime = Date.now() + 15*60*1000;
        otpStore[email] = {otp, expiryTime};

        return res.status(200).json({message: 'Otp sent successfully'});
    }
    catch(error){
        console.log('Error sending OTP: ', error.message);
        return res.status(500).json({message: "Failed to send OTP"});
    }
};

const verifyOtp = async(req, res) => {
    const {email, userOtp} = req.body;
    try{
        const otpEntry = otpStore[email];
        if(!otpEntry) return res.status(400).json({message: 'OTP not found or expired'});
        console.log(otpEntry);
        const {otp, expiryTime} = otpEntry;

        if(expiryTime<Date.now()){
            delete otpStore[email];
            return res.status(400).json({message: 'OTP not found or expired'});
        }
        
        console.log(otp, " ", userOtp);
        if(otp === userOtp){
            const query = {email: email};
            const dbUser = await User.findOne(query);

            if(!dbUser) return res.status(400).json({message: "Couldn't find user with given email"});
            if(dbUser.isVerified === false || dbUser.isVerified === null || dbUser.isVerified === undefined){
                dbUser.isVerified = true;
                await dbUser.save();
            }
            return res.status(200).json({message: 'Otp verified successfully'});
        }
        return res.status(400).json({message: 'Incorrect OTP'});
    }
    catch(error){
        console.log('Error verifying OTP: ', error);
        return res.status(400).json({message: 'Failed to verify OTP.'});
    }
}

module.exports = { sendOtpByEmail, verifyOtp };