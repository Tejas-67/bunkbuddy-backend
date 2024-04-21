const express = require('express');
const router = express.Router();
const User = require("../../models/user");

const fetchData = async(req, res) => {
    const {email} = req.body;
    try{
        const user = await User.findOne({email: email});
        if(!user) return res.status(400).json({message: "User not found"});

        if(user.subjects===null || user.subjects === undefined){
            user.subjects = [];
            await user.save();
            return res.status(200).json([]);
        }
        return res.status(200).json(user.subjects);
    }
    catch(error){
        console.log("error while uploading: ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
};

const uploadData = async (req, res) => {
    const {email, latestSubjects} = req.body;
    console.log('email ', email);
    console.log('subjects ', latestSubjects);
    try{
        const user = await User.findOne({email: email});
        if(!user) return res.status(400).json({message: "User not found"});

        user.subjects = latestSubjects;
        await user.save();
        res.status(200).json({message: "Backed-up successfully"});
    }
    catch(error){
        console.log("error while uploading subjects: ", error.message);
        res.status(500).json({message: "Upload failed"});
    }
};

module.exports = {fetchData, uploadData};