const mongoose = require('mongoose');

// hteli bismo da prikažemo više informacija o jednom filmu
// u tu svrhu ćemo koristiti javno dostupan tmdb API
var movieSchema = new mongoose.Schema({
    title: String,
    releaseDate: Date,
    director: String,
    // ovo polje služi za asocijaciju filma sa API
    tmdb: Number
});

module.exports = mongoose.model('Movie', movieSchema);