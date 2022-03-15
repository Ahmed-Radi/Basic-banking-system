const mongoose = require('mongoose');
var moment = require('moment');

const Schema = new mongoose.Schema({
    transactionTime: {
        type: Date,
        default: () => moment().toDate(),
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