const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel');
const userRepo = require('../Repositories/userRepo')
const bcrypt = require('bcrypt');
const authToken = require('../Middlewares/authToken')

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Missing required fields: username or password' });
        }

        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'Username not found' });
        }
        if (user.password !== "") return res.status(404).json({ error: 'User already Created!!' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword
        await user.save()


        return res.json({ status: "Successfully Created!" });
    } catch (err) {
        res.status(500).json({ error: 'registration failed: ' + err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ error: 'Missing required fields: username or password' });
        }
        const user = await userModel.findOne({ username })
        if (!user) return res.status(404).json({ error: 'Username not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign({ userId: user._id, username, role: user.role }, "secretkey", { expiresIn: '100d' });

        const usersFromJson = await userRepo.readUserJson()
        const jsonUser = usersFromJson.find(userJson => userJson.id === user._id.toString())

        return res.json({ token, status: "Logging in...", fullName: (jsonUser.firstName + `-` + jsonUser.lastName) })

    } catch (err) {
        res.status(500).json({ error: 'Login failed: ' + err.message });
    }
})

router.get('/checkToken', authToken, (req, res) => {
    return res.json("validToken")
})  
module.exports = router;
