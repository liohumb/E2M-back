const mongoose = require('mongoose')

const SocialSchema = new mongoose.Schema({
    name:
        {
            type: String
        },
    url:
        {
            type: String
        },
    user:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
})

module.exports = mongoose.model('Social', SocialSchema)