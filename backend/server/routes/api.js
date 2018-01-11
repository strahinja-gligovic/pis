const express = require('express');
const router = express.Router();
const loginRoute = require("../security/security").loginRoute;

router.post('/login', (req, res) => loginRoute(req, res))

router.get('/hi', (req, res) => {
  res.send('zdravo zdravo');
});

router.get('/wot', (req, res) => {
  res.send({hehe : 'haha'});
})

module.exports = router;