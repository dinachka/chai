const express = require('express');

const router = express.Router();
const { Chai } = require('../db/models');

/* GET home page. */

router.get('/', async (req, res) => {
  const coordinates = await Chai.findAll({ raw: true });
  res.render('index', {
    coordinates,
    // user: req.session.user,
  });
});

router.post('/', async (req, res) => {
  const coordinates = await Chai.findAll({ raw: true });
  res.json({ coordinates });
});

// router.get('/', (req, res) => {
//   if (req.session.user.isSession) {
//     res.render('index', {
//       isSession: req.session.user.isSession,
//     });
//   } else {
//     res.render('index');
//   }
// });
module.exports = router;
