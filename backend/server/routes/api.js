const express = require('express');
const router = express.Router();
const movieRouter = require('./movie.router');
const clientRouter = require('./client.router');
// činimo dostupnim funkcije iz security servisa
const security = require("../security/security.service");

// rute za autentifikaciju
router.post('/login', (req, res) => security.loginRoute(req, res));
router.post('/register', (req, res) => security.registerRoute(req, res));
router.post('/logout', (req, res) => security.logoutRoute(req, res));

router.use('/movie', movieRouter);
router.use('/client', clientRouter);


// ovaj middleware proverava da li je korisnik ulogovan
// tek ovde ga uključujemo da bi rute za autentifikaciju bile dostupne
router.use(security.checkIfAuthenticated);


module.exports = router;