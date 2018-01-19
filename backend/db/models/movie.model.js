const mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
    title: String,
    releaseDate: String,
    director: String,
    tmdb: Number
});

module.exports = mongoose.model('Movie', movieSchema);