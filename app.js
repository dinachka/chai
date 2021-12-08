const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const SessionFileStore = require('session-file-store')(expressSession);
const bcrypt = require('bcrypt');
const PORT = process.env.PORT ?? 3000;
const app = express();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.listen(PORT, () => {
  console.log('Сервер работает :)', PORT);
});


const sessionConfig = {
  store: new SessionFileStore(),
  name: 'user_sid',
  secret: 'I LOVE CATS',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14, // 14 days
    httpOnly: true,
  },
};
app.use(morgan('dev'));
app.use(expressSession(sessionConfig));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // for req.body
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const articleRouter = require('./routes/article');
const welcomeRouter = require('./routes/welcome');
const profileRouter = require('./routes/profile');
const registrationRouter = require('./routes/registration');
const loginRouter = require('./routes/login');
const logoutLink = require('./routes/logout');
// const Router = require('./routes/');

app.use('/home', indexRouter);
app.use('/article', articleRouter);
app.use('/', welcomeRouter);
app.use('/profile', profileRouter);
app.use('/registration', registrationRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutLink);
