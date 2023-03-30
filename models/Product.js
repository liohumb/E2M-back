const mongoose = require( 'mongoose' )

const ProductSchema = new mongoose.Schema( {
    title:
        {
            type: String
        },
    picture:
        {
            type: String
        },
    description:
        {
            type: String
        },
    price:
        {
            type: Number,
            min: 0
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
        },
    sponsor:
        {
            type: Boolean,
            default: false
        }
}, { timestamps: true } )

module.exports = mongoose.model( 'Product', ProductSchema )