const express = require('express');

const router = express.Router();
const { Chai } = require('../db/models');

router.get('/', (req, res) => {
  const { isAdmin } = req.session.user;
  console.log(req.session.user);
  res.render('profile', {
    isAdmin,
  });
});

router.post('/', async (req, res) => {
  const {
    title, latitude, longitude, description, image,
  } = req.body;

  const currentUser = req.session.user;

  try {
    await Chai.create({
      title,
      description,
      latitude,
      longitude,
      image,
      userId: currentUser.id,
    });
    res.json({ chaiAdded: true, message: 'чай успешно добавлен' });
  } catch (err) {
    return res.json({ chaiAdded: false, message: 'не удалось добавить чай в базу данных' });
  }
});


module.exports = router;
