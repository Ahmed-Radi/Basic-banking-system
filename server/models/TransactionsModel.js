const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    transactionTime: {
        type: Date,
        default: new Date().setHours(new Date().getHours() + 2),
    },
    cost: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    sendTo: {
        type: mongoose.Schema.Types.ObjectId,
    }
});

const Transaction = mongoose.model('transaction', Schema);

module.exports = Transaction;