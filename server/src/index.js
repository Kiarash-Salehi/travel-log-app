/* eslint-disable linebreak-style */
// https://www.youtube.com/watch?v=5pQsl9u_10M
// 1:38:13
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require('./middlewares');
const mongoose = require('mongoose');
const logsRouter = require('./api/logs');

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('connected to mongodb'));

app.get('/', (req, res) => {
  res.json({
    message: "Hello World"
  });
});

app.use('/api/logs', logsRouter);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`app is running at port ${process.env.PORT}`);
});