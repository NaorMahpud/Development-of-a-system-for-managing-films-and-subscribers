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
export { getAllMovies }