const axios = require("axios");

const getMovies = async () => {
    try {
        const { data } = await axios.get('http://localhost:8000/sub/movies');
        return data;
    } catch (err) {
        throw new Error('Failed to fetch movies: ' + err.message);
    }
}

const getMovieById = async (id) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/sub/movies/${id}`);
        return data;
    } catch (err) {
        throw new Error(`Failed to fetch movie with ID ${id}: ` + err.message);
    }
}

const createMovie = async (newData) => {
    try {
        const { data } = await axios.post('http://localhost:8000/sub/movies', newData);
        return {
            status: "Created",
            ...data
        };
    } catch (err) {
        throw new Error('Failed to create movie: ' + err.message);
    }
}

const updateMovie = async (id, updatedData) => {
    try {
        const { data } = await axios.put(`http://localhost:8000/sub/movies/${id}`, updatedData);
        console.log(data)
        return "Updated";
    } catch (err) {
        throw new Error(`Failed to update movie with ID ${id}: ` + err.message);
    }
}

const deleteMovie = async (id) => {
    try {
        await axios.delete(`http://localhost:8000/sub/movies/${id}`);
        return "Deleted";
    } catch (err) {
        throw new Error(`Failed to delete movie with ID ${id}: ` + err.message);
    }
}

module.exports = { getMovies, getMovieById, createMovie, updateMovie, deleteMovie }
