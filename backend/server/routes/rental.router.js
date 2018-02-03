const express = require('express');
const rentalRouter = express.Router();
const Rental = require('../../db/models/rental.model');
const Movie = require('../../db/models/movie.model');


rentalRouter.get('/get/:_id', function (req, res) {
    const rental_id = req.params._id;

    Rental.findById(rental_id).exec(function (error, rental) {
        if (error) {
            res.status(500).json({
                errmsg: 'Error fetching rental.'
            });
        }

        if (rental) {
            res.json(rental);
        }
    })
})

rentalRouter.get('/list/', function (req, res) {
    // http://mongoosejs.com/docs/populate.html
    Rental.find({}).populate('movie', ['title'])
        .populate('client', ['firstName', 'lastName'])
        .populate('user', ['username'])
        .exec(function (error, rentals) {
            if (error) {
                res.status(500).json({
                    errmsg: 'Error fetching rentals.'
                })
            }

            res.json(rentals);
        })
})

rentalRouter.post('/add/', function (req, res) {
    let rental = new Rental(req.body);

    const movie_id = req.body.movie._id;

    Movie.findById(movie_id).exec(function (error, movie) {
        if (error) {
            res.status(500).json({
                errmsg: 'Error fetching movie.'
            });
        }
        movie.remaining = movie.remaining - 1;

        movie.save(function (error, movie) {
            if (error) {
                res.status(500).json({
                    errmsg: 'Error saving movie.'
                });
            } else {
                rental.save(function (error, rental) {
                    if (error) {
                        res.status(500).json({
                            errmsg: 'Error saving rental.'
                        });
                    } else {
                        res.json(rental);
                    }
                });
            }
        })
    })
})

rentalRouter.put('/update/', function (req, res) {
    const rental_id = req.body._id;

    Rental.findOne({
        _id: rental_id
    }, function (error, rental) {
        if (error || !rental) {
            res.status(500).json({
                errmsg: 'Error fetching rental.'
            });
        } else {
            if (req.body.returnDate) {
                const movie_id = rental.movie;

                Movie.findById(movie_id).exec(function (error, movie) {
                    if (error || !movie) {
                        res.status(500).json({
                            errmsg: 'Error fetching movie.'
                        });
                    }

                    movie.remaining = movie.remaining + 1;

                    movie.save(function (error, movie) {
                        if (error) {
                            res.status(500).json({
                                errmsg: 'Error saving movie.'
                            });
                        } else {
                            rental.set(req.body);

                            rental.save(function (error, rental) {
                                if (error) {
                                    res.status(500).json({
                                        errmsg: 'Error saving rental.'
                                    });
                                } else {
                                    res.json(rental);
                                }
                            })
                        }
                    })
                })
            }
        }
    })
})

rentalRouter.delete('/delete/:_id', function (req, res) {
    const rental_id = req.params._id;

    Rental.findByIdAndRemove(rental_id, function (error) {
        if (error) {
            res.status(500).json({
                errmsg: 'Error deleting rental.'
            });
        } else {
            res.status(200).send('OK');
        }
    })
})

module.exports = rentalRouter;