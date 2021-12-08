const router = require('express').Router();

router
  .get('/', (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).json({ message: 'Ошибка при выходе!', status: false });
      }

      res
        .clearCookie('uSID')
        .json({ message: 'Вы вышли из системы!', status: true, path: '/logout' });
    });
  });

module.exports = router;
