const express = require('express');
const router = express.Router();
const { User } = require('../db/models')

/* GET home page. */
router.get('/', (req, res) => {
  res.render('login');
});


module.exports = router;
