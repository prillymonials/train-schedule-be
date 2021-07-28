const sq = require("sequelize");
const db = require("../database/connection");

async function getAllStations() {
  const stations = await db.query(
    'SELECT id, code, name, latitude, longitude FROM stations ORDER BY name ASC',
    { type: sq.QueryTypes.SELECT },
  );
  
  return stations;
}

module.exports = {
  getAllStations,
};
