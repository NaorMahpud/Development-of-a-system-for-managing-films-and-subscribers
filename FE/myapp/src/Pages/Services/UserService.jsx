import axios from "axios"

const getAllUsers = async (token) => {
    try {
        const { data } = await axios.get("http://localhost:7000/cinema/users", {
            headers: {
                Authorization: `${token}`
            }
        })
        return data

    } catch (error) {
        return (error.response.data || error.message)
    }
}

const createUser = async (token, userData) => {
    try {
        const { data } = await axios.post("http://localhost:7000/cinema/users", userData, {
            headers: {
                Authorization: `${token}`
            }
        })
        return data
    } catch (error) {
        return (error.response.data || error.message)
    }
}

const updateUser = async (token, userData) => {
    const { _id } = userData
    try {
        const { data } = await axios.put(`http://localhost:7000/cinema/users/${_id}`, userData, {
            headers: {
                Authorization: `${token}`
            }
        })
        return data
    } catch (error) {
        return (error.response.data || error.message)
    }
}

const deleteUser = async (token, id) => {
    try {
        const { data } = await axios.delete(`http://localhost:7000/cinema/users/${id}`, {
            headers: {
                Authorization: `${token}`
            }
        })
        return data
    } catch (error) {
        return (error.response.data || error.message)
    }
}

export { getAllUsers, createUser, updateUser, deleteUser }