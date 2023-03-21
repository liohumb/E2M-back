const mongoose = require( 'mongoose' )

const CommentSchema = new mongoose.Schema( {
    comment:
        {
            type: String,
            required: true
        },
    user:
        {
            type: String,
            required: true
        },
    username:
        {
            type: String,
            required: true
        },
    data:
        {
            type: String,
            required: true
        }
}, { timestamps: true } )

module.exports = mongoose.model( 'Comment', CommentSchema )