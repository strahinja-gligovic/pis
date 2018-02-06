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

// implementiramo mongoose hooks (middleware)
// http://mongoosejs.com/docs/middleware.html
// prosleđena funkcija se poziva pre svake operacije 'remove'
// želimo da proverimo da se movie ne nalazi u nekom od rental
// nalik referencijalnom integritetu u relacionim db
clientSchema.pre('remove', function (next) {
    const client = this;
    const client_id = client._id;
    const Rental = mongoose.model('Rental');

    Rental.find({}, function (error, rentals) {
        let found = false;
        for (let i = 0; i < rentals.length; i++) {
            const rental = rentals[i];
            if (rental.client.equals(client_id)) {
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

module.exports = mongoose.model('Client', clientSchema);