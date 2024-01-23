// customerTransactionSchema.js
const mongoose = require("mongoose");

const customerTransactionSchema = new mongoose.Schema({
  products: [
    {
      food: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
      quantity: { type: Number, required: true },
    },
  ],
  date: { type: Date, default: Date.now },
});

const CustomerTransaction = mongoose.model(
  "CustomerTransaction",
  customerTransactionSchema
);

module.exports = CustomerTransaction;
