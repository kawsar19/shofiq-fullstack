// foodSchema.js
const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Number, default: 0 },
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
