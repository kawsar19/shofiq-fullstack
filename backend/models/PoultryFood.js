const mongoose = require('mongoose');

/**
 * @typedef {Object} PoultryFood
 * @property {string} name - The name of the poultry food. (Required)
 * @property {string} type - The type or category of the poultry food. (Required)
 * @property {number} quantity - The available quantity of the poultry food (default: 0).
 * @property {string} details - Additional details about the poultry food.
 * @property {Date} createdAt - The timestamp when the poultry food record was created.
 * @property {Date} updatedAt - The timestamp when the poultry food record was last updated.
 */

/**
 * Represents a model for managing poultry food in MongoDB.
 * @type {mongoose.Model<PoultryFood>}
 */
const PoultryFoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    details: { type: String },
  },
  { timestamps: true }
);

/**
 * The Mongoose model for poultry food.
 * @type {mongoose.Model<PoultryFood>}
 */
const PoultryFood = mongoose.model('PoultryFood', PoultryFoodSchema);

module.exports = PoultryFood;
