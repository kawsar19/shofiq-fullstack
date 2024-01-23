// supplierTransactionRoute.js
const express = require("express");
const router = express.Router();
const SupplierTransaction = require("../models/SupplierTransaction");
const Food = require("../models/PoultryFood");

router.post("/buy", async (req, res) => {
  try {
    const { products, cost, deposit, totalTons } = req.body;

    // Create a supplier transaction
    const supplierTransaction = new SupplierTransaction({
      products: products,
      cost: cost,
      deposit: deposit,
      totalTons: totalTons,
    });

    // Update food stock for each product
    for (const product of products) {
      await Food.findByIdAndUpdate(product.food, {
        $inc: { stock: product.quantity },
      });
    }

    // Save the transaction
    await supplierTransaction.save();

    res.status(201).json(supplierTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/transactions", async (req, res) => {
  try {
    // Extract start and end dates from query parameters
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    // Construct a query object for date range filtering
    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (startDate) {
      dateFilter.date = { $gte: new Date(startDate) };
    } else if (endDate) {
      dateFilter.date = { $lte: new Date(endDate) };
    }

    // Apply date range filter to the query
    const transactions = await SupplierTransaction.find(dateFilter);

    // Fetch all referenced food documents
    const foodMap = new Map();
    const uniqueFoodIds = Array.from(
      new Set(
        transactions.flatMap((transaction) =>
          transaction.products.map((product) => product.food)
        )
      )
    );
    const foods = await Food.find({ _id: { $in: uniqueFoodIds } });

    // Map the food documents to a Map for easy lookup
    foods.forEach((food) => foodMap.set(food._id.toString(), food));

    // Calculate the total number of foods and other totals in each transaction
    const transactionsWithTotals = transactions.map((transaction) => {
      const totalFoods = transaction.products.reduce((total, product) => {
        const food = foodMap.get(product.food.toString());
        return total + (food ? product.quantity : 0);
      }, 0);

      return {
        _id: transaction._id,
        products: transaction.products.map((product) => product.toObject()), // Keep the products as they are
        cost: transaction.cost,
        deposit: transaction.deposit,
        totalTons: transaction.totalTons,
        date: transaction.date,
        totalQuantity: totalFoods, // Include total quantity for the entire transaction
      };
    });

    res.json(transactionsWithTotals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
