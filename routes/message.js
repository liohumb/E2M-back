const router = require('express').Router()
const Message = require('../models/Message')

/* CREATE */
router.post('/', async ( req, res ) => {
    const newMessage = new Message(req.body)

    try {
        const savedMessage= newMessage.save()
        res.status(200).json(savedMessage)
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

/* GET */
router.get('/:id', async ( req, res) => {
    try {
        const messages = await Message.find({
            chat: req.params.id
        })
        res.status(200).json(messages)
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

module.exports = router