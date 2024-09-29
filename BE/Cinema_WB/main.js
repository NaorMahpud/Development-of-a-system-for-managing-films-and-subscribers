const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/FS18DB')
    .then(() => console.log("Connected to DB"))
    .catch(err => console.error("Database connection error:", err));

app.use(express.json())
app.use(cors())


const userController = require('./Controllers/userController')
const memberController = require('./Controllers/memberController')
const movieController = require('./Controllers/movieController')
const subController = require('./Controllers/subscriptionController')
const authController = require('./Controllers/authController')
const authToken = require('./Middlewares/authToken')

app.use('/cinema/users', authToken, userController)
app.use('/cinema/members', authToken, memberController)
app.use('/cinema/movies', authToken, movieController)
app.use('/cinema/subscriptions', authToken, subController)
app.use('/cinema/auth', authController)


app.listen((port = 7000), () => {
    console.log(`Server is running at http://localhost:${port}`)
})