/* eslint-disable linebreak-style */
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');

const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const middlewares = require('./middlewares');
const logsRouter = require('./api/logs');

app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get((req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

}
app.get('/', (req, res) => { res.json({ message: 'Hello World' }); });
app.use('/api/logs', logsRouter);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
app.listen(process.env.PORT);
