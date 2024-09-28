const movieModel = require("../Models/movieModel");


const getAllMovie = async () => {
    try {
        const movies = await movieModel.find({});
        return movies;
    } catch (error) {
        throw new Error('Failed to retrieve movies');
    }
};


const getMovieById = async (id) => {
    try {
        const movie = await movieModel.findById(id);
        if (!movie) {
            throw new Error('Movie not found');
        }
        return movie;
    } catch (error) {
        throw new Error('Failed to retrieve movie');
    }
};


const createMovie = async (newOne) => {
    try {
        const newMovie = new movieModel(newOne);
        await newMovie.save();
        return {
            status: "Successfully Created",
            movie: newMovie
        };
    } catch (error) {
        throw new Error('Failed to create movie');
    }
};


const updateMovie = async (id, updatedOne) => {
    try {
        const updatedMovie = await movieModel.findByIdAndUpdate(id, updatedOne, { new: true });
        if (!updatedMovie) {
            throw new Error('Movie not found');
        }
        return {
            status: "Successfully Updated",
            movie: updatedMovie
        };
    } catch (error) {
        throw new Error('Failed to update movie');
    }
};

const deleteMovie = async (id) => {
    try {
        const deletedMovie = await movieModel.findByIdAndDelete(id);
        if (!deletedMovie) {
            throw new Error('Movie not found');
        }
        return {
            status: "Successfully Deleted",
            movie: deletedMovie
        };
    } catch (error) {
        throw new Error('Failed to delete movie');
    }
};

module.exports = { deleteMovie, updateMovie, createMovie, getAllMovie, getMovieById };
