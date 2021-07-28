const sq = require("sequelize");
const db = require("../database/connection");

async function getAllSchedules() {
  const schedules = await db.query(
    `SELECT
      sc.id, sc.train_id, sc.train_line, s1.name as station_from, s2.name as station_to, sc.start_time, sc.end_time
    FROM
      schedules sc
      JOIN routes r ON (sc.route_id = r.id)
      JOIN stations s1 ON (r.station_code_from = s1.code)
      JOIN stations s2 ON (r.station_code_to = s2.code)
    ORDER BY
      sc.start_time ASC
    `,
    { type: sq.QueryTypes.SELECT },
  );
  
  return schedules;
}

async function getAllSchedulesByStationCode(stationCode) {
  const schedules = await db.query(
    `SELECT DISTINCT
      sc.id, sc.train_id, sc.train_line, s1.name as station_from, s2.name as station_to, sc.start_time, sc.end_time
    FROM
      schedule_details scd
      JOIN schedules sc ON (scd.schedule_id = sc.id)
      JOIN routes r ON (sc.route_id = r.id)
      JOIN stations s1 ON (r.station_code_from = s1.code)
      JOIN stations s2 ON (r.station_code_to = s2.code)
    WHERE
      scd.station_code = :stationCode
    ORDER BY
      sc.start_time ASC
    `,
    {
      replacements: { stationCode },
      type: sq.QueryTypes.SELECT
    },
  );
  
  return schedules;
}

async function getSchedulesById(scheduleId) {
  const schedules = await db.query(
    `SELECT
      scd.id, scd.schedule_id, st.name, scd.arrival_time
    FROM
      schedule_details scd
      JOIN stations st ON (scd.station_code = st.code)
    WHERE schedule_id = :scheduleId
    ORDER BY id ASC
    `,
    {
      replacements: { scheduleId },
      type: sq.QueryTypes.SELECT
    },
  );
  
  return schedules;
}

module.exports = {
  getAllSchedules,
  getAllSchedulesByStationCode,
  getSchedulesById,
};
