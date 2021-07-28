import {
  getAllSchedules,
  getAllSchedulesByStationCode,
  getSchedulesById,
} from "../models/schedules.js";

export const getSchedules = async (req, res) => {
  try {
    const stationCode = req.params.stationCode;
    let schedules = [];

    if (stationCode === 'undefined' || stationCode === undefined) {
      schedules = await getAllSchedules();
    } else {
      schedules = await getAllSchedulesByStationCode(stationCode);
    }

    res.status(200).json(schedules);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getScheduleDetailById = async (req, res) => {
  try {
    const scheduleId = req.params.scheduleId;
    const schedules = await getSchedulesById(scheduleId);
    res.status(200).json(schedules);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
