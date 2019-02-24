const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const cors = require('cors')

require('dotenv').config();

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const projectRouter = require('./routes/project');

const { sequelize } = require('./models');
const passportConfig = require('./passport');

const app = express();
app.use(cors())

sequelize.sync();
passportConfig(passport);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 8001);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public'))); // /main.css
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session()); // deserializeUser 실행

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/project', projectRouter);

app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log('8001번 포트에서 서버 실행중')
});