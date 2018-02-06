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

    if (movie.remaining === undefined) {
        movie.remaining = movie.total;
    }

    next();
});

movieSchema.pre('remove', function (next) {
    const movie = this;
    const movie_id = movie._id;
    const Rental = mongoose.model('Rental');

    Rental.find({}, function (error, rentals) {
        let found = false;
        for (let i = 0; i < rentals.length; i++) {
            const rental = rentals[i];
            if (rental.movie.equals(movie_id)) {
                found = true;
                break;
            }
        }
        if (found) {
            const error = {
                errmsg: 'Delete the associated rentals first.'
            };
            next(error);
        } else {
            next();
        }
    })
})

module.exports = mongoose.model('Movie', movieSchema);