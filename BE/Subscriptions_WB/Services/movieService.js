const movieModel = require("../Models/movieModel")


const getAllMovie = async () => {
    const movies = await movieModel.find({})
    return movies
}

const getMovieById = async (id) => {
    const movie = await movieModel.findById(id)
    return movie
}

const createMovie = async (newOne) => {
    const newMovie = new movieModel(newOne)
    await newMovie.save()
    return "Created"
}

const updateMovie = async (id, updatedOne) => {
    await movieModel.findByIdAndUpdate(id, updatedOne)
    return "Updated"
}

const deleteMovie = async (id) => {
    await movieModel.findByIdAndDelete(id)
    return "Deleted"
}

module.exports = { deleteMovie, updateMovie, createMovie, getAllMovie, getMovieById }