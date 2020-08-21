/* eslint-disable linebreak-style */
const { Router } = require('express');
const router = Router();
const LogEntry = require('../models/LogEntry');

router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdLog = await logEntry.save();
    res.json(createdLog);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;