const axios = require("axios");

const getSub = async () => {
    try {
        const { data } = await axios.get('http://localhost:8000/sub/subscriptions');
        return data;
    } catch (err) {
        throw new Error('Failed to fetch subscriptions: ' + err.message);
    }
}

const getSubById = async (id) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/sub/subscriptions/${id}`);
        return data;
    } catch (err) {
        throw new Error(`Failed to fetch subscription with ID ${id}: ` + err.message);
    }
}

const createSub = async (newData) => {
    try {
        await axios.post('http://localhost:8000/sub/subscriptions', newData);
        return "Created!";
    } catch (err) {
        throw new Error('Failed to create subscription: ' + err.message);
    }
}

const updateSub = async (id, updatedData) => {
    try {
        await axios.put(`http://localhost:8000/sub/subscriptions/${id}`, updatedData);
        return "Updated";
    } catch (err) {
        throw new Error(`Failed to update subscription with ID ${id}: ` + err.message);
    }
}

const deleteSub = async (id) => {
    try {
        await axios.delete(`http://localhost:8000/sub/subscriptions/${id}`);
        return "Deleted";
    } catch (err) {
        throw new Error(`Failed to delete subscription with ID ${id}: ` + err.message);
    }
}

module.exports = { getSub, getSubById, createSub, updateSub, deleteSub }
