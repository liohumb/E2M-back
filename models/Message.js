const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    chat:
        {
            type: String
        },
    user:
        {
            type: String
        },
    message:
        {
            type: String
        }
}, {timestamps: true})

module.exports = mongoose.model('Message', MessageSchema)