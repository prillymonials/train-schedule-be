const sq = require("sequelize");
const db = require("../database/connection");

async function getRoutesByFromCode(fromCode) {
  const stations = await db.query(
    `SELECT
      r.id, r.station_code_from, s1.name as station_name_from,
      r.station_code_to, s2.name as station_name_to, r.remarks
    FROM
      route_details rd
      JOIN routes r ON (rd.route_id = r.id)
      JOIN stations s1 ON (r.station_code_from = s1.code)
      JOIN stations s2 ON (r.station_code_to = s2.code)
    WHERE
      rd.station_code = :fromCode AND r.station_code_to <> :fromCode
    ORDER BY
      station_name_from ASC
    `,
    {
      replacements: { fromCode },
      type: sq.QueryTypes.SELECT
    },
  );
  
  return stations;
}

async function getStationDestination(routeId) {
  const stations = await db.query(
    `SELECT rd.station_code, st.name
    FROM route_details rd JOIN stations st ON (rd.station_code = st.code)
    WHERE rd.route_id = :routeId
    ORDER BY ranking ASC
    `,
    {
      replacements: { routeId },
      type: sq.QueryTypes.SELECT
    },
  );
  
  return stations;
}

async function getTimeByRouteAndStationCode(routeId, stationCode) {
  const arrivalTime = await db.query(
    `SELECT scd.id, scd.station_code, scd.arrival_time
    FROM
      schedule_details scd
      JOIN schedules sc ON (sc.id = scd.schedule_id)
    WHERE scd.station_code = :stationCode AND sc.route_id = :routeId
    `,
    {
      replacements: { routeId, stationCode },
      type: sq.QueryTypes.SELECT
    },
  );
  
  return arrivalTime;
}

async function getRatesStation(stationCodeFrom, stationCodeTo) {
  const rates = await db.query(
    `SELECT id, rate FROM rates
    WHERE station_code_from = :stationCodeFrom AND station_code_to = :stationCodeTo
    `,
    {
      replacements: { stationCodeFrom, stationCodeTo },
      type: sq.QueryTypes.SELECT
    },
  );
  
  return rates;
}

async function createBook(userId, routeId, stationCodeFrom, stationCodeTo, bookTime, bookDate, rate) {
  const user = await db.query(
    `INSERT INTO books(user_id, route_id, station_code_from, station_code_to, book_time, book_date, rate)
    VALUES (:userId, :routeId, :stationCodeFrom, :stationCodeTo, :bookTime, :bookDate, :rate)`,
    {
      replacements: { userId, routeId, stationCodeFrom, stationCodeTo, bookTime, bookDate, rate },
      type: sq.QueryTypes.INSERT
    },
  );

  return user;
}

async function getBooksByStatus(userId, status) {
  let bookStatusQuery;
  let sortDate;
  if (status === 'ACTIVE') {
    bookStatusQuery = 'b.book_date >= CURRENT_DATE';
    sortDate = 'ASC';
  } else if (status === 'HISTORY') {
    bookStatusQuery = 'b.book_date < CURRENT_DATE';
    sortDate = 'DESC';
  } else {
    bookStatusQuery = 'b.book_date = CURRENT_DATE';
    sortDate = 'ASC';
  }

  const rates = await db.query(
    `SELECT
      b.id,
      s1.name as route_station_from,
      s2.name as route_station_to,
      s3.name as book_station_from,
      s4.name as book_station_to,
      sc.train_id,
      sc.train_line,
      sc.start_time,
      sc.end_time,
      b.book_time,
      b.book_date,
      b.rate
    FROM
      books b
      JOIN schedule_details scd ON (b.station_code_from = scd.station_code AND b.book_time = scd.arrival_time)
      JOIN schedules sc ON (sc.id = scd.schedule_id)
      JOIN routes r ON (r.id = b.route_id)
      JOIN stations s1 ON (r.station_code_from = s1.code)
      JOIN stations s2 ON (r.station_code_to = s2.code)
      JOIN stations s3 ON (b.station_code_from = s3.code)
      JOIN stations s4 ON (b.station_code_to = s4.code)
    WHERE
      b.user_id = :userId
      AND ${bookStatusQuery}
    ORDER BY
      b.book_date ${sortDate}, b.book_time ASC
    `,
    {
      replacements: { userId },
      type: sq.QueryTypes.SELECT
    },
  );
  
  return rates;
}

module.exports = {
  getRoutesByFromCode,
  getStationDestination,
  getTimeByRouteAndStationCode,
  getRatesStation,
  createBook,
  getBooksByStatus,
};
