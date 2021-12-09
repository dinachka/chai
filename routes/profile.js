const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('profile', {
    user: req.session.user,
  });
});

module.exports = router;
