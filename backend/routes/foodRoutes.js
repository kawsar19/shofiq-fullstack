// foodRoutes.js
const express = require("express");
const router = express.Router();
const Food = require("../models/PoultryFood");

// Get all foods
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific food by ID
router.get("/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }
    res.json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new food
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const newFood = new Food({ name });
    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a specific food by ID
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!updatedFood) {
      return res.status(404).json({ error: "Food not found" });
    }
    res.json(updatedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a specific food by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) {
      return res.status(404).json({ error: "Food not found" });
    }
    res.json(deletedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
