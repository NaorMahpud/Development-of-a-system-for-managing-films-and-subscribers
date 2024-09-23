const express = require('express')
const axios = require('axios')
const app = express()
const port = 8000
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/SUBDB1").then(() => console.log("Connected to DB"))

app.use(cors())
app.use(express.json())

const memberController = require('./Controllers/memberController')
const moviesController = require('./Controllers/movieController')
const subController = require('./Controllers/subscriptionController')

app.use('/sub/members', memberController)
app.use('/sub/movies', moviesController)
app.use('/sub/subscriptions', subController)

const movieModel = require('./Models/movieModel')
const memberModel = require('./Models/memberModel')

const writeMoviesToDB = async () => {
    try {
        const movieCount = await movieModel.countDocuments();
        if (movieCount === 0) {
            const { data } = await axios.get("https://api.tvmaze.com/shows")
            const movies = data.map(movie => {
                const premieredDate = new Date(movie.premiered)
                const formattedDate = premieredDate.toISOString().split('T')[0]
                return obj = {
                    name: movie.name,
                    genres: movie.genres,
                    image: movie.image.medium,
                    premiered: formattedDate
                }
            })
            await movieModel.insertMany(movies)
            console.log("Movies saved to mongoDB")
        }
    } catch (err) {
        throw err.message
    }
}
const writeMembersToDB = async () => {
    try {
        const memberCount = await memberModel.countDocuments();
        if (memberCount === 0) {
            const { data } = await axios.get("https://jsonplaceholder.typicode.com/users")
            const members = data.map(member => {
                return obj = {
                    name: member.name,
                    email: member.email,
                    city: member.address.city
                }
            })
            await memberModel.insertMany(members)
            console.log("Members saved to mongoDB")
        }
    } catch (err) {
        throw err.message
    }
}

app.listen(port, async () => {
    console.log(`Server is running at http://localhost:${port}`)
    await writeMembersToDB()
    await writeMoviesToDB()
})