import axios from "axios"

const register = async (UnameAndPassword) => {
    try {
        const { data } = await axios.post("http://localhost:7000/cinema/auth/register", UnameAndPassword)
        return data
    } catch (error) {
        return (error.response?.data || error.message)
    }

}

const login = async (UnameAndPassword) => {
    try {
        const { data } = await axios.post("http://localhost:7000/cinema/auth/login", UnameAndPassword)
        return data
    } catch (error) {
        return (error.response?.data || error.message)
    }
}

export { register, login }
