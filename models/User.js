const mongoose = require( 'mongoose' )

const UserSchema = new mongoose.Schema( {
    role:
        {
            type: String,
            default: 'USER'
        },
    firstname:
        {
            type: String,
            required: true,
            min: 2,
            max: 55
        },
    lastname:
        {
            type: String,
            required: true,
            min: 2,
            max: 55
        },
    email:
        {
            type: String,
            required: true,
            unique: true,
            max: 55
        },
    password:
        {
            type: String,
            required: true,
            min: 5
        },
    society:
        {
            type: String
        },
    postcode:
        {
            type: String
        },
    city:
        {
            type: String
        },
    activity:
        {
            type: String
        },
    picture:
        {
            type: String,
            default: ''
        },
    banner:
        {
            type: String,
            default: ''
        },
    description:
        {
            type: String
        },
    artisans:
        {
            type: Array,
            default: []
        },
    view:
        {
            type: Number
        }
}, { timestamps: true } )

module.exports = mongoose.model( 'User', UserSchema )