const express = require('express');
const router = express.Router();
const { Chai } = require('../db/models');

/* GET home page. */
router.get('/:id', async (req, res) => {
  let chai;
  try {
    chai = await Chai.findOne({
      where: {
        id: req.params.id,
      },
      raw: true,
    });
  } catch (error) {
    res.send('err');
  }
  res.render('article', { chai });
});

module.exports = router;
