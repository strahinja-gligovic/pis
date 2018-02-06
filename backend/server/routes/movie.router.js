const express = require('express');
const movieRouter = express.Router();
const Movie = require('../../db/models/movie.model');
const MONGO_DUPLICATE_CODE = require('../../const').MONGO_DUPLICATE_CODE;

movieRouter.get('/get/:_id', function (req, res) {
    const movie_id = req.params._id;

    Movie.findById(movie_id, function (error, movie) {
        if (error) {
            res.status(500).json({
                errmsg: 'No such movie.'
            });
        }

        if (movie) {
            res.json(movie);
        } else {
            res.status(500).json({
                errmsg: 'No such movie.'
            });
        }
    })
})

movieRouter.get('/list/', function (req, res) {
    const excludeFilter = {};

    if (req.query.exclude) {
        // objekat sa svim query parametrima
        const queryParams = req.query;
        // zanima nas samo exclude parametar koji dolazi u formatu
        // polje1,polje2,...
        const excludeFieldsList = queryParams.exclude.split(',');

        for (let i = 0; i < excludeFieldsList.length; i++) {
            const field = excludeFieldsList[i];
            excludeFilter[field] = 0;
        }
    }

    // prazan objekat podrazumeva sve dokumente
    // drugi parametar je objekat u formatu { poljeKojeNeZelimo: 0, ... }
    Movie.find({}, excludeFilter, function (error, movies) {
        if (error) {
            res.status(500).json({
                errmsg: 'Error fetching movies.'
            })
        }

        res.json(movies);
    })
})

movieRouter.post('/add/', function (req, res) {
    const movie = new Movie(req.body);

    movie.save(function (error, movie) {
        if (error) {
            if (error.code === MONGO_DUPLICATE_CODE) {
                res.status(500).json({
                    errmsg: 'You already added this movie from TMDb.'
                });
            } else {
                res.status(500).json({
                    errmsg: 'Error saving movie.'
                });
            }
        } else {
            res.json(movie);
        }
    });
})

movieRouter.put('/update/', function (req, res) {
    const movie_id = req.body._id;

    Movie.findOne({
        _id: movie_id
    }, function (error, movie) {
        if (error || !movie) {
            res.status(500).json({
                errmsg: 'Error fetching movie.'
            });
        } else {
            movie.set(req.body);

            movie.save(function (error, movie) {
                if (error) {
                    res.status(500).json({
                        errmsg: 'Error saving movie.'
                    });
                } else {
                    res.json(movie);
                }
            })
        }
    })
})

movieRouter.delete('/delete/:_id', function (req, res) {
    const movie_id = req.params._id;

    Movie.findById(movie_id, function (error, movie) {
        if (error) {
            res.status(500).json({
                errmsg: 'No such movie.'
            });
        }
        movie.remove(function (error) {
            if (error) {
                const errmsg = error.errmsg ? error.errmsg : 'Error deleting movie.';
                res.status(500).json({
                    errmsg
                });
            } else {
                res.status(200).json({
                    msg: 'OK'
                });
            }
        })
    })
})

module.exports = movieRouter;