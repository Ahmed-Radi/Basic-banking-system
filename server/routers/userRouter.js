const User = require('../models/userModel');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {
    const user = await User.find();
    res.status(200).send(user);
})

router.post('/add/user', async (req, res) => {
    const newUser = new User(req.body)
    await newUser.save();
    res.status(200).send(req.body)
})

router.delete('/remove/:id', async (req, res) => {
    const deleteUser = await User.findByIdAndDelete(req.params.id)
    res.status(200).send(deleteUser)
})

router.patch('/update/:id', async (req, res) => {
    const balanceSender = req.body.balanceSender
    const balanceSendee = req.body.balanceSendee
    const id = req.body.id

    try {
        const _id = req.params.id
        const userSender = await User.findById({_id})
        const userSendee = await User.findById({_id: id})
        if (!userSender || !userSendee) {
            return res.status(404).send('Reporter Not found to Update !!')
        }
        userSender.balance = balanceSender
        userSendee.balance = balanceSendee
        await userSender.save()
        await userSendee.save()
        res.status(200).send(userSender)
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router