import sq from "sequelize";
import db from "../database/connection.js";

export async function getAllStations() {
  const stations = await db.query(
    'SELECT id, code, name, latitude, longitude FROM stations ORDER BY name ASC',
    { type: sq.QueryTypes.SELECT },
  );
  
  return stations;
}

