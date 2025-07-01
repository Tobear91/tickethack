const express = require("express");
const router = express.Router();
const Trip = require("../models/trips");

router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json({ result: true, trips });
  } catch (error) {
    res.status(500).json({ result: false, error: error.message });
  }
});

module.exports = router;
