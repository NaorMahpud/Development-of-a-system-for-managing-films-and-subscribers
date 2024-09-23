const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    role: { type: String }
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel;