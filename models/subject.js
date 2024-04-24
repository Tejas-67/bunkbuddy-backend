const { Int32 } = require('mongodb');
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