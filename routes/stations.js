import express from 'express';
import { getStations } from '../controllers/stations.js';

const router = express.Router();

router.get('/', getStations);

export default router;
