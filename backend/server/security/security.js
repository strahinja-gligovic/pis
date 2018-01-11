const jwt = require('jsonwebtoken');
const fs = require('fs');

const RSA_PRIVATE_KEY = 'RSA_PRIVATE_KEY';

exports.loginRoute = function loginRoute(req, res) {
    const username = req.body.username,
        password = req.body.password;

    // validate pasword
    if (true) {
        const jwtToken = jwt.sign({ username: username }, 'shhhhh', { expiresIn: 7200 });

        res.cookie("SESSIONID", jwtToken, { httpOnly: true, secure: false });

        res.status(200).json({
            token: jwtToken,
            expiresIn: 7200
        }
        );

    } else {
        res.sendStatus(401);
    }
}