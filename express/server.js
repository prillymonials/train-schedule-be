const express = require('express');
const cors = require('cors');

const stationRoutes = require('../routes/stations.js');
const scheduleRoutes = require('../routes/schedules.js');
const authRoutes = require('../routes/auth.js');
const bookRoutes = require('../routes/books.js');
const serverless = require('serverless-http');

const app = express();

app.use(express.json({
  limit: '30mb',
  extended: true
}));
app.use(express.urlencoded({
  limit: '30mb',
  extended: true
}));
app.use(cors());

app.use('/auth', authRoutes);
app.use('/stations', stationRoutes);
app.use('/schedules', scheduleRoutes);
app.use('/books', bookRoutes);

module.exports = app;
module.exports.handler = serverless(app);
