const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('registration');
});

router.post('/', async (req, res) => {
  const {
    username, email, password, repeatPassword,
  } = req.body;
  let thisUser;
  console.log(password, repeatPassword);
  if (password === repeatPassword) {
    try { 
      thisUser = await User.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
      });
    } catch (error) {
      return res.json({ UserRegistered: false, message: 'Ошибка при создании пользователя!' });
    }
  } else {
    return res.json({ UserRegistered: false, path: '/registration', message: 'Пароли не совпадают!' });
  }

  if (thisUser) {
    req.session.user = {
      id: thisUser.id,
      username,
      email,
      isSession: true,
    };
  }
  res.json({ UserRegistered: true, message: 'Регистрация успешно завершена!' });
});

module.exports = router;
