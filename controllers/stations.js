import { getAllStations } from "../models/stations.js";
import getHaversine from "../utils/haversine.js";

export const getStations = async (req, res) => {
  try {
    const lat = req.query.lat;
    const lng = req.query.lng;

    let stations = await getAllStations();

    if (lat !== undefined && lng !== undefined) {
      stations = stations.filter(station => {
        const length = getHaversine(lat, lng, station.latitude, station.longitude);
        return length < 3000;
      }).sort((stationA, stationB) => {
        const lengthA = getHaversine(lat, lng, stationA.latitude, stationA.longitude);
        const lengthB = getHaversine(lat, lng, stationB.latitude, stationB.longitude);
        return lengthA - lengthB;
      });
    }
    res.status(200).json(stations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
