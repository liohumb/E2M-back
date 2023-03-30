const router = require('express').Router()
const Chat = require('../models/Chat')

/* CREATE */
router.post('/', async ( req, res ) => {
    const newChat = new Chat({
        users: [req.body.senderId, req.body.receiverId]
    })

    try {
        const savedChat = await newChat.save()
        res.status(200).json(savedChat)
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

/* GET */
router.get('/:userId', async ( req, res) => {
    try {
        const chat = await Chat.find({
            users: {$in: [req.params.userId]}
        })
        res.status(200).json(chat)
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

module.exports = router