// supplierTransactionSchema.js
const mongoose = require("mongoose");

const supplierTransactionSchema = new mongoose.Schema({
  products: [
    {
      food: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
      quantity: { type: Number, required: true },
    },
  ],
  cost: { type: Number, required: true },
  deposit: { type: Number, required: true },
  totalTons: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const SupplierTransaction = mongoose.model(
  "SupplierTransaction",
  supplierTransactionSchema
);

module.exports = SupplierTransaction;
