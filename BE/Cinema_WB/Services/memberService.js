const axios = require("axios");

const getMembers = async () => {
    try {
        const { data } = await axios.get('http://localhost:8000/sub/members');
        return data;
    } catch (err) {
        throw new Error('Failed to fetch members: ' + err.message);
    }
}

const getMemberById = async (id) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/sub/members/${id}`);
        return data;
    } catch (err) {
        throw new Error(`Failed to fetch member with ID ${id}: ` + err.message);
    }
}

const createMember = async (newData) => {
    try {
        const { data } = await axios.post('http://localhost:8000/sub/members', newData);
        return {
            status: "Created!",
            ...data
        };
    } catch (err) {
        throw new Error('Failed to create member: ' + err.message);
    }
}

const updateMember = async (id, updatedData) => {
    try {
        await axios.put(`http://localhost:8000/sub/members/${id}`, updatedData);
        return "Updated";
    } catch (err) {
        throw new Error(`Failed to update member with ID ${id}: ` + err.message);
    }
}

const deleteMember = async (id) => {
    try {
        const deletedM = await axios.delete(`http://localhost:8000/sub/members/${id}`);
        
        return "Deleted";
    } catch (err) {
        throw new Error(`Failed to delete member with ID ${id}: ` + err.message);
    }
}

module.exports = { getMembers, getMemberById, createMember, updateMember, deleteMember }
