const express = require("express");
const router = express.Router();
const moment = require("moment");
const Trip = require("../models/trips");
const { checkBody } = require("../modules/checkBody");

// Get all trips (pas sur d'etre utile en front)
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find();
    if (trips.length === 0) throw new Error("Trips not found");
    res.json({ result: true, trips });
  } catch (error) {
    res.status(500).json({ result: false, error: error.message });
  }
});

// Get trips by departure, arrival and date
router.post("/", async (req, res) => {
  try {
    if (!checkBody(req.body, ["departure", "arrival", "date"]))
      throw new Error("Missing or empty fields");

    const { departure, arrival, date } = req.body;
    const $gte = moment.utc(date, "YYYY-MM-DD").startOf("day").toDate();
    const $lte = moment.utc(date, "YYYY-MM-DD").endOf("day").toDate();

    const trips = await Trip.find({
      departure,
      arrival,
      date: {
        $gte,
        $lte,
      },
    });

    if (trips.length === 0) throw new Error("Trips not found");
    res.json({ result: true, trips });
  } catch (error) {
    res.status(500).json({ result: false, error: error.message });
  }
});

module.exports = router;
