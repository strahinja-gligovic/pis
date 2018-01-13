const express = require('express');
const router = express.Router();
// činimo dostupnim funkcije iz security servisa
const security = require("../security/security.service");

// rute za autentifikaciju
router.post('/login', (req, res) => security.loginRoute(req, res));
router.post('/register', (req, res) => security.registerRoute(req, res));

// ovaj middleware proverava da li je korisnik ulogovan
// tek ovde ga uključujemo da bi rute za autentifikaciju bile dostupne
router.use(security.checkIfAuthenticated);

router.post('/secCheck', (req, res) => {
  res.json({zdravo : 'batice'});
})

router.get('/hi', (req, res) => {
  res.send('zdravo zdravo');
});

router.get('/wot', (req, res) => {
  res.send({ hehe: 'haha' });
})

module.exports = router;