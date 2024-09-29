const express = require('express');
const route = express.Router();
const movieService = require('../Services/movieService');


const filterAllowedFields = (data, allowedFields) => {
    return Object.keys(data)
        .filter(key => allowedFields.includes(key))
        .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {});
};

route.get('/', async (req, res) => {
    try {
        const movies = await movieService.getAllMovie();
        return res.json(movies);
    } catch (err) {
        return res.status(500).send({ error: 'Failed to retrieve movies', details: err.message });
    }
});

route.get('/:id', async (req, res) => {
    try {
        const movie = await movieService.getMovieById(req.params.id);
        if (!movie) {
            return res.status(404).send({ error: 'Movie not found' });
        }
        return res.json(movie);
    } catch (err) {
        return res.status(500).send({ error: 'Failed to retrieve movie', details: err.message });
    }
});

route.post('/', async (req, res) => {
    try {

        const allowedFields = ['name', 'premiered', 'genres', 'image'];
        const filteredData = await filterAllowedFields(req.body, allowedFields);
        const status = await movieService.createMovie(filteredData);
        return res.status(201).json(status);
    } catch (err) {
        return res.status(500).send({ error: 'Failed to create movie', details: err.message });
    }
});

route.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const allowedFields = ['name', 'premiered', 'genres', 'image'];
        const filteredData = filterAllowedFields(req.body, allowedFields);
        
        const status = await movieService.updateMovie(id, filteredData);
        if (status === null) {
            return res.status(404).send({ error: 'Movie not found' });
        }
        return res.json(status);
    } catch (err) {
        return res.status(500).send({ error: 'Failed to update movie', details: err.message });
    }
});

route.delete('/:id', async (req, res) => {
    try {
        const status = await movieService.deleteMovie(req.params.id);
        if (status === null) {
            return res.status(404).send({ error: 'Movie not found' });
        }
        return res.json(status);
    } catch (err) {
        return res.status(500).send({ error: 'Failed to delete movie', details: err.message });
    }
});

module.exports = route;
