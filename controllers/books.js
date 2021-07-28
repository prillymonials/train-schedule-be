import {
  createBook,
  getBooksByStatus,
  getRatesStation,
  getRoutesByFromCode,
  getStationDestination,
  getTimeByRouteAndStationCode,
} from "../models/books.js";

export const getRoutesByOrigin = async (req, res) => {
  try {
    const stationCode = req.params.code;
    const routes = await getRoutesByFromCode(stationCode);
    res.status(200).json(routes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDestionationByRoutesId = async (req, res) => {
  try {
    const routeId = req.params.routeId;
    const stations = await getStationDestination(routeId);
    res.status(200).json(stations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTimeScheduleFromRoutesAndOrigin = async (req, res) => {
  try {
    const routeId = req.params.routeId;
    const stationCode = req.params.code;
    const schedules = await getTimeByRouteAndStationCode(routeId, stationCode);
    res.status(200).json(schedules);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRatesFromOriginAndDestination = async (req, res) => {
  try {
    const stationFrom = req.params.codeFrom;
    const stationTo = req.params.codeTo;
    const rates = await getRatesStation(stationFrom, stationTo);
    res.status(200).json(rates);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postBook = async (req, res) => {
  try {
    const userId = req.body.userId;
    const routeId = req.body.routeId;
    const stationCodeFrom = req.body.stationCodeFrom;
    const stationCodeTo = req.body.stationCodeTo;
    const bookTime = req.body.bookTime;
    const bookDate = req.body.bookDate;
    const rate = req.body.rate;

    const book = await createBook(userId, routeId, stationCodeFrom, stationCodeTo, bookTime, bookDate, rate);
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getActiveBooks = async (req, res) => {
  try {
    const userId = req.query.user_id;
    const books = await getBooksByStatus(userId, 'ACTIVE');
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getHistoryBooks = async (req, res) => {
  try {
    const userId = req.query.user_id;
    const books = await getBooksByStatus(userId, 'HISTORY');
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTodayBooks = async (req, res) => {
  try {
    const userId = req.query.user_id;
    const books = await getBooksByStatus(userId, 'TODAY');
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
