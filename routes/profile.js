const express = require('express');

const router = express.Router();
const { Chai } = require('../db/models');
const { User } = require('../db/models');

router.get('/', (req, res) => {
  res.render('profile');
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


// router.put('/', async (req, res) => {
//   const { username } = req.body;
//   try {
//     await User.findOne({ raw: true });

//   } catch (error) {
//     return res.json({ message: 'не удалось изменить Ваше имя' });
//   }
// })

module.exports = router;
