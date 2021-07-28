const express = require('express');
const {
  getRoutesByOrigin,
  getDestionationByRoutesId,
  getTimeScheduleFromRoutesAndOrigin,
  getRatesFromOriginAndDestination,
  postBook,
  getActiveBooks,
  getHistoryBooks,
  getTodayBooks,
} = require('../controllers/books.js');

const router = express.Router();

router.post('/', postBook);
router.get('/active', getActiveBooks);
router.get('/history', getHistoryBooks);
router.get('/today', getTodayBooks);
router.get('/routes/:code', getRoutesByOrigin);
router.get('/stations/:routeId', getDestionationByRoutesId);
router.get('/schedules/:routeId/:code', getTimeScheduleFromRoutesAndOrigin);
router.get('/rates/:codeFrom/:codeTo', getRatesFromOriginAndDestination);

module.exports = router;
