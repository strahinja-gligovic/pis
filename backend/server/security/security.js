const jwt = require('jsonwebtoken');
const fs = require('fs');
const expressJwt = require('express-jwt');
var cookieParser = require('cookie-parser')
const secret = 'shhhhh';

exports.loginRoute = function loginRoute(req, res) {
    const username = req.body.username,
        password = req.body.password;

    // validate pasword
    if (true) {
        const jwtToken = jwt.sign({ username: username }, secret, { expiresIn: 7200 });

        // res.cookie("SESSIONID", jwtToken, { httpOnly: true, secure: false });

        res.status(200).json(
            {
                token: jwtToken,
                expiresIn: 7200
            }
        );

    } else {
        res.sendStatus(401);
    }
}

const checkIfAuthenticated = expressJwt({
    secret: secret,
    getToken: function (req) {
        return req.cookies['id_token'];
    }
});

exports.checkIfAuthenticated = checkIfAuthenticated;
