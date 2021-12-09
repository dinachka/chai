const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {
    user: req.session.user,
  });
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
