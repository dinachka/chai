module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.id = req.session.user.id;
    res.locals.username = req.session.user.username;
    res.locals.email = req.session.user.email;
    res.locals.isAdmin = req.session.user.isAdmin;
    res.locals.isSession = req.session.user.isSession;
  } else {
    res.locals.isSession = false;
  }
  next();
};
