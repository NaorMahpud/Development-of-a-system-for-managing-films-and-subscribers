const express = require('express')
const route = express.Router()
const movieService = require('../Services/movieService')

route.get('/', async (req, res) => {
    try {
        const movies = await movieService.getAllMovie()
        return res.json(movies)
    } catch (err) {
        throw (err.message)
    }
})

route.get('/:id', async (req, res) => {
    try {
        const movie = await movieService.getMovieById(req.params.id)
        return res.json(movie)
    } catch (err) {
        throw (err.message)
    }
})

route.post('/', async (req, res) => {
    try {
        const status = await movieService.createMovie(req.body)
        return res.json(status)
    } catch (err) {
        throw (err.message)
    }
})

route.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const status = await movieService.updateMovie(id, req.body)
        return res.json(status)
    } catch (err) {
        throw (err.message)
    }
})

route.delete('/:id', async (req, res) => {
    try {
        const status = await movieService.deleteMovie(req.params.id)
        return res.json(status)
    } catch (err) {
        throw (err.message)
    }
})

module.exports = route
