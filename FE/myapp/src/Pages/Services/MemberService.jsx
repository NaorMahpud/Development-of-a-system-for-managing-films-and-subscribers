import axios from "axios"

const getAllMembers = async (token) => {
    try {
        const { data } = await axios.get('http://localhost:7000/cinema/members', {
            headers: {
                Authorization: `${token}`
            }
        })
        return data
    } catch (error) {
        return error
    }
}

const createMember = async (token, memberData) => {
    try {
        const { data } = await axios.post('http://localhost:7000/cinema/members', memberData, {
            headers: {
                Authorization: `${token}`
            }
        })
        return data
    } catch (error) {
        return error
    }
}

const updateMember = async (token, memberData) => {
    try {
        const { _id } = memberData
        const { data } = await axios.put(`http://localhost:7000/cinema/members/${_id}`, memberData, {
            headers: {
                Authorization: `${token}`
            }
        })
        return data
    } catch (error) {
        return error
    }
}

const deleteMember = async (token, id) => {
    try {
        const { data } = await axios.delete(`http://localhost:7000/cinema/members/${id}`, {
            headers: {
                Authorization: `${token}`
            }
        })
        return data
    } catch (error) {
        return error
    }
}


export { getAllMembers, createMember, updateMember, deleteMember }