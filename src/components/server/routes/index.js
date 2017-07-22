const express = require('express');
const router = express.Router();

const peopleRoutes = require('./people');

router.all('/', function(req, res) {
  res.end('Hello');
})
router.use('/people', peopleRoutes);

module.exports = router;
