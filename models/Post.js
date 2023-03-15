const mongoose= require('mongoose')

const PostSchema = new mongoose.Schema({
    content:
        {
            type: String
        },
    picture:
        {
            type: String
        },
    author:
        {
            type: String,
            required: true
        }
}, {timestamps: true})

module.exports = mongoose.model('Post', PostSchema)