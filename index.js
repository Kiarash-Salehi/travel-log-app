if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const favicon = require('express-favicon');

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
app.use(favicon(__dirname + '/client/public/favicon.ico'));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname));
  app.use(express.static(__dirname + '/client/build'));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}
app.use('/', logsRouter);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
app.listen(process.env.PORT);
