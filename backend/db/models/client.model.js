const mongoose = require('mongoose');

var clientSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    dob: Date,
    address: {
        street: String,
        city: String,
        zip: String,
        country: String
    }
});

module.exports = mongoose.model('Client', clientSchema);