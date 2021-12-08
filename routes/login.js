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
  let isPassword;
  try {
    isUser = await User.findOne({
      where: {
        username,
      },
      raw: true,
    });
  } catch (err) {
    return res.json({ login: false, message: 'Пользователь с именем не существует. Пройдите регистрацию', path: '/login' });
  }

  try {
    // if (isUser) {
    isPassword = await bcrypt.compare(password, isUser.password);
    // }
  } catch (err) {
    return res.json({ login: false, message: 'Ваш пароль неверный' });
  }

  if (!isPassword) {
    return res.json({ login: false, message: 'incorrect password' });
  }

  if (isUser && isPassword) {
    req.session.user = {
      id: isUser.id,
      username: isUser.username,
      email: isUser.email,
      isSession: true,
    };
    return res
      .status(200)
      .json({
        login: true,
        message: 'Успешный вход',
      });
  }
});

module.exports = router;
