const express = require('express');
const {
  getSchedules,
  getScheduleDetailById,
} = require('../controllers/schedules.js');

const router = express.Router();

router.get('/', getSchedules);
router.get('/details/:scheduleId', getScheduleDetailById);
router.get('/:stationCode', getSchedules);

module.exports = router;
