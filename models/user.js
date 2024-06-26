const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    attended: {
        type: Number,
        required: true
    },
    missed: {
        type: Number,
        required: true
    },
    requirement: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    lastUpdated: {
        type: String,
        required: true
    }
});

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    isVerified: {
        type: Boolean,
        required: true
    },
    subjects: [subjectSchema]
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;