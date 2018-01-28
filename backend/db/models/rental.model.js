const mongoose = require('mongoose');
const Client = require('./client.model');
const User = require('./user.model');
const Movie = require('./movie.model');

var rentalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    startDate: Date,
    endDate: Date,
    returned: Boolean
});

module.exports = mongoose.model('Rental', rentalSchema);