const express = require('express');
const rentalRouter = express.Router();
const Rental = require('../../db/models/rental.model');

rentalRouter.get('/get/:_id', function (req, res) {
    const rental_id = req.params._id;

    Rental.findById(rental_id, function (error, rental) {
        if (error) {
            res.status(500).json({ errmsg: "No such rental." });
            return;
        }

        if (rental) {
            res.json(rental);
        } else {
            res.status(500).json({ errmsg: "No such rental." });
        }
    })
})

rentalRouter.get('/list/', function (req, res) {
    Rental.find({}, function (error, rentals) {
        res.json(rentals);
    })
})

rentalRouter.post('/add/', function (req, res) {
    let rental = new Rental(req.body);

    rental.save(function (error, rental) {
        if (error) {
            res.status(500).json({ errmsg: "That's not a rental." });
        } else {
            res.json(rental);
        }
    });
})

rentalRouter.put('/update/', function (req, res) {
    Rental.findOne({ _id: rental_id }, function (error, rental) {
        if (error || !rental) {
            res.status(500).json({ errmsg: "No such rental." });
        } else {
            rental.set(req.body);

            rental.save(function (error, rental) {
                if (error) {
                    res.status(500).json({ errmsg: "Woops." });
                } else {
                    res.json(rental);
                }
            })
        }
    })
})

rentalRouter.delete('/delete/:_id', function (req, res) {
    const rental_id = req.params._id;

    Rental.findByIdAndRemove(rental_id, function (error) {
        if (error) {
            res.status(500).json({ errmsg: "Woops." });
        } else {
            res.sendStatus(200);
        }
    })
})

module.exports = rentalRouter;