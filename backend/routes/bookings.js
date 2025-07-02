const express = require("express");
const router = express.Router();
const Booking = require("../models/bookings");
const Cart = require("../models/carts");

router.post("/", (req, res) => {
  const trip_id = req.body.trip_id;
  const newBooking = new Booking({ trip: trip_id });
  newBooking.save().then((data) => {
    res.json({ result: true, booking: data });
  });
});

router.get("/", (req, res) => {
  Booking.find()
    .populate("trip")
    .then((bookings) => {
      res.json({ result: true, bookings });
    });
});

module.exports = router;
