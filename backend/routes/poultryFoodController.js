const express = require('express');
const router = express.Router();
const PoultryFood = require('../models/PoultryFood');

// Create Poultry Food
router.post('/create', async (req, res) => {
  console.log('Request Body:', req.body);

  try {
    const newFood = await PoultryFood.create(req.body);
    res.status(201).json(newFood);
  } catch (error) {
    console.error('Error creating poultry food', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get All Poultry Food
router.get('/all', async (req, res) => {
  console.log('Request Body:', req.body);

  try {
    const allFood = await PoultryFood.find();
    res.json(allFood);
  } catch (error) {
    console.error('Error fetching poultry food', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export Poultry Food
router.post('/export/:foodId', async (req, res) => {
  console.log('Request Body:', req.body);

  const { foodId } = req.params;
  const { exportedQuantity, destination } = req.body;

  try {
    const food = await PoultryFood.findById(foodId);

    if (!food) {
      return res.status(404).json({ error: 'Poultry food not found' });
    }

    if (food.quantity < exportedQuantity) {
      return res.status(400).json({ error: 'Not enough stock available' });
    }

    food.quantity -= exportedQuantity;
    await food.save();

    res.json({
      message: 'Export successful',
      exportedFood: {
        food,
        exportedQuantity,
        destination,
      },
    });
  } catch (error) {
    console.error('Error exporting poultry food', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Import Poultry Food
router.post('/import/:foodId', async (req, res) => {
  console.log('Request Body:', req.body);

  const { foodId } = req.params;
  const { importedQuantity, source } = req.body;

  try {
    const food = await PoultryFood.findById(foodId);

    if (!food) {
      return res.status(404).json({ error: 'Poultry food not found' });
    }

    food.quantity += importedQuantity;
    await food.save();

    res.json({
      message: 'Import successful',
      importedFood: {
        food,
        importedQuantity,
        source,
      },
    });
  } catch (error) {
    console.error('Error importing poultry food', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
