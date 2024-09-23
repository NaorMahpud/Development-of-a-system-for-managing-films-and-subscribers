import axios from "axios";

const getAllMovies = async (token) => {
    try {
        const { data } = await axios.get('http://localhost:7000/cinema/movies', {
            headers: {
                Authorization: `${token}`
            }
        })
        return data
    } catch (error) {
        return error
    }
}

const createMovie = async (token, movieData) => {
    try {
        const { data } = await axios.post('http://localhost:7000/cinema/movies', movieData, {
            headers: {
                Authorization: `${token}`
            }
        })
        return data
    } catch (error) {
        return error
    }
}

const updateMovie = async (token, movieData) => {
    try {
        const { _id } = movieData
        const { data } = await axios.put(`http://localhost:7000/cinema/movies/${_id}`, movieData, {
            headers: {
                Authorization: `${token}`
            }
        })
        return data
    } catch (error) {
        return error
    }
}

const deleteMovie = async (token, id) => {
    try {
        const { data } = await axios.delete(`http://localhost:7000/cinema/movies/${id}`, {
            headers: {
                Authorization: `${token}`
            }
        })
        return data
    } catch (error) {
        return error
    }
}


export { getAllMovies, createMovie, updateMovie, deleteMovie }