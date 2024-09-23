import axios from "axios"

const getAllSub = async (token) => {
    try {
        const { data } = await axios.get('http://localhost:7000/cinema/subscriptions', {
            headers: {
                Authorization: `${token}`
            }
        })
        return data
    } catch (error) {
        return error
    }
}

const createSub = async (token, subData) => {
    try {
        const { data } = await axios.post('http://localhost:7000/cinema/subscriptions', subData, {
            headers: {
                Authorization: `${token}`
            }
        })
        return data
    } catch (error) {
        return error
    }
}

const updateSub = async (token, subData) => {
    try {
        const { _id } = subData
        const { data } = await axios.put(`http://localhost:7000/cinema/subscriptions/${_id}`, subData, {
            headers: {
                Authorization: `${token}`
            }
        })
        return data
    } catch (error) {
        return error
    }
}

const deleteSub = async (token, id) => {
    try {
        const { data } = await axios.put(`http://localhost:7000/cinema/subscriptions/${id}`, {
            headers: {
                Authorization: `${token}`
            }
        })
        return data
    } catch (error) {
        return error
    }
}

export { getAllSub, createSub, updateSub, deleteSub }