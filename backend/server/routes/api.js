const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('zdravo zdravo');
});

module.exports = router;