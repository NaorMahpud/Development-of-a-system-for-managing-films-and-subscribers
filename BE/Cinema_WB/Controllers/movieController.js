const express = require('express');
const router = express.Router();
const movieService = require('../Services/movieService');

router.get('/', async (req, res) => {
    try {
        const movies = await movieService.getMovies();
        return res.json(movies);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch movies: ' + err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const movie = await movieService.getMovieById(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        return res.json(movie);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch movie: ' + err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, genres, image, premiered } = req.body;

        if (!name || !genres || !image || !premiered) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const movieData = await movieService.createMovie(req.body);
        return res.status(201).json({ message: 'Movie added successfully', movie: movieData });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add movie: ' + err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedMovie = await movieService.updateMovie(req.params.id, req.body);
        return res.json({ message: 'Movie updated successfully', movie: updatedMovie });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update movie: ' + err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedMovie = await movieService.deleteMovie(req.params.id);
        return res.json({ message: 'Movie deleted successfully', movie: deletedMovie });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete movie: ' + err.message });
    }
});

module.exports = router;
