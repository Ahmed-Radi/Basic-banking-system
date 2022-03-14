const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    balance: {
        type: Number,
        required: true,
    },
});

// Schema.virtual('transaction', {
//     ref: 'transaction',
//     localField: '_id',
//     foreignField: 'user'
// });

const User = mongoose.model('users', Schema)

module.exports = User