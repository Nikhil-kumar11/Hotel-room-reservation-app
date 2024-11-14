const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    maxcount: {
        type: Number,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    rentperday: {
        type: Number,
        required: true
    },
    imageurls: [],
    currentbookings: [],
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, {
        timestamps: true
});
const roommodel = mongoose.model('rooms', roomSchema);
module.exports = roommodel;