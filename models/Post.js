const mongoose = require( 'mongoose' )

const PostSchema = new mongoose.Schema( {
    description:
        {
            type: String
        },
    picture:
        {
            type: String
        },
    artisan:
        {
            type: String,
            required: true
        },
    users:
        {
            type: Array,
            default: []
        }
}, { timestamps: true } )

module.exports = mongoose.model( 'Post', PostSchema )