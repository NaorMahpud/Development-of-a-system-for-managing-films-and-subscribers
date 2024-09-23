const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    city: { type: String }
})

const memberModel = mongoose.model('member', memberSchema)
module.exports = memberModel