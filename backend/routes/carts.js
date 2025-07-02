const express = require("express");
const router = express.Router();
const Cart = require("../models/carts");
const { setDefaultAutoSelectFamily } = require("net");

// Get all carts
router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find().populate("trip");
    res.json({ result: true, carts });
  } catch (error) {
    res.status(500).json({ result: false, error: error.message });
  }
});

// Add cart
router.post("/", async (req, res) => {
  try {
    const { trip_id } = req.body;
    const newCart = new Cart({ trip: trip_id });
    const cart = await newCart.save();
    res.json({ result: true, cart });
  } catch (error) {
    res.status(500).json({ result: false, error: error.message });
  }
});

// Delete cart
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.deleteOne({ _id: id });
    res.json({ result: true });
  } catch (error) {
    res.status(500).json({ result: false, error: error.message });
  }
});

// Delete all
router.delete("/", async (req, res) => {
  try {
    await Cart.deleteMany({});
    res.json({ result: true, message: "Carts deleted" });
  } catch (error) {
    res.status(500).json({ result: false, error: error.message });
  }
});

module.exports = router;
