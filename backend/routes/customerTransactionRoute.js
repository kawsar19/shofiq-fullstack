// customerTransactionRoute.js
const express = require("express");
const router = express.Router();
const CustomerTransaction = require("../models/customerTransactionSchema");
const Food = require("../models/foodSchema");

router.post("/sell", async (req, res) => {
  try {
    const { products } = req.body;

    // Check if there is enough stock for each product
    for (const product of products) {
      const food = await Food.findById(product.food);
      if (!food || food.stock < product.quantity) {
        return res.status(400).json({ error: "Insufficient stock" });
      }
    }

    // Create a customer transaction
    const customerTransaction = new CustomerTransaction({
      products: products,
    });

    // Update food stock for each product
    for (const product of products) {
      await Food.findByIdAndUpdate(product.food, {
        $inc: { stock: -product.quantity },
      });
    }

    // Save the transaction
    await customerTransaction.save();

    res.status(201).json(customerTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
