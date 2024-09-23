const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name: { type: String },
    genres: { type: [String] },
    image: { type: String },
    premiered: { type: String }

})
const movieModel = mongoose.model('movie', movieSchema);

module.exports = movieModel;