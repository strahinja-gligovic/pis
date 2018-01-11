
const express = require('express');
const router = express.Router();
const loginRoute = require("../security/security").loginRoute;
const checkIfAuthenticated =  require('../security/security').checkIfAuthenticated;

router.post('/login', (req, res) => loginRoute(req, res))

router.use(checkIfAuthenticated);

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