const express = require('express');
const movieRouter = express.Router();
const Movie = require('../../db/models/movie.model');

movieRouter.get('/get/:_id', function (req, res) {
    // iz URL parametra kupimo ObjectId
    const movie_id = req.params._id;

    // prosleđujemo za pretragu
    Movie.findById(movie_id, function (error, movie) {
        // obaveštavamo o grešci
        if (error) {
            res.status(500).json({ errmsg: "No such movie." });
            return;
        }

        if (movie) {
            // odgovaramo objektom
            res.json(movie);
        } else {
            // obaveštavamo o grešci
            res.status(500).json({ errmsg: "No such movie." });
        }
    })
})

movieRouter.get('/list/', function (req, res) {
    // prazan objekat podrazumeva sve dokumente
    Movie.find({}, function (error, movies) {
        res.json(movies);
    })
})

movieRouter.post('/add/', function (req, res) {
    // iz body zahteva kreiramo instancu movie modela
    const movie = new Movie(req.body);

    movie.save(function (error, movie) {
        if (error) {
            res.status(500).json({ errmsg: "That's not a movie." });
        } else {
            res.json(movie);
        }
    });
})

movieRouter.put('/update/', function (req, res) {
    const movie_id = req.body._id;

    // prvo pronalazimo primljeni film
    Movie.findOne({ _id: movie_id }, function (error, movie) {
        if (error || !user) {
            res.status(500).json({ errmsg: "No such movie." });
        } else {
            // setujemo nove vrednosti iz zahteva
            movie.set(req.body);

            // upisujemo izmenjeni film
            movie.save(function (error, movie) {
                if (error) {
                    res.status(500).json({ errmsg: "Woops." });
                } else {
                    res.json(movie);
                }
            })
        }
    })
})

movieRouter.delete('/delete/:_id', function (req, res) {
    const movie_id = req.params._id;

    Movie.findByIdAndRemove(movie_id, function(error) {
        if (error) {
            res.status(500).json({ errmsg: "Woops." });
        } else {
            // sve OK !
            res.sendStatus(200);
        }
    })
})

module.exports = movieRouter;