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
    const username = req.body.username;
    const password = req.body.password;

    // pronalazimo usera iz DB
    User.findOne({ username: username }, function (error, user) {
        if (error) {
            console.log(error);
            res.status(401).json(error);
            return;
        }

        if (!user) {
            res.status(401).json({ errmsg: "Invalid credentials !" });
            return;
        }

        if (user.currentlyLoggedIn) {
            res.status(401).json({ errmsg: "Already logged in !" });
            return;
        }

        user.comparePasswords(password, function (error, result) {
            if (error) {
                console.log(error);
                res.status(401).json({ errmsg: "Invalid credentials !" });
                return;
            }

            if (result) {
                user.currentlyLoggedIn = true;
                user.save();
                // kreiramo JWT
                const jwtToken = jwt.sign({ username: username }, secret, { expiresIn: 7200 });
                // obaveštavamo o uspešnosti i šaljemo token frontendu
                // token traje 2 sata
                // ponovo šaljemo ovaj podatak zbog lakšeg upravljanja
                res.json({ token: jwtToken, expiresIn: 7200, user });
            } else {
                res.status(401).json({ errmsg: "Invalid credentials !" });
            }
        })
    });
}

exports.logoutRoute = function logoutRoute(req, res) {
    var user_id = req.body._id;

    User.findOne({ _id: user_id }, function (error, user) {
        user.set({currentlyLoggedIn : false});

        user.save(function (error, user) {
            res.sendStatus(200);
        })
    })
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
        } else {
            res.json(user);
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
