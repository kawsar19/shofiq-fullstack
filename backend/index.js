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

// Define Madrasa Schema and Model (Replace 'path-to-your-madrasa-model' with the actual path)

// Require Madrasa Routes (Replace 'path-to-your-madrasa-routes' with the actual path)
const authRoutes = require("./routes/authController");

// Use Madrasa Routes
app.use("/api/auth/", authRoutes);

app.get("/test", (req, res) => {
  res.send("This is a test endpoint!");
});
// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
