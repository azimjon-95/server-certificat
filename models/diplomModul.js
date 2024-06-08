const mongoose = require('mongoose');

const ENG = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    teachername: {
        type: String,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    givenDate: {
        type: String,
        required: true
    },
    prosent: {
        type: Number,
    }
})

const model = mongoose.model("ENG", ENG);
module.exports = model;