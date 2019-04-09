const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
require('dotenv').config();

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const projectRouter = require('./routes/project');
const todoRouter = require('./routes/todo');
const problemRouter = require('./routes/problem');
const concernRouter = require('./routes/concern');
const workRouter = require('./routes/work');

const { sequelize } = require('./models');
require('./passport');
const app = express();
app.use(require('connect-history-api-fallback')());
app.use(cors())
sequelize.sync();
const logger = require('./logger');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 8001);

if(process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(helmet()); // 보안
  app.use(hpp()); // http 공격 대비
} else {
  app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/projects', projectRouter);
app.use('/todos', todoRouter);
app.use('/problems', problemRouter);
app.use('/concerns', concernRouter);
app.use('/works', workRouter);

app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  logger.info('hello'); // console.info 대체
  logger.error(err.message); // console.error 대체
  next(err);
});

app.use((err, req, res, next) => {
  res.status(res.statusCode || 500)
  res.json({ error: err.message || 'internal server error' })
});

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')}번 포트에서 서버 실행중`);
});