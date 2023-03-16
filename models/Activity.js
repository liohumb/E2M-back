const mongoose = require('mongoose')

const ActivitySchema = new mongoose.Schema({
    name:
        {
            type: String,
            required: true,
            unique: true
        }
})

module.exports = mongoose.model('Activity', ActivitySchema)