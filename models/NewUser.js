const mongoose = require( 'mongoose' )

const NewUserSchema = new mongoose.Schema( {
    email:
        {
            type: String,
            required: true,
            unique: true,
            max: 55
        },
    token:
        {
            type: String
        }
}, { timestamps: true } )

module.exports = mongoose.model('NewUser', NewUserSchema)