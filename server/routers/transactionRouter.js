const express = require('express');
const router = express.Router();
const Transaction = require('../models/TransactionsModel');

router.post('/transaction', async (req, res) => {
    const transaction = new Transaction(req.body);
    console.log("transaction");
    await transaction.save();
    console.log(transaction);
    res.status(200).send(transaction);
});

router.get('/transaction/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const transaction = await Transaction.find({ user: id });
        const selectedTransactions = transaction.filter(transaction => (
            id === transaction.user.toString()
        ))
        if (!selectedTransactions) {
            return res.status(404).send('Task Not Found')
        }
        res.status(200).send(selectedTransactions);
    } catch (err){
        console.log('error', err);
    }
});

router.get('/all', async (req, res) => {
    const transaction = await Transaction.find();
    try {
        res.status(200).send(transaction)
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;