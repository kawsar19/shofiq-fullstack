// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(
  "mongodb+srv://kawsarbinjahangir:mWIlmJjfHvxBTJpC@cluster0.ngiowav.mongodb.net/shofiq",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Poultry Food Routes
const poultryFoodRoutes = require("./routes/foodRoutes");
const supplierTransiction = require("./routes/supplierTransactionRoute");
app.use("/api/poultry-food/", poultryFoodRoutes);
app.use("/api/supplier-transiction/", supplierTransiction);

app.get("/test", (req, res) => {
  res.send("This is a test endpoint!");
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
