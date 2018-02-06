const mongoose = require('mongoose');
const Client = require('./client.model');
const User = require('./user.model');
const Movie = require('./movie.model');

var rentalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
    startDate: Date,
    returnDate: Date
});

rentalSchema.pre('save', function(next) {
    const rental = this;
    const movie_id = rental.movie;

    if (this.isNew) {
        Movie.findByIdAndUpdate(movie_id, {$inc: {remaining : -1}}, next);
    } else {
        if (this.returnDate) {
            Movie.findByIdAndUpdate(movie_id, {$inc: {remaining : 1}}, next);
        } else {
            next();
        }
    }

})

module.exports = mongoose.model('Rental', rentalSchema);