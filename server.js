const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname)); // serves index.html

// Temporary in-memory data storage
let movies = [
    { id: 1, title: "Inception", genre: "Sci-Fi", year: 2010 },
    { id: 2, title: "The Godfather", genre: "Crime", year: 1972 }
];
let nextId = 3;

// GET /api/movies - retrieve all movies
app.get('/api/movies', (req, res) => {
    res.json(movies);
});

// GET /api/movies/:id - retrieve one movie
app.get('/api/movies/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const movie = movies.find(m => m.id === id);

    if (!movie) {
        return res.status(404).json({ error: `Movie with id ${id} not found` });
    }

    res.json(movie);
});

// POST /api/movies - add a new movie
app.post('/api/movies', (req, res) => {
    const { title, genre, year } = req.body;

    if (!title || !genre || !year) {
        return res.status(400).json({ error: 'title, genre, and year are all required' });
    }

    const newMovie = {
        id: nextId++,
        title,
        genre,
        year: Number(year)
    };

    movies.push(newMovie);
    res.status(201).json(newMovie);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
