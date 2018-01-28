const mongoose = require('mongoose');

// hteli bismo da prikažemo više informacija o jednom filmu
// u tu svrhu ćemo koristiti javno dostupan tmdb API
var movieSchema = new mongoose.Schema({
    title: String,
    releaseDate: Date,
    overview: String,
    // ovo polje služi za asocijaciju filma sa API
    tmdb: {
        type: Number,
        unique: true,
        required: false
    },
    poster: String,
    rating: Number,
    remaining: Number,
    total: Number
});

movieSchema.pre('save', function (next) {
    const movie = this;

    if (!movie.remaining) {
        movie.remaining = movie.total;
    }

    next();
});

module.exports = mongoose.model('Movie', movieSchema);