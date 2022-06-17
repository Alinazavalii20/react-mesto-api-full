require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
/* const cookieParser = require('cookie-parser'); */
const { celebrate, errors, Joi } = require('celebrate');
const cors = require('cors');

const auth = require('./middlewares/auth');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { login } = require('./controllers/users');
const { creatUser } = require('./controllers/users');

const { PORT = 4000, BASE_PATH } = process.env;
const app = express();

app.use(requestLogger);
app.use(express.json());

const CORS_CONFIG = {
  credentials: true,
  origin: [
    'http://localhost:3000',
  ],
  method: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
};
app.options('*', cors());
app.use(cors(CORS_CONFIG));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* app.use(cookieParser()); */
console.log(process.env.NODE_ENV);

mongoose.connect('mongodb://localhost:27017/mestodb', () => {
  console.log('Connect to mydb');
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(w{3}\.)?[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+)*#*$/),
    about: Joi.string().min(2).max(30),
  }),
}), creatUser);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardsRouter);

app.use('/', auth, (req, res, next) => {
  next(new NotFoundError('Страница по указанному адресу не найдена'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
  console.log(BASE_PATH);
});
