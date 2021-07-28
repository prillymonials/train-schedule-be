import express from 'express';
import {
  getSchedules,
  getScheduleDetailById,
} from '../controllers/schedules.js';

const router = express.Router();

router.get('/', getSchedules);
router.get('/details/:scheduleId', getScheduleDetailById);
router.get('/:stationCode', getSchedules);

export default router;
