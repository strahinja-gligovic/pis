const fs = require('fs');
const cookieParser = require('cookie-parser');
const User = require('../../db/models/user.model');
// modul za kreiranje JWT
const jwt = require('jsonwebtoken');
// modul za verifikaciju JWT
const expressJwt = require('express-jwt');
// random string za verifikaciju JWT
const secret = 'shhhhh';



exports.loginRoute = function loginRoute(req, res) {
    // kupimo parametre iz zahteva
    const username = req.body.username,
        password = req.body.password;

    // pronalazimo usera iz DB
    User.findOne({ username: username }, function (error, user) {
        if (error || !user) {
            if (error) console.log(error);
            res.sendStatus(401);
            return;
        }
        user.comparePasswords(password, function (error, result) {
            if (error) {
                console.log(error);
                result = false;
            }
            if (result) {
                // kreiramo JWT
                const jwtToken = jwt.sign({ username: username }, secret, { expiresIn: 7200 });
                // obaveštavamo o uspešnosti i šaljemo token frontendu
                // token traje 2 sata
                // ponovo šaljemo ovaj podatak zbog lakšeg upravljanja
                res.status(200).json({token: jwtToken, expiresIn: 7200});
            } else {
                // obaveštavamo o grešci
                res.sendStatus(401);
            }
        })
    });
}

exports.registerRoute = function registerRoute(req, res) {
    // kreiramo mongoose model na osnovu JSON u body zahteva
    var user = new User(req.body);
    // čuvamo korisnika u DB
    // .pre middleware radi hash
    user.save(function (error, user, rows) {
        // ukoliko postoji greška obavestavamo o istoj
        if (error) {
            res.status(500).json(error);
            console.log(error);
            return;
        }

        if (user && (rows > 0)) {
            // obaveštavamo o uspešnosti
            res.status(200).json(user);
        }

    });

}

// koristimo funkciju iz modula koja proverava da li je JWT ispravan
const checkIfAuthenticated = expressJwt({
    secret: secret,
    // navodimo funkciji na koji način da dođe do JWT
    getToken: function (req) {
        return req.cookies['id_token'];
    }
});

exports.checkIfAuthenticated = checkIfAuthenticated;
