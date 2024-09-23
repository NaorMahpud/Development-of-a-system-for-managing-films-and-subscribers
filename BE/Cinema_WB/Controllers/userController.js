const express = require('express');
const router = express.Router();
const userService = require('../Services/userService');
const authAdmin = require('../Middlewares/authAdmin')

router.get('/', authAdmin, async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users: ' + err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user: ' + err.message });
    }
});

router.post('/', authAdmin, async (req, res) => {
    try {
        const { username, firstName, lastName } = req.body;

        if (!username || !firstName || !lastName) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const userData = await userService.createUser(req.body);
        return res.status(201).json({ status: 'User successfully added ', user: userData });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add user: ' + err.message });
    }
});

router.put('/:id', authAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await userService.updateUser(id, req.body);
        return res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user: ' + err.message });
    }
});

router.delete('/:id', authAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await userService.deleteUser(id);
        return res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user: ' + err.message });
    }
});

module.exports = router;
