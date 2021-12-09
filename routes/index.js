const express = require('express');
const router = express.Router();
const { Chai } = require('../db/models');

/* GET home page. */
router.get('/', async (req, res) => {
  const coordinates = await Chai.findAll({ raw: true });
  res.render('index', {
    coordinates,
  });
});

router.post('/', async (req, res) => {
  const coordinates = await Chai.findAll({ raw: true });
  res.json({ coordinates });
});

module.exports = router;
