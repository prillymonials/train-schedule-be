const express = require('express');
const { getStations } = require('../controllers/stations.js');

const router = express.Router();

router.get('/', getStations);

module.exports = router;
