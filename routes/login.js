const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  let isUser;
  try {
    isUser = await User.findOne({
      where: {
        username,
      },
      raw: true,
    });
  } catch (err) {
    res.json({ isUser: false, message: 'Пользователь с именем не существует. Пройдите регистрацию' });
  };

  let isPassword;
  try {
    if (isUser) {
      isPassword = await bcrypt.compare(password, isUser.password);
    }
  } catch (err) {
    res.json({ isPassword: false, message: 'Ваш пароль неверный' });
  }
});

module.exports = router;
