const express = require("express");
const router = express.Router();
const Trip = require("../models/trips");

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
    const datas = ({ departure, arrival, date } = req.body);
    const trips = await Trip.find(datas);
    if (trips.length === 0) throw new Error("Trips not found");
    res.json({ result: true, trips });
  } catch (error) {
    res.status(500).json({ result: false, error: error.message });
  }
});

module.exports = router;
